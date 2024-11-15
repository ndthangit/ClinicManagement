import React, { useEffect, useState } from 'react';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Schedule.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import { modifileSuccess } from '../../components/schedule/Alert';

function Schedule() {
    const { patientId } = useParams(); // lấy id từ URL
    const [scheduleList, setScheduleList] = useState({}); // danh sách lịch khám là object
    const [selectedSchedule, setSelectedSchedule] = useState(null); // lịch khám đang chọn
    const [showScheduleDetails, setShowScheduleDetails] = useState(false); // hiển thị chi tiết
    const [showEditForm, setShowEditForms] = useState(false);
    const [newSchedule, setNewSchedule] = useState({
        patient_id: patientId, //mặc định từ url
        appointment_id: '',
        doctor_id: '',
        appointment_date: '',
        reason: ''
    });
    const [editSchedule, setEditSchedule] = useState({
        appointment_id: '',
        appointment_date: '',
        reason: ''
    });
    const [selectDate, setSelectDate] = useState('');
    const [selectTime, setSelectTime] = useState('');
    const [selectTimeOptions, setSelectTimeOptions] = useState([]);
    const [doctorId, setDoctorId] = useState(null);
    const [doctors, setDoctors] = useState([]); //danh sách bác sĩ

    
    //lấy danh sách lịch khám dựa trên patientId và danh sách bác sĩ theo id
    useEffect(() => {
        if (!patientId) return;

        const fetchSchedules = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/schedule/${patientId}`);
                setScheduleList(response.data);
                console.log(response.data);
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

    useEffect(() => {
        if (selectDate && doctorId) {
            axios.get(`http://localhost:3005/schedule/doctor/${doctorId}/busy-times?date=${selectDate}`)
                .then(response => {
                    const busyTimes = response.data.busyTimes;
                    console.log(busyTimes);
                    setSelectTimeOptions(generalTimeOptions(busyTimes));
                    console.log(selectTimeOptions);
                })
                .catch(error => {
                    console.error("Lỗi lấy giờ bận", error);
                });
        }
    }, [selectDate, doctorId]); 

    useEffect(() => {
        if (selectedSchedule && Array.isArray(scheduleList)) {
            const selectedScheduleData = scheduleList.find(item => item.appointment_id === selectedSchedule);
            
            if (selectedScheduleData && selectedScheduleData.appointment_date) {
                const date = selectedScheduleData.appointment_date;
                setSelectDate(date.slice(0, 10));
            }
        }
    }, [selectedSchedule, scheduleList]);
    

    //xóa lịch khám
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
                // window.location.reload();
            } catch (error) {
                console.error('Lỗi khi xóa lịch khám:', error);
            }
        }
    };

    const handleEdit = async (scheduleId) => {
        const scheduleToEdit = scheduleList.find(schedule => schedule.appointment_id === scheduleId);
        console.log(scheduleToEdit); //kiểm tra xem có lấy được dữ liệu không
    
        if (scheduleToEdit) {
            const [datePart, timePart] = scheduleToEdit.appointment_date.split('T');
            setEditSchedule({
                appointment_id: scheduleId,
                appointment_date: scheduleToEdit.appointment_date,
                reason: scheduleToEdit.reason
            });
            setSelectDate(datePart);
            setSelectTime(timePart ? timePart.slice(0, 5) : '');
        }
    };
    const handleSaveEdit = async () => {
        if (!editSchedule.appointment_id) {
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "ID lịch khám không hợp lệ.",
                confirmButtonText: "Xác nhận",
                confirmButtonColor: "#86cc51"
            });
            return;
        }

        if (!selectDate || !selectTime) {
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Vui lòng chọn cả ngày và giờ.",
                confirmButtonText: "Xác nhận"
            });
            return;
        }

        const combinedDateTime = `${selectDate}T${selectTime}:00`;
    
        try {
            await axios.put(`http://localhost:3005/schedule/patient-sche/${editSchedule.appointment_id}`, {
                appointment_date: combinedDateTime,
                reason: editSchedule.reason
            });
    
            // Hiển thị thông báo thành công
            modifileSuccess();
    
            // Cập nhật lại lịch khám trong state
            setScheduleList((prev) =>
                prev.map((schedule) =>
                    schedule.appointment_id === editSchedule.appointment_id
                        ? { ...schedule, appointment_date: combinedDateTime, reason: editSchedule.reason }
                        : schedule
                )
            );
    
            //reset form sau khi lưu xong
            setEditSchedule({
                appointment_id: '',
                appointment_date: '',
                reason: ''
            });
            setShowEditForms(false); //ẩn form chỉnh sửa
            // window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                    confirmButtonText: "Xác nhận"
                });
            } else {
                console.error("Lỗi khi cập nhật lịch khám:", error);
            }
        }
    };


    const toggleScheduleDetails = (scheduleId) => {
        if (selectedSchedule === scheduleId) {
            setShowScheduleDetails(!showScheduleDetails);
        } else {
            setSelectedSchedule(scheduleId);
            setShowScheduleDetails(true);
        }
    };
    const toggleEditForm = (appointmentId) => {
        if (selectedSchedule === appointmentId) {
            setShowEditForms(!showEditForm);
        } else {
            setSelectedSchedule(appointmentId);
            setShowEditForms(true);
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
    
            //reset form
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
    };
    
    const roundMinutesOnly = (datetime) => {
    };

    const generalTimeOptions = (busyTimes = []) => {
        const times = []; 
        let startHour = 17;
        const endHour = 20;
        const interval = 10;

        while (startHour < endHour) {
            for (let minute = 0; minute < 60; minute +=interval) {
                const hourString = startHour.toString().padStart(2, '0');
                const minuteString = minute.toString().padStart(2, '0');
                const time = `${hourString}:${minuteString}`;
                
                if (!busyTimes.includes(time)) {
                    times.push(time);
                }
            }
            startHour++;
        }
        return times;
    };

    return (
        <div className='schedule dashboard'>
            <Navbar className='header' />
            <div className='body'>
                <Leftbar className='leftBar' />
                <div className='content'>
                    <h2>Lịch khám</h2>
                    {/* form thêm lịch khám */}
                    {/* <div className='scheduleForm'>
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
                    </div> */}

                    {/* danh sách lịch khám */}
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

                                            <div className='actionButtons'>
                                                <Tooltip title="Chỉnh sửa" arrow>
                                                    <button 
                                                        onClick={() => { 
                                                            handleEdit(schedule.appointment_id); //gọi hàm chỉnh sửa
                                                            setShowEditForms(true); // Hiện form chỉnh sửa
                                                            setDoctorId(schedule.doctor_id);
                                                        }} 
                                                        className='iconButton'><EditIcon /></button>
                                                </Tooltip>
                                                <Tooltip title="Xóa" arrow>
                                                    <button onClick={() => handleDelete(schedule.appointment_id)} className='iconButton'><DeleteIcon /></button>
                                                </Tooltip>
                                            </div>

                                            {/* Form chỉnh sử khi ấn vào "Chỉnh sửa" */}
                                            {showEditForm && selectedSchedule === schedule.appointment_id && (
                                                <div className='editScheduleForm'>
                                                    <h3>Chỉnh sửa lịch khám</h3>
                                                    <input
                                                        type="date"
                                                        value={selectDate}
                                                        onChange={(e) => setSelectDate(e.target.value)}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        max={new Date(Date.now() + 60*24*60*60*1000).toISOString().split('T')[0]}
                                                    />
                                                    <select
                                                        value={selectTime}
                                                        onChange={(e) => setSelectTime(e.target.value)}
                                                    >
                                                        <option value="">Chọn giờ</option>
                                                        {selectTimeOptions.length > 0 ? (
                                                            selectTimeOptions.map((time) => (
                                                                <option key={time} value={time}>
                                                                    {time}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option disabled>Không có giờ rảnh</option>
                                                        )}
                                                    </select>

                                                    <input
                                                        type='text'
                                                        placeholder='Nguyên nhân'
                                                        value={editSchedule.reason}
                                                        onChange={(e) => setEditSchedule({ ...editSchedule, reason: e.target.value })}
                                                    />
                                                    <button onClick={handleSaveEdit}>Lưu thay đổi</button>
                                                    <button onClick={() => toggleEditForm(null)}>Hủy</button>
                                                </div>
                                            )}
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