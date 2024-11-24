import React from 'react'
import DoctorNavbar from '../../components/navbar/DoctorNavbar'
import MedicalExamLeftbar from '../../components/leftbar/MedicalExamLeftbar'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetailHistory() {
  let {examId} = useParams();
  const [examInfo, setExamInfo] = useState({});
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [services, setServices] = useState([]);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3005/medExam/medicalExam/byId/${examId}`).then((respone) => {
      setExamInfo(respone.data);
      setSymptoms(respone.data.symptoms);
      setDiagnosis(respone.data.diagnosis);
    });
  }, [])

  return (
    <div className='doctor dashboard detailExam'>
      <DoctorNavbar className='header'/>
      <div className='body'>
        <MedicalExamLeftbar className='leftBar'/>
        <div className='content'>
          <div>
            <div className='top'>
              <div className='patientInfo'>
                <p className='title'>Thông tin bệnh nhân</p>
                <div className='info'> 
                  <p>Tên bệnh nhân</p>
                  <p>{examInfo.patient_name}</p>
                </div>
                <div className='info'> 
                  <p>Giới tính</p>
                  <p>{examInfo.gender}</p>
                </div>
                <div className='info'>
                  <p>CCCD</p>
                  <p>{examInfo.cccd}</p>
                </div>
                <div className='info'>
                  <p>sđt</p>
                  <p>{examInfo.phone}</p>
                </div>
                <div className='info'>
                  <p>Ngày sinh</p>
                  <p>{examInfo.date_of_birth}</p>
                </div>
              </div>
              <div className='optionalInfo'>
                <div className='info'>
                  <p className='title'>Thông tin về bệnh tình:</p>
                  <p className='reason'>{examInfo.reason}</p>
                </div>
                <div className='patch'>
                  <p>Triệu chứng:</p>
                  {
                  <div className='value'>
                    <p className='sub'>{symptoms.length > 0 ? symptoms : 'không có thông tin'}</p>
                  </div>
                  }
                </div>
                <div className='patch'>
                  <p>Chuẩn đoán:</p>
                  {
                  <div className='value'>
                    <p className='sub'>{diagnosis.length > 0 ? diagnosis : 'không có thông tin'}</p>
                  </div>
                  } 
                </div>
              </div>
            </div>
            
            <div className='services'>
              <div className='examService'>
                <div className='titleService'>
                  <p >Dịch vụ khám</p>
                </div>

                {
                  services.length > 0 && (<div className='table'>
                    <div className='listCell'> 
                    {
                      services.map((value, index) => {
                        return (
                          <div className='cell' key={index}>
                            <div className='value'> 
                              <p>{value.service_name}</p>
                              <p>{value.note}</p>
                            </div>
                          </div>
                        );
                      })
                    }
                    </div>
                  </div>
                  )
                }
                
              </div>
            </div>

            <div className='medicine'>
              <div className='titleMedicine'>
                  <p>Đơn thuốc</p>
              </div>
              {
                medicines.length > 0 && (<div className='table'>
                  <div className='listCell'> 
                  {
                    medicines.map((value, index) => {
                      return (
                        <div className='cell' key={index}>
                          <div className='value'> 
                            <p>{value.service_name}</p>
                            <p>{value.note}</p>
                          </div>
                        </div>
                      );
                    })
                  }
                  </div>
                </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailHistory
