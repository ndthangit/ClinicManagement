import React, { useEffect, useState } from 'react';
import DoctorNavbar from '../../components/navbar/DoctorNavbar';
import DoctorLeftbar from '../../components/leftbar/DoctorLeftbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './DoctorAppointment.css';

function DoctorAppointment() {
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [canceledAppointments, setCanceledAppointments] = useState([]);
  const { user } = useSelector((state) => state.user.doctor);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/doctorApm/appointments/${user.doctor_id}`);
        const confirmed = response.data.filter(
            (appointment) => appointment.status === 'confirmed'
        );
        const canceled = response.data.filter(
            (appointment) => appointment.status === 'canceled'
        );

        confirmed.sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date));
        canceled.sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date));

        setConfirmedAppointments(confirmed);
        setCanceledAppointments(canceled);
      } catch (error) {
          console.error('Error fetching appointments:', error);
      } finally {
          setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="dashboard">
      <DoctorNavbar className="header" />
      <div className="doctor-appointment-container body">
        <DoctorLeftbar />
        <div className='content'>
          <div className="doctor-appointment-content">
            <h2>Danh sách lịch khám</h2>
            {loading ? (
              <p>Đang tải dữ liệu...</p>
            ) : (
              <div className="doctor-appointment-lists">
                {/* Danh sách lịch khám đã xác nhận */}
                <div className="doctor-appointment-list-wrapper">
                  <div className="doctor-appointment-list-title">Lịch khám đã xác nhận</div>
                  {confirmedAppointments.length > 0 ? (
                    <ul className="doctor-appointment-list">
                      {confirmedAppointments.map((appointment) => (
                        <li key={appointment.appointment_id} className="doctor-appointment-item confirmed">
                          <p>
                            <strong>Tên bệnh nhân:</strong> {appointment.patient_name}
                          </p>
                          <p>
                            <strong>Ngày hẹn:</strong>{" "}
                            {new Date(appointment.appointment_date).toLocaleDateString("vi-VN")}{" "}
                            {new Date(appointment.appointment_date).toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <p>
                            <strong>Lý do:</strong> {appointment.reason}
                          </p>
                          <p>
                            <strong>Trạng thái:</strong> Đã xác nhận
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="doctor-appointment-list-empty">Không có lịch khám nào đã xác nhận.</p>
                  )}
                </div>

                {/* Danh sách lịch khám đã hủy */}
                <div className="doctor-appointment-list-wrapper">
                  <div className="doctor-appointment-list-title">Lịch khám đã hủy</div>
                  {canceledAppointments.length > 0 ? (
                    <ul className="doctor-appointment-list">
                      {canceledAppointments.map((appointment) => (
                        <li key={appointment.appointment_id} className="doctor-appointment-item canceled">
                          <p>
                            <strong>Tên bệnh nhân:</strong> {appointment.patient_name}
                          </p>
                          <p>
                            <strong>Ngày hẹn:</strong>{" "}
                            {new Date(appointment.appointment_date).toLocaleDateString("vi-VN")}{" "}
                            {new Date(appointment.appointment_date).toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <p>
                            <strong>Lý do:</strong> {appointment.reason}
                          </p>
                          <p>
                            <strong>Trạng thái:</strong> Đã hủy
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="doctor-appointment-list-empty">Không có lịch khám nào đã hủy.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorAppointment;
