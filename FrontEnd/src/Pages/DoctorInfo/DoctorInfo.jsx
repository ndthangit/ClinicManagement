import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Leftbar from '../components/appointment/Leftbar';
import exampleImage from '../Assets/person.png';
import './DoctorInfo.css'


function DoctorInfo() {
  let {id} = useParams();
  const [doctorInfo, setDoctorInfo] = useState({});
  const [daySelected, setDaySelected] = useState(0);
  const [indexDay, setIndexDay] = useState(0);
  const [schedule, setSchedule] = useState({});
  const [dayShow, setDayShow] = useState(10);

  const nextIndex = (next) => {
    if (next === true) {
      if (indexDay + 10 < Object.keys(schedule).length) {
        setIndexDay(indexDay + 10);
      }
    }
    else {
      if (indexDay - 10 >= 0) {
        setIndexDay(indexDay - 10);
      }
    }
  };

  const selectDay = (index) => {
    console.log(index);
    setDaySelected(index);
  }

  useEffect( () => {
     axios.get(`http://localhost:3005/doctor/${id}`).then((respone) => {
      setDoctorInfo(respone.data);
    });

    axios.get(`http://localhost:3005/appointment/schedule/idDoctor/${id}`).then((respone) => {
      setSchedule(respone.data);
    });
    

  }, []);
  return (
    <div className='doctorInfo dashboard'>
      <Navbar className='header'/>
      <div className='body'>
        <Leftbar className='leftBar'/>
        <div className='content'>
          <div className='head'>
            <img src={exampleImage} className='imageDoctor' ></img>
            <div className='infoDetail'>
              <p>Bác sĩ</p>
              <p className='importantInfo'>{doctorInfo.doctor_name}</p>
              <p>Chuyên khoa </p>
              <p className='importantInfo'>{doctorInfo.specialty}</p>
              <p>Địa chỉ phòng khám </p>
              <p className='importantInfo'>{doctorInfo.address}</p>
            </div>
          </div>
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
                    return (<button key={index} className='cell'> {time} </button>);
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorInfo
