import React, { useEffect, useState } from 'react';
import Leftbar from '../../Components/leftbar/Leftbar';
import Navbar from '../../Components/navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Schedule.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import { modifileSuccess } from '../../Components/schedule/Alert';

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
    const [filterDate, setFilterDate] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDepartment, setFilterDepartment] = useState('all');
    const [filteredSchedules, setFilteredSchedules] = useState(Object.values(scheduleList));
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Danh sách bác sĩ lọc theo tên


    //lấy danh sách lịch khám dựa trên patientId và danh sách bác sĩ theo id
    useEffect(() => {
        if (!patientId) return;

        const fetchSchedules = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/schedule/${patientId}`);
                setScheduleList(response.data);
                setFilteredSchedules(response.data);
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

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value); 
    
        if (value.trim() === '') {
            setFilteredDoctors([]); 
            applyFilter(); 
        } else {
            const filtered = doctors.filter((doctor) => 
                doctor.doctor_name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredDoctors(filtered); 
        }
    };
    

    const handleSearch = () => {
        if (searchTerm === '') {
            setFilteredSchedules(scheduleList);
        } else {
            const filtered = scheduleList.filter((schedule) =>
                schedule.doctor_name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
            setFilteredSchedules(filtered);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
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

    const applyFilter = () => {
    const result = Object.values(scheduleList).filter((schedule) => {
        if (filterDate === 'today') {
            const today = new Date().toISOString().split('T')[0];
            if (!schedule.appointment_date.startsWith(today)) return false;
        } else if (filterDate === 'thisWeek') {
            const now = new Date();
            const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); 
            const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 7)); 
            const appointmentDate = new Date(schedule.appointment_date);
            if (appointmentDate <= startOfWeek || appointmentDate >= endOfWeek) return false;
        }

        if (filterStatus !== 'all' && schedule.status !== filterStatus) return false;

        if (filterDepartment !== 'all' && schedule.department_name !== filterDepartment) return false;

        return true;
    });

    const finalFiltered = result.filter((schedule) => {
        if (searchTerm.trim() !== '') {
            return schedule.doctor_name.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true; //nếu searchTerm rỗng, không lọc gì thêm
    });

    setFilteredSchedules(finalFiltered);
};

    return (
        <div className='schedule dashboard'>
            <Navbar className='header' />
            <div className='body'>
                <Leftbar className='leftBar' />
                <div className='content'>
                    <h2>Lịch khám</h2>
                    <div className="filters">  
                        <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
                            <option value="all">Tất cả lịch</option>
                            <option value="today">Lịch hôm nay</option>
                            <option value="thisWeek">Lịch trong tuần</option>
                        </select>

                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="all">Tất cả</option>
                            <option value="pending">Lịch chờ duyệt</option>
                            <option value="confirmed">Lịch đã duyệt</option>
                        </select>

                        <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
                            <option value="all">Tất cả khoa</option>
                            {Object.values(scheduleList).map((schedule) => schedule.department_name)
                                .filter((value, index, self) => self.indexOf(value) === index) // Loại bỏ trùng lặp
                                .map((department) => (
                                    <option key={department} value={department}>
                                        {department}
                                    </option>
                                ))}
                        </select>

                        <button onClick={applyFilter}>Xác nhận</button>
                        
                        {/* Tìm kiếm */}
                        <p className="search-container">
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm bác sĩ" 
                                value={searchTerm} 
                                onChange={handleSearchChange} 
                                onKeyDown={handleKeyDown} 
                                className="searchDoctorName-input"
                        />
                        {filteredDoctors.length > 0 && (
                            <ul className="doctor-suggestions">
                                {filteredDoctors.map((schedule) => (
                                    <li 
                                        key={schedule.appointment_id} 
                                        onClick={() => {
                                            setSearchTerm(schedule.doctor_name); 
                                            setFilteredDoctors([]);
                                            
                                        }}
                                        className="doctor-suggestion-item"
                                    >
                                        {schedule.doctor_name}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button onClick={handleSearch} className="searchDoctorName-button">Search</button>
                        </p>
                    </div>
                    
                    {/* danh sách lịch khám */}
                    <div className='scheduleList'>
                        {filteredSchedules.length > 0 ? (
                        filteredSchedules.map((schedule) => (
                                <div key={schedule.appointment_id} className='scheduleItem'>
                                    <div onClick={() => toggleScheduleDetails(schedule.appointment_id)}>
                                        <p>{schedule.appointment_date} - Bác sĩ: {schedule.doctor_name} - {schedule.department_name}</p>
                                    </div>
                                    {showScheduleDetails && selectedSchedule === schedule.appointment_id && (
                                        <div className='scheduleDetails'>
                                            <p>Thông tin chi tiết:</p>
                                            <p>Ngày: {schedule.appointment_date}</p>
                                            <p>Bác sĩ: {schedule.doctor_name} - {schedule.department_name}</p>
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
                                                    <button onClick={() => {toggleEditForm(null); setShowEditForms(false);}}>Hủy</button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                        ))
                    ) : (
                        <p>Không có lịch khám phù hợp.</p>
                     )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Schedule;
