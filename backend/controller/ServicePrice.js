const connection=require('../DB/database')


function executeQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) {
                return reject(err); // Từ chối Promise nếu có lỗi
            }
            resolve(results); // Hoàn thành Promise với kết quả truy vấn
        });
    });
  }

let getAllDepartment=async ()=>{
    const sql = 'select * from dataIT3170.department';
    try {
        const results = executeQuery(sql);
        return results;
    } catch (err) {
        console.error(err);
    }
    
}

let getServiceByDepartmentId = async(req, res) => {
    const sql = 'SELECT * FROM services WHERE department_id = ?'
    try {
        const results = executeQuery(sql, [req.params.id]);
        return results
    } catch (err) {
        console.error(err);
    }
};

const DepartmentList = async  (req, res) => {
    let results = await getAllDepartment() //result o day la mang cac department
    res.send(results);
}
const ServiceListByDepartmentId= async  (req, res) => {
    let results = await getServiceByDepartmentId(req) //result o day la mang cac service theo department id
    res.send(results);
}
const DeleteDepartment = async (req, res) => {
    const departmentId = req.params.id;

    if (!departmentId) {
        return res.status(400).json({ message: 'Không tìm thấy ID của phòng ban.' });
    }

    try {
        // Bắt đầu transaction
        await executeQuery('START TRANSACTION');

        // 1. Lấy danh sách bác sĩ thuộc phòng ban
        const doctors = await executeQuery('SELECT doctor_id FROM doctors WHERE department_id = ?', [departmentId]);

        // 2. Với mỗi bác sĩ, xử lý xóa các dữ liệu liên quan
        for (const doctor of doctors) {
            // Lấy danh sách appointment_id của bác sĩ
            const appointments = await executeQuery('SELECT appointment_id FROM appointments WHERE doctor_id = ?', [doctor.doctor_id]);

            for (const appointment of appointments) {
                // Lấy danh sách exam_id từ bảng medical_exam liên quan đến appointment
                const exams = await executeQuery('SELECT exam_id FROM medical_exam WHERE appointment_id = ?', [appointment.appointment_id]);

                for (const exam of exams) {
                    // Xóa tất cả các bản ghi trong invoices liên quan đến exam_id
                    await executeQuery('DELETE FROM invoices WHERE exam_id = ?', [exam.exam_id]);

                    // Xóa tất cả các bản ghi trong service_usage liên quan đến exam_id
                    await executeQuery('DELETE FROM service_usage WHERE exam_id = ?', [exam.exam_id]);
                    // Xóa tất cả các bản ghi trong payment liên quan đến exam_id
                    await executeQuery('DELETE FROM payments WHERE exam_id = ?', [exam.exam_id]);
                   
                }

                // Xóa tất cả các bản ghi trong medical_exam liên quan đến appointment_id
                await executeQuery('DELETE FROM medical_exam WHERE appointment_id = ?', [appointment.appointment_id]);
            }

            // Xóa tất cả các bản ghi trong appointments liên quan đến doctor_id
            await executeQuery('DELETE FROM appointments WHERE doctor_id = ?', [doctor.doctor_id]);
        }

        // 3. Xóa các bác sĩ trong phòng ban
        await executeQuery('DELETE FROM doctors WHERE department_id = ?', [departmentId]);

        // 4. Xóa tất cả các dịch vụ và các bản ghi liên quan trong service_usage
        const services = await executeQuery('SELECT service_id FROM services WHERE department_id = ?', [departmentId]);

        for (const service of services) {
            // Xóa tất cả các bản ghi trong service_usage liên quan đến service_id
            await executeQuery('DELETE FROM service_usage WHERE service_id = ?', [service.service_id]);
        }

        // Xóa tất cả các dịch vụ trong phòng ban
        await executeQuery('DELETE FROM services WHERE department_id = ?', [departmentId]);

        // 5. Xóa phòng ban
        const result = await executeQuery('DELETE FROM department WHERE department_id = ?', [departmentId]);

        if (result.affectedRows === 0) {
            await executeQuery('ROLLBACK');
            return res.status(404).json({ message: 'Phòng ban không tồn tại.' });
        }

        // Commit transaction
        await executeQuery('COMMIT');
        res.status(200).json({ message: 'Xóa phòng ban, bác sĩ, dịch vụ, và các dữ liệu liên quan thành công.' });
    } catch (err) {
        // Rollback nếu có lỗi
        await executeQuery('ROLLBACK');
        console.error('Lỗi khi xóa phòng ban:', err);
        res.status(500).json({ message: 'Lỗi khi xóa phòng ban.' });
    }
};




const DeleteService = async (req, res) => {
    const serviceId = req.params.id;

    if (!serviceId) {
        return res.status(400).json({ message: 'Không tìm thấy ID của dịch vụ.' });
    }

    try {
        // Bắt đầu transaction
        await executeQuery('START TRANSACTION');

        // Xóa các bản ghi trong service_usage liên quan đến service_id
        await executeQuery('DELETE FROM service_usage WHERE service_id = ?', [serviceId]);

        // Xóa dịch vụ
        const result = await executeQuery('DELETE FROM services WHERE service_id = ?', [serviceId]);

        if (result.affectedRows === 0) {
            await executeQuery('ROLLBACK');
            return res.status(404).json({ message: 'Dịch vụ không tồn tại.' });
        }

        // Commit transaction
        await executeQuery('COMMIT');
        res.status(200).json({ message: 'Xóa dịch vụ thành công.' });
    } catch (err) {
        await executeQuery('ROLLBACK');
        console.error('Lỗi khi xóa dịch vụ:', err);
        res.status(500).json({ message: 'Lỗi khi xóa dịch vụ.' });
    }
};


module.exports={
    DepartmentList,
    ServiceListByDepartmentId,
    DeleteDepartment,
    DeleteService,
}