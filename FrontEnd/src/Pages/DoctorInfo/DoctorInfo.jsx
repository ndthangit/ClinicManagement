import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Leftbar from '../components/appointment/Leftbar';
import exampleImage from '../Assets/person.png';
import './DoctorInfo.css'
import { useSelector } from 'react-redux';
import { modifileSuccess } from '../components/schedule/Alert';


function DoctorInfo() {
  let {id} = useParams();
  const {user} = useSelector((state) => state.user.patient);
  const navigate = useNavigate();

  const [doctorInfo, setDoctorInfo] = useState({});
  const [daySelected, setDaySelected] = useState(0);
  const [indexDay, setIndexDay] = useState(0);
  const [schedule, setSchedule] = useState({});
  const [patientInfo, setPatientInfo] = useState({});
  const [dayShow, setDayShow] = useState(10);
  const [reason, setReason] = useState('');
  const [isChooseTime, setIsChooseTime] = useState(false);
  const [timeSelected, setTimeSelected] = useState('');


  // lấy thông tin từ phần chỉnh sửa lịch

  const nextIndex = (next) => {
    if (next === true) {
      if (indexDay + dayShow < Object.keys(schedule).length) {
        setIndexDay(indexDay + dayShow);
      }
    }
    else {
      if (indexDay - dayShow >= 0) {
        setIndexDay(indexDay - dayShow);
      }
    }
  };

  const selectDay = (index) => {
    setDaySelected(index);
  }

  const checkCondition = () => {
    if (user === undefined) {
      navigate('/login');
    }
  }

  const submit = (patient_id, doctor_id, date, reason) => {
    axios.post('http://localhost:3005/appointment', {
      patient_id: patient_id,
      doctor_id: doctor_id,
      appointment_date: date,
      reason: reason,
    });
    modifileSuccess();
    navigate(`/schedule/${patient_id}`);
  }

  const chooseTime = () => {
    if (isChooseTime) {
      return (
        <div className='info'>
          <div className='timeInfo'>
            <p>Thời gian:</p>
            <div className='detailTime'> 
              <p className='field'>Ngày khám:</p>
              <p className='infoValue'>{Object.keys(schedule).at(daySelected)}</p>
              <p className='field'>Khung giờ:</p>
              <p className='infoValue'>{timeSelected.slice(0, 5)}</p>

              <button className='changeTime' onClick={() => {setIsChooseTime(false)}}>Đặt lại giời gian</button>
            </div>
          </div>
          <div className='patientInfo'>
            <p>Thông tin bệnh nhân: </p>
            <div className='detailInfo'>
              <p className='field'>Tên:</p>
              <p className='infoValue'>{patientInfo.patient_name}</p>
              <p className='field'>Ngày sinh:</p>
              <p className='infoValue'>{patientInfo.date_of_birth.slice(0, 10)}</p>
              <p className='field'>Giới tính:</p>
              <p className='infoValue'>{patientInfo.gender}</p>
            </div>
          </div>
          <div className='optionalInfo'>
            <p>Thông tin bổ sung:</p>
            <textarea className='input' placeholder='Triệu chứng, thuốc đang dùng, tiền sử' onChange={(event)=>{setReason(event.target.value)}}></textarea>
          </div>
          <div className='footer'>
            <button className='submit' onClick={() => {submit(patientInfo.patient_id, id, Object.keys(schedule).at(daySelected)+' '+timeSelected, reason)}}>Đặt lịch</button>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='table'>
          <p>Đặt lịch khám</p>
          <div className='date'>
            <button onClick={()=>{nextIndex(false)}}>{'<'}</button>
            {
              Object.keys(schedule).slice(indexDay, indexDay+dayShow).map((key, index) => {
                return (<button key={index} className='cell' onClick= {() => {selectDay(index)}}> {key.slice(8,10) + '-' + key.slice(5, 7) + ` (${schedule[key].length})`} </button>);
              })
            }
            <button onClick={()=>{nextIndex(true)}}>{'>'}</button>
          </div>
          <div className='tableTime'>
            <div className='time'>
              {
                Object.values(schedule).slice(daySelected, daySelected+1).flat().map((time, index) => {
                  return (<button key={index} className='cell' onClick={() => {checkCondition(); setIsChooseTime(true); setTimeSelected(time)}}> {time} </button>);
                })
              }
            </div>
          </div>
        </div>
      )
    }
  }
  useEffect( () => {
     axios.get(`http://localhost:3005/doctor/${id}`).then((respone) => {
      setDoctorInfo(respone.data);
    });

    console.log(doctorInfo);

    axios.get(`http://localhost:3005/appointment/schedule/idDoctor/${id}`).then((respone) => {
      setSchedule(respone.data);
    });

    axios.get(`http://localhost:3005/patient/byCCCD/${user}`).then((respone) => {
      setPatientInfo(respone.data);
    });

  }, []);
  return (
    <div className='doctorInfo dashboard'>
      <Navbar className='header' user={patientInfo}/>
      <div className='body'>
        <Leftbar className='leftBar'/>
        <div className='content'>
          <div className='head'>
            <img src={exampleImage} className='imageDoctor' ></img>
            <div className='infoDetail'>
              <div className='field'>
                <p>Bác sĩ:</p>
                <p className='importantInfo'>{doctorInfo.doctor_name}</p>
              </div>
              <div className='field'>
                <p>Khoa:</p>
                <p className='importantInfo'>{doctorInfo.department_name}</p>
              </div>
              <div className='field'>
                <p>Loại:</p>
                <p className='importantInfo'>{doctorInfo.type_name}</p>
              </div>
            </div>
            <div className='changeDoctor'>
              <button className='changeButton' onClick={() => {navigate('/appointment')}}>Đổi bác sĩ</button>
            </div>
          </div>
          <div className='work'>
            {
              chooseTime()
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorInfo
