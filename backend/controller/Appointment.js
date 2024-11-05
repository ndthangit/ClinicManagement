const connection = require('../DB/database')


function executeQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
      connection.query(sql, params, (err, results) => {
          if (err) {
              return reject(err);
          }
          resolve(results);
      });
  });
}

const getSchedule = async(req, res) => {
  const doctorId = req.params.id;
  const sql = 'SELECT * FROM dataIT3170.Appointments';
  const result = await executeQuery(sql);
  res.json(result);
}

const convertFormat = async(dateTimes) => {
  const dateMap = {};
  dateTimes.forEach(dateTime => {
    dateTime.setMinutes(dateTime.getMinutes() + 7 * 60);
    const date = dateTime.toISOString().split('T')[0];
    const time = dateTime.toISOString().split('T')[1].split('.')[0];
    if (!dateMap[date]) {
      dateMap[date] = [];
    }
    dateMap[date].push(time);
  });

  return dateMap;
}

const getScheduleByIdDoctor = async (req, res) => {
  const doctorId = req.params.id;
  const formattedTime = new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
  const time = formattedTime.slice(6, 10) + '-' + formattedTime.slice(3, 5) + '-' + formattedTime.slice(0, 2)+ 'T00:00:00.000Z';
  const sql = 'SELECT * FROM dataIT3170.Appointments WHERE doctor_id = ? AND appointment_date >= ?';
  const info = await executeQuery(sql, [doctorId, time]);
  const dateTime = info.map(appointment => appointment.appointment_date);
  const result = await convertFormat(dateTime);
  return result;
}

const getScheduleForDocterByIdDoctor = async(req, res) => {
  const result = await getScheduleByIdDoctor(req, res);
  res.json(result);
}

const createScheduleForDoctor = async (numsDay, start, end, step) => {
  const today = new Date();
  const daysList = {};

  const timeSlot = []
  end.setMinutes(end.getMinutes() + 7 * 60); // chỉnh theo giờ VN
  start.setMinutes(start.getMinutes() + 7 * 60); // chỉnh theo giờ VN
  while (start < end) {
    timeSlot.push(start.toISOString().split('T')[1].split('Z')[0].slice(0, 8));
    start.setMinutes(start.getMinutes() + step); 
  }

  const clonedLists = Array(numsDay).fill().map(() => [...timeSlot]);

  for (let i = 0; i < numsDay; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    daysList[nextDate.toISOString().split('T')[0]] = clonedLists[i];
  }
  return daysList;
}

const getScheduleForPatientByIdDoctor = async(req, res) => {
  const result = await getScheduleByIdDoctor(req, res);
  const startTime = new Date("2024-10-30T17:00:00");
  const endTime = new Date("2024-10-30T20:00:00");
  const schedule = await createScheduleForDoctor(60, startTime, endTime, 10);
  Object.entries(result).forEach(([key, value]) => {
    value.sort();
    let i = 0, j = 0;
    while (i < value.length && j < schedule[key].length) {
      if (value[i] == schedule[key][j]) {
        schedule[key].splice(j, 1);
        i++;
      }
      else if (value[i] < schedule[key][j]) {
        i++;
      }
      else {j++;}
    }
  })
  res.json(schedule);
}

const postSchedule = async (req, res) => {
  const info = req.body;
  console.log(info);
  const sql = `INSERT INTO dataIT3170.appointments (patient_id, doctor_id, appointment_date, reason, status)
               VALUES (?, ?, ?, ?, 'pending')`;
  await executeQuery(sql, [info.patient_id, info.doctor_id, info.appointment_date, info.reason])
  res.json(info);
}

module.exports = {
  getSchedule: getSchedule,
  getScheduleForDocterByIdDoctor: getScheduleForDocterByIdDoctor,
  getScheduleForPatientByIdDoctor: getScheduleForPatientByIdDoctor,
  postSchedule: postSchedule
}