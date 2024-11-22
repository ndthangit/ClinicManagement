import React, { useEffect, useState } from 'react';
import DoctorNavbar from '../../components/navbar/DoctorNavbar';
import DoctorLeftbar from '../../components/leftbar/DoctorLeftbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ApproveAppointments.css';

function ApproveAppointments() {
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.user.doctor);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/doctorApm/appointments/${user.doctor_id}`);
        const pendingApm = response.data.filter(
            (appointment) => appointment.status === 'pending'
        );
        setAppointments(pendingApm);
    } catch (error) {
        console.error('Error fetching appointments:', error);
    } finally {
        setLoading(false);
    }
    };

    fetchAppointments();
  }, []); 

  const approveAppointment = async (appointment_id) => {
    Swal.fire({
      title: 'Xác nhận duyệt lịch khám?',
      text: 'Bạn có chắc chắn muốn duyệt lịch khám này?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'hsl(94, 55%, 56%)', 
      cancelButtonColor: '#d33',
      confirmButtonText: 'Duyệt',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:3005/doctorApm/appointments/approve/${appointment_id}`);
          setAppointments((prev) =>
            prev.filter((appointment) => appointment.appointment_id !== appointment_id)
          );
          Swal.fire('Thành công!', 'Lịch khám đã được duyệt.', 'success');
        } catch (error) {
          console.error('Error approving appointments:', error);
          Swal.fire('Thất bại!', 'Có lỗi xảy ra khi duyệt lịch khám.', 'error');
        }
      }
    });
  };

  const cancelAppointment = async (appointment_id) => {
    Swal.fire({
      title: 'Xác nhận hủy lịch khám?',
      text: 'Bạn có chắc chắn muốn hủy lịch khám này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'hsl(94, 55%, 56%)',
      confirmButtonText: 'Hủy lịch',
      cancelButtonText: 'Quay lại',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:3005/doctorApm/appointments/canceled/${appointment_id}`);
          setAppointments((prev) =>
            prev.filter((appointment) => appointment.appointment_id !== appointment_id)
          );
          Swal.fire('Thành công!', 'Lịch khám đã được hủy.', 'success');
        } catch (error) {
          console.error('Error canceling appointment:', error);
          Swal.fire('Thất bại!', 'Có lỗi xảy ra khi hủy lịch khám.', 'error');
        }
      }
    });
  };

  return (
    <div className="doctor-approve-dashboard">
        <DoctorNavbar/>
        <div className="doctor-approve-container">
            <DoctorLeftbar />
            <div className="doctor-approve-content">
                <h2>Duyệt Lịch Khám</h2>
                {loading ? (
                  <p>Đang tải dữ liệu...</p>
                ) : appointments.length === 0 ? (
                    <p>Không có lịch khám cần duyệt.</p>
                ) : (
                    <ul className="approve-appointment-list">
                        {appointments.map((appointment) => (
                            <li key={appointment.appointment_id} className="approve-appointment-item">
                                <p><strong>Bệnh nhân:</strong> {appointment.patient_name}</p>
                                <p>
                                <strong>Ngày hẹn:</strong>{' '}
                                {new Date(appointment.appointment_date).toLocaleDateString('vi-VN')} {' '}
                                {new Date(appointment.appointment_date).toLocaleTimeString('vi-VN', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                                </p>
                                <p><strong>Lý do:</strong> {appointment.reason}</p>
                                <div className="approve-buttons">
                                    <button
                                        className="approve-button"
                                        onClick={() => approveAppointment(appointment.appointment_id)}
                                    >
                                        Duyệt
                                    </button>
                                    <button
                                        className="cancel-button"
                                        onClick={() => cancelAppointment(appointment.appointment_id)}
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    </div>
);

}

export default ApproveAppointments;