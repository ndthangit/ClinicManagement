const connection = require('../DB/database')
const {executeQuery} = require('../controller/Home')

function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) {
                return reject(err); // Từ chối Promise nếu có lỗi
            }
            resolve(results); // Hoàn thành Promise với kết quả truy vấn
        });
    });
  }

const getHistMedicalExam = async (req, res) => {

    const sql = `select * from datait3170.medical_exam, datait3170.appointments, datait3170.patients 
        where 
        datait3170.medical_exam.appointment_id = datait3170.appointments.appointment_id and
        datait3170.appointments.patient_id = datait3170.patients.patient_id
        `
        try {
            const data = await executeQuery(sql, res);
            res.send(data);
        } catch (err) {
            console.error('Failed to retrieve data:', err);
        }
}

const getListMedicalExamByCCCD = async (req, res) => {
    console.log(res.params)

    const sql = `SELECT * 
             FROM datait3170.medical_exam M
             JOIN datait3170.appointments A
                 ON M.appointment_id = A.appointment_id
             JOIN datait3170.patients P
                 ON P.patient_id = A.patient_id
            WHERE P.cccd = ?`;
        try {
            const data = await query(sql, req.params.id );
            res.send(data);
        } catch (err) {
            console.error('Failed to retrieve data:', err);
        }
}
// Lấy dữ liệu cho lịch sử khám phía bệnh nhân ------Begin----
const getListMedicalExamByIDcustomed = async (req, res) => {
    const formatDate= (isoString) =>{
        // Tạo đối tượng Date từ chuỗi ISO
        const date = new Date(isoString);
    
        // Lấy các thành phần ngày, giờ
        const day = date.getDate().toString().padStart(2, '0'); // Ngày
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng (0-based)
        const year = date.getFullYear(); // Năm
    
        const hours = date.getHours().toString().padStart(2, '0'); // Giờ
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Phút
    
        // Tạo chuỗi ngày giờ dễ đọc
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    const sql = `
        SELECT A.appointment_id, D.doctor_name, DP.department_name, TD.type_name, 
               M.exam_date, M.diagnosis, M.notes, M.symptoms, M.exam_id
        FROM datait3170.medical_exam AS M
        JOIN datait3170.appointments AS A ON M.appointment_id = A.appointment_id
        JOIN datait3170.doctors AS D ON D.doctor_id = A.doctor_id
        JOIN datait3170.department AS DP ON D.department_id = DP.department_id
        JOIN datait3170.type_doctor AS TD ON D.type_id = TD.type_id
    `;

    try {
        const data = await query(sql);

        // Sử dụng Promise.all để xử lý bất đồng bộ trong map
        const newData = await Promise.all(
            data.map(async (item) => {
                try {
                    const sql_select_services = `
                        SELECT S.service_name, S.description, S.price, SU.note, SU.usage_date
                        FROM datait3170.service_usage AS SU
                        JOIN datait3170.services AS S ON SU.service_id = S.service_id
                        WHERE SU.exam_id = ?
                    `;

                    const sql_select_medicines = `select M.medicine_name, I.quantity,  M.description
                        from datait3170.medicines as M, datait3170.invoices as I
                        where I.exam_id = ? and I.medicine_id = M.medicine_id`
                    const services = await query(sql_select_services, [item.exam_id]);
                    const medicines = await query(sql_select_medicines, [item.exam_id])
                    
                    return {
                        doctor: {
                            name: item.doctor_name,
                            type: item.type_name,
                            department: item.department_name
                        },
                        patient: {
                            examDate: formatDate(item.exam_date),
                            symptoms: item.symptoms,
                            diagnosis: item.diagnosis,
                            notes: item.notes
                        },
                        services: services.map((item1) => ({
                            serviceName: item1.service_name,
                            description: item1.description,
                            price: item1.price,
                            usageDate: formatDate(item1.usage_date),
                            note: item1.note
                        })),
                        medicine: medicines.map((item2) => ({
                            name: item2.medicine_name,
                            quantity: item2.quantity,
                            note: item2.description
                        }))
                    };
                } catch (err) {
                    console.error('Error retrieving services:', err);
                    return { error: 'Failed to retrieve services' };
                }
            })
        );

        res.status(200).send(newData);
    } catch (err) {
        console.error('Failed to retrieve data:', err);
        res.status(500).send({ error: 'Failed to retrieve data' });
    }
};

// ------------------------End------------------

const scheduleMedicalExam = async (data) => {
    const sto = {};
    data.map((value, index) => {
    const day = new Date(value.appointment_date);
        const date = day.toISOString().slice(0, 10);
        if (! (date in sto)) {
            sto[date] = [value];
        }
        else {
            sto[date].push(value);
        }

        
    });
    const res = Object.entries(sto)
    res.map(([key, value], index) => {
        value.sort((a, b) => {
          if (a.appointment_date < b.appointment_date) {
            return -1;  // a nhỏ hơn b, a sẽ đứng trước b
          }
          if (a.appointment_date > b.appointment_date) {
            return 1;   // a lớn hơn b, a sẽ đứng sau b
          }
          return 0;      // a và b bằng nhau, không thay đổi thứ tự
        });
      });
    res.sort()
    return res;
}

const getHistMedicalExamForDoctor = async (req, res) => {
    const sql = `select M.*, A.*, P.patient_name from datait3170.medical_exam M, datait3170.appointments A, datait3170.patients P
        where A.patient_id = P.patient_id and 
        M.appointment_id = A.appointment_id and
        A.doctor_id = ? AND A.appointment_date >= ? AND M.status = 'pending'`;
    const sql2 = `UPDATE datait3170.medical_exam M SET status = 'failed' WHERE  M.exam_date < ? AND M.status = 'pending'`;

    try {
        const today = new Date();
        const midnightToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const data = await query(sql, [req.params.id, midnightToday]);
        const result = await scheduleMedicalExam(data);
        await query(sql2, [midnightToday]);

        res.status(200).send(result);
    } catch (err) {
        console.error('Failed to retrieve data:', err);
    }
}

const getHistoryExamForDoctor = async (req, res) => {
    const sql = `select M.*, A.*, P.patient_name from datait3170.medical_exam M, datait3170.appointments A, datait3170.patients P
        where A.patient_id = P.patient_id and 
        M.appointment_id = A.appointment_id and
        A.doctor_id = ? AND (A.appointment_date <= ? OR M.status != 'pending')`;
    try {
        const today = new Date();
        const midnightToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const data = await query(sql, [req.params.id, midnightToday]);
        const result = await scheduleMedicalExam(data);
        res.status(200).send(result);
    } catch (err) {
        console.error('Failed to retrieve data:', err);
    }
}

const getDetailMedicalExamForDoctor = async (req, res) => {
    const sql = `select M.*, A.*, P.* from datait3170.medical_exam M, datait3170.appointments A, datait3170.patients P
        where A.patient_id = P.patient_id and 
        M.appointment_id = A.appointment_id and
        M.exam_id = ?`;
    try {
        
        const data = await query(sql, [req.params.id]);
        res.status(200).send(data[0]);
    } catch (err) {
        console.error('Failed to retrieve data:', err);
    }
}

const updateMedicalExam = async (req, res) => {
    let fields = [];
    if (req.body.changeInfo === 'symptoms')  {
        fields.push(`symptoms = '${req.body.symptoms}'`);
    }
    else if (req.body.changeInfo === 'diagnosis') {
        fields.push(`diagnosis = '${req.body.diagnosis}'`);
    }
    else if (req.body.changeInfo === 'status') {
        fields.push(`status = '${req.body.status}'`);
    }
    else if (req.body.changeInfo === 'notes') {
        fields.push(`notes = '${req.body.notes}'`);
    }
    const sql = `UPDATE dataIT3170.medical_exam SET ${fields.join(", ")} WHERE exam_id = ?`;
    try {
        const data = await query(sql, [req.params.id]);
        res.status(200).json(data);
    } catch (err) {
        console.error('Failed to retrieve data:', err);
    }
}

module.exports = {
    getHistMedicalExam: getHistMedicalExam,
    getListMedicalExamByCCCD: getListMedicalExamByCCCD,
    getHistMedicalExamForDoctor: getHistMedicalExamForDoctor,
    getDetailMedicalExamForDoctor: getDetailMedicalExamForDoctor,
    updateMedicalExam: updateMedicalExam,
    getHistoryExamForDoctor: getHistoryExamForDoctor,
    getListMedicalExamByIDcustomed: getListMedicalExamByIDcustomed,
}