import React from 'react'
import DoctorNavbar from '../../components/navbar/DoctorNavbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import MedicalExamLeftbar from '../../components/leftbar/MedicalExamLeftbar';
import { useSelector } from 'react-redux';

function HistoryExam() {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user.doctor);
  const [medicalExam, setMedicalExam] = useState([]);
  const [listExam, setListExam] = useState([]);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3005/medExam/historyExam/byId/${user.doctor_id}`).then((response) => {
        setMedicalExam(response.data);
      })
    }
  }, [user]);

  const selectDate = async (info) => {
    setListExam(info);
    setSelected(true);
  }

  const convertTime = (time) => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    return (hour < 10 ? '0' + hour : hour) + " : " + (minute < 10 ? '0' + minute : minute);
  }

  const selectExam = (id) => {
    navigate(`/doctor/medical/history/${id}`);
  }

  const showSchedule = () => {
    if (medicalExam.length > 0) {
      console.log(medicalExam.length);
      return  medicalExam.map(([key, value], index) => {
        return (
          <button className='cell' key={index} onClick={() => selectDate(value)}> 
            {key.slice(8,10)+'-'+key.slice(5,7)+'-'+key.slice(0,4)}
          </button>
        )
      })
    }
    else {
      return (
        <p className='notification'> Không có lịch khám</p>
      )
    }
  }

  return (
    <div className='doctor dashboard medicalExam'>
      <DoctorNavbar className='header'/>
      <div className='body'>
        <MedicalExamLeftbar className='leftBar' />
        <div className='content'>
          <div className='title'>
            <p >Danh sách buổi khám</p>
          </div>
          <div className='table'>
          {
            showSchedule()
          }
          </div>
          {
            selected && (
              <div className='borderTable'>
                <div className='tableTime'>
                  {
                    listExam.map((value, index) => {
                      return (
                        <button className='cell' key={index} onClick={()=>{selectExam(value.exam_id)}}>
                          <div className='info'>
                            <div className='time'>
                              <p>{convertTime(new Date(value.appointment_date))}</p>
                            </div>
                            <div className='detail'>
                              <div className='line'>
                                <div >Mã: </div>
                                <div className='value'>{value.exam_id}</div>
                              </div>
                              <div className='line'>
                                <div>Tên bệnh nhân: </div>
                                <div className='value'>{value.patient_name}</div>
                              </div>  
                            </div>
                          </div>
                        </button>
                      )
                    })
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default HistoryExam
