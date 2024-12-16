import React from 'react'
import DoctorNavbar from '../../components/navbar/DoctorNavbar'
import MedicalExamLeftbar from '../../components/leftbar/MedicalExamLeftbar'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DetailHistory.css';
import axios from 'axios';

function DetailHistory() {
  let {examId} = useParams();
  const navigate = useNavigate()
  const [examInfo, setExamInfo] = useState({});
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [services, setServices] = useState([]);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3005/medExam/medicalExam/byId/${examId}`).then((respone) => {
      setExamInfo(respone.data);
      console.log(respone.data);
      setSymptoms(respone.data.symptoms);
      setDiagnosis(respone.data.diagnosis);
    });

    axios.get(`http://localhost:3005/service/serviceUseage/byId/${examId}`).then((respone) => {
      setServices(respone.data);
    });

    axios.get(`http://localhost:3005/medicine/invoices/byId/${examId}`).then((respone) => {
      setMedicines(respone.data);
    })

  }, [])

  return (
    <div className='doctor dashboard detailExam historyExam'>
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
            
            <div className='services patch'>
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
                              <p>Ghi chú: {value.note}</p>
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

            <div className='medicine patch'>
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
                            <p>{value.medicine_name}</p>
                            <p>Số lượng: {value.quantity}</p>
                            <p>Ghi chú: {value.note ? value.note : 'không có'}</p>
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
            <div className='notes'>
              <div className='title'>
                <p>Notes</p>
              </div>
              <div className='value'>
                <p className='valueInfo'>{examInfo.notes}</p>
              </div>
            </div>
            <div className='bottom'>
              <button className='buttonContent' onClick={() => {navigate('/doctor/medical/history')}}>Trở về</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailHistory
