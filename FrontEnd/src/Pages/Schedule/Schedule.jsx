import React, { useEffect, useState } from 'react';
import Leftbar from '../components/appointment/Leftbar';
import Navbar from '../components/navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Schedule.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';

function Schedule() {
    const { patientId } = useParams(); // lấy id từ URL
    const [scheduleList, setScheduleList] = useState({}); // danh sách lịch khám là object
    const [selectedSchedule, setSelectedSchedule] = useState(null); // lịch khám đang chọn
    const [showScheduleDetails, setShowScheduleDetails] = useState(false); // hiển thị chi tiết
    const [newSchedule, setNewSchedule] = useState({
        patient_id: patientId, //mặc định từ url
        doctor_id: '',
        appointment_date: '',
        reason: ''
    });
    const [doctors, setDoctors] = useState([]); //danh sách bác sĩ

    
    // Lấy danh sách lịch khám dựa trên patientId và danh sách bác sĩ theo id
    useEffect(() => {
        if (!patientId) return;

        const fetchSchedules = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/schedule/${patientId}`);
                setScheduleList(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu lịch khám:', error);
            }
        };

        fetchSchedules();
    }, [patientId]);

    //lấy danh sách bác sĩ
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:3005/doctor');
                setDoctors(response.data); //lưu danh sách bác sĩ vào state
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bác sĩ:', error);
            }
        };

        fetchDoctors();
    }, []);

    // Xóa lịch khám
    const handleDelete = async (scheduleId) => {
        const result = await Swal.fire({
            title: "Bạn có chắc chắn muốn xóa lịch khám này?",
            text: "Hành động này sẽ không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#86cc51",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy"
          });
        
        if (result.isConfirmed) {

            try {

                await axios.delete(`http://localhost:3005/schedule/${scheduleId}`);

                Swal.fire({
                    title: "Deleted!",
                    text: "Xóa lịch khám thành công",
                    icon: "success",
                    confirmButtonColor: "#86cc51"
                  });
                
                //tạo bản sao của `scheduleList` và xóa lịch khám đã chọn
                const updatedScheduleList = { ...scheduleList };
                delete updatedScheduleList[scheduleId];
                setScheduleList(updatedScheduleList);
            } catch (error) {
                console.error('Lỗi khi xóa lịch khám:', error);
            }
        }
    };

    const handleEdit = (scheduleId) => {
        // chuyển hướng đến trang chỉnh sửa
        

    };

    const toggleScheduleDetails = (scheduleId) => {
        if (selectedSchedule === scheduleId) {
            setShowScheduleDetails(!showScheduleDetails);
        } else {
            setSelectedSchedule(scheduleId);
            setShowScheduleDetails(true);
        }
    };

    const handleAdd = async () => {
        try {
            //check xem bác sĩ có bận không?
            const availabilityResponse = await axios.post('http://localhost:3005/doctor/check-availability', {
                doctor_id: newSchedule.doctor_id,
                appointment_date: newSchedule.appointment_date
            });
    
            if (!availabilityResponse.data.available) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Bác sĩ đã bận vào thời gian này mất rồi!",
                    confirmButtonText: "Xác nhận"
                  });
                return;
            }
            
            

            //nếu không bận thì thêm lịch khám
            const response = await axios.post('http://localhost:3005/schedule', newSchedule);
            Swal.fire({
                title: "Completed!",
                text: "Thêm lịch khám thành công",
                icon: "success",
                confirmButtonColor: "#86cc51"
              });
            //thêm vào list
            setScheduleList(prev => ({
                ...prev,
                [response.data.appointment_id]: {
                    ...newSchedule,
                    appointment_id: response.data.appointment_id,
                    doctor_name: doctors.find(doctor => doctor.doctor_id === newSchedule.doctor_id)?.doctor_name || 'Chưa có tên',
                    status: 'pending'
                }
            }));
    
            // Reset form
            setNewSchedule({
                patient_id: patientId,
                doctor_id: '',
                appointment_date: '',
                reason: ''
            });
        } catch (error) {
            console.error('Lỗi khi thêm lịch khám:', error);
        }
    };

    const getCurrentDateTimeInVietnam = () => {
        const now = new Date();
        const vnOffset = 7 * 60 * 60 * 1000;
        return new Date(now.getTime() + vnOffset).toISOString().slice(0, 16);
    };
    
    const roundMinutesOnly = (datetime) => {
        const date = new Date(datetime);
        const minutes = date.getMinutes();
        const roundedMinutes = Math.round(minutes / 10) * 10;
        date.setMinutes(roundedMinutes === 60 ? 0 : roundedMinutes);
        if (roundedMinutes === 60) date.setHours(date.getHours() + 1);
        
        const vnOffset = 7 * 60 * 60 * 1000;
        return new Date(date.getTime() + vnOffset).toISOString().slice(0, 16);
    };

    return (
        <div className='schedule dashboard'>
            <Navbar className='header' />
            <div className='body'>
                <Leftbar className='leftBar' />
                <div className='content'>
                    <h2>Lịch khám</h2>
                    <div className='scheduleForm'>
                        <select 
                            id="doctor_id" 
                            value={newSchedule.doctor_id} 
                            onChange={(e) => setNewSchedule({ ...newSchedule, doctor_id: e.target.value })}
                        >
                            <option value="">Chọn bác sĩ</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                                    {doctor.doctor_name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="datetime-local"
                            value={newSchedule.appointment_date}
                            onChange={(e) => setNewSchedule({
                                ...newSchedule,
                                appointment_date: roundMinutesOnly(e.target.value)
                            })}
                            step="600"
                            min={getCurrentDateTimeInVietnam()}
                        />
                        <input
                            type='text'
                            placeholder='Nguyên nhân'
                            value={newSchedule.reason}
                            onChange={(e) => setNewSchedule({ ...newSchedule, reason: e.target.value })}
                        />
                        <button className='addScheduleButton' onClick={handleAdd}>Thêm lịch khám</button>
                    </div>
                    <div className='scheduleList'>
                        {Object.keys(scheduleList).map((scheduleId) => {
                            const schedule = scheduleList[scheduleId];
                            return (
                                <div key={schedule.appointment_id} className='scheduleItem'>
                                    <div onClick={() => toggleScheduleDetails(schedule.appointment_id)}>
                                        <p>{schedule.appointment_date} - {schedule.doctor_name}</p>
                                    </div>
                                    {showScheduleDetails && selectedSchedule === schedule.appointment_id && (
                                        <div className='scheduleDetails'>
                                            <p>Thông tin chi tiết:</p>
                                            <p>Ngày: {schedule.appointment_date}</p>
                                            <p>Bác sĩ: {schedule.doctor_name}</p>
                                            <p>Nguyên nhân: {schedule.reason}</p>
                                            <p>Trạng thái: {schedule.status}</p>
                                            <Tooltip title="Chỉnh sửa" arrow>
                                                <button onClick={() => handleEdit(schedule.appointment_id)} className='iconButton'><EditIcon /></button>
                                            </Tooltip>
                                            <Tooltip title="Xóa" arrow>
                                                <button onClick={() => handleDelete(schedule.appointment_id)} className='iconButton'><DeleteIcon /></button>
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Schedule;
