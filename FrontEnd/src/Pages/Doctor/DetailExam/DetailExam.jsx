import React, { useEffect, useState, useRef } from 'react'
import DoctorNavbar from '../../components/navbar/DoctorNavbar'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './DetailExam.css';
import { Button, InputLabel, TextareaAutosize } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import MedicalExamLeftbar from '../../components/leftbar/MedicalExamLeftbar';

function DetailExam() {

  let {examId} = useParams();
  const navigate = useNavigate();

  // for patient information
  const [examInfo, setExamInfo] = useState({});
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [configDiag, setConfigDiag] = useState(true);
  const [configSymbol, setConfigSymbol] = useState(true);
  

  // for service information
  const [services, setServices] = useState([]);
  const [filterServices, setFilterServices] = useState([]);
  const [listService, setListService] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [notedService, setNotedService] = useState('');
  const [isServiceVisible, setIsServiceVisible] = useState(false);
  const serviceRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef(null);
  const [isExpandedService, setIsExpandedService] = useState(false);

  //for medicine information
  const [medicines, setMedicines] = useState([]);
  const [filterMedicines, setFilterMedicines] = useState([]);
  const [listMedicines, setListMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [notedMedicine, setNotedMedicine] = useState('');
  const [numsMedicine, setNumsMedicine] = useState(0);
  const [isMedicineVisible, setIsMedicineVisible] = useState(false);
  const medicineRef = useRef(null);
  const listMedicineRef = useRef(null);
  const [isExpandedMedicine, setIsExpandedMedicine] = useState(false);

  const [notes, setNotes] = useState('');

  const handleClickOutside = (e) => {
    if (serviceRef.current && !serviceRef.current.contains(e.target)) {
      setIsServiceVisible(false);
    }
    if (medicineRef.current && !medicineRef.current.contains(e.target)) {
      setIsMedicineVisible(false);
    }
  };


  useEffect(() => {
    axios.get(`http://localhost:3005/medExam/medicalExam/byId/${examId}`).then((respone) => {
      setExamInfo(respone.data);
      setSymptoms(respone.data.symptoms);
      setConfigSymbol(respone.data.symptoms.length > 0);
      setDiagnosis(respone.data.diagnosis);
      setConfigDiag(respone.data.diagnosis.length > 0);
    });

    axios.get(`http://localhost:3005/service/serviceUseage/byId/${examId}`).then((respone) => {
      setServices(respone.data);
    });

    axios.get(`http://localhost:3005/service/byId/${examId}`).then((respone) => {
      setListService(respone.data);
      setFilterServices(respone.data);
    });

    axios.get(`http://localhost:3005/medicine/byId/${examId}`).then((respone) => {
      setListMedicines(respone.data);
      setFilterMedicines(respone.data);
    });

    axios.get(`http://localhost:3005/medicine/invoices/byId/${examId}`).then((respone) => {
      setMedicines(respone.data);
    })

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const changeInfo = (value) => {
    if (value === 'symptoms') {
      axios.post(`http://localhost:3005/medExam/medicalExam/byId/${examId}`, {
        symptoms: symptoms,
        changeInfo: value
      })
    }
    else {
      axios.post(`http://localhost:3005/medExam/medicalExam/byId/${examId}`, {
        diagnosis: diagnosis,
        changeInfo: value
      })
    }
  }

  const changeValueNums = (e) => {
    // Lọc ra các ký tự không phải số
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    return newValue
  };

  const symDiv = () => {
    if (configSymbol === true) {
      return (
        <div className='value'>
          <p className='sub'>{symptoms.length > 0 ? symptoms : 'không có thông tin'}</p>
          <button className='button' onClick={() => {setConfigSymbol(!configSymbol)}}>Sửa</button>
        </div>
      );
    }
    else {
      return (
        <div className='value'>
          <input value={symptoms} onChange={(e) => setSymptoms(e.target.value)} ></input>
          <button className='button' onClick={() => {setConfigSymbol(!configSymbol); changeInfo('symptoms')}}>Xác nhận</button>
        </div>
      );
    }
  }

  const diaDiv = () => {
    if (configDiag === true) {
      return (
        <div className='value'>
          <p className='sub'>{diagnosis.length > 0 ? diagnosis : 'không có thông tin'}</p>
          <button className='button' onClick={() => {setConfigDiag(!configDiag)}}>Sửa</button>
        </div>
      );
    }
    else {
      return (
        <div className='value'>
          <input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} ></input>
          <button className='button' onClick={() => {setConfigDiag(!configDiag); changeInfo('diagnosis')}}>Xác nhận</button>
        </div>
      );
    }
  }

  const filterService = (valService) => {
    setSelectedService(valService);
    if (!isServiceVisible) setIsServiceVisible(true);
    if (valService.length == 0) setFilterServices(listService);
    else setFilterServices(listService.filter(obj => obj.service_name.toLowerCase().includes(valService.toLowerCase())))
  }

  const filterMedicine = (valMedicine) => {
    setSelectedMedicine(valMedicine);
    if (!isMedicineVisible) setIsMedicineVisible(true);
    if (valMedicine.length == 0) setFilterMedicines(listMedicines);
    else setFilterMedicines(listMedicines.filter(obj => obj.medicine_name.toLowerCase().includes(valMedicine.toLowerCase())))
  }

  const handleKeyDown = (e, type, ref) => {
    if (e.key === "ArrowDown") {
      // Di chuyển xuống danh sách
      console.log("Arrow Down");
      setHighlightedIndex((prevIndex) => {
          const length = type === "medicine" ? filterMedicines.length : filterServices.length;
          const nextIndex = prevIndex < length - 1 ? prevIndex + 1 : 0;
          scrollToHighlighted(nextIndex, ref);
          return nextIndex;
        }
      );
    }
    else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => {
          const length = type === "medicine" ? filterMedicines.length : filterServices.length;
          const nextIndex = prevIndex > 0 ? prevIndex - 1 : length - 1;
          scrollToHighlighted(nextIndex, ref);
          return nextIndex;
        }
      );
    }
    else if (e.key === "Enter") {
      const length = type === "medicine" ? filterMedicines.length : filterServices.length;
      if (length <= 0) return;
      let index = highlightedIndex >= 0 ? highlightedIndex : 0;
      if (type === 'service') {
        setSelectedService(filterServices[index].service_name); // Chọn phần tử đầu tiên
        setIsServiceVisible(false);
      }
      else if (type === 'medicine') {
        setSelectedMedicine(filterMedicines[index].medicine_name);
        setIsMedicineVisible(false);
      }
    }
  };

  const scrollToHighlighted = (index, ref) => {
    const listElement = ref.current;
    const itemElement = listElement?.children[index];
    if (itemElement && listElement) {
      const listRect = listElement.getBoundingClientRect();
      const itemRect = itemElement.getBoundingClientRect();

      if (itemRect.top < listRect.top) {
        listElement.scrollTop -= listRect.top - itemRect.top;
      } else if (itemRect.bottom > listRect.bottom) {
        listElement.scrollTop += itemRect.bottom - listRect.bottom;
      }
    }
  };

  const removeService = async (index) => {
    await axios.post('http://localhost:3005/service/removeService', services[index]);
    await axios.get(`http://localhost:3005/service/serviceUseage/byId/${examId}`).then((respone) => {
      setServices(respone.data);
    });

    await axios.get(`http://localhost:3005/service/byId/${examId}`).then((respone) => {
      setListService(respone.data);
      setFilterServices(respone.data);
    });
  }

  const removeMedicine = async (index) => {
    await axios.post('http://localhost:3005/medicine/removeMedicine', medicines[index]);

    await axios.get(`http://localhost:3005/medicine/byId/${examId}`).then((respone) => {
      setListMedicines(respone.data);
      setFilterMedicines(respone.data);
    });

    await axios.get(`http://localhost:3005/medicine/invoices/byId/${examId}`).then((respone) => {
      setMedicines(respone.data);
    })
  }

  const expandService = () => {
    if (services.length > 0) {
      
      if (isExpandedService) {
        return (
          <div className='table'>
            <div className='listCell'> 
            {
              services.map((value, index) => {
                return (
                  <div className='cell' key={index}>
                    <div className='value'> 
                      <p>{value.service_name}</p>
                      <p>{value.note}</p>
                    </div>
                    <Tooltip title="Xóa" className='remove' onClick={() => removeService(index)}>
                      <DeleteIcon />
                    </Tooltip>
                  </div>
                );
              })
            }
            </div>
            <Tooltip title="Mở rộng" className='expandIcon' onClick={() => setIsExpandedService(false)}>
              <ExpandLessIcon />
            </Tooltip>
          </div>
        )
      }
      else {
        return (
          <Tooltip title="Mở rộng" className='expandIcon' onClick={() => setIsExpandedService(true)}>
            <ExpandMoreIcon />
          </Tooltip>
        )
      }
    }
  }

  const expandMedicine = () => {
    if (medicines.length > 0) {
      if (isExpandedMedicine) {
        return (
          <div className='table'>
            <div className='listCell'>
            {
              medicines.map((value, index) => {
                return (
                  <div className='cell' key={index}>
                    <div className='value'> 
                      <p>Tên thuốc: {value.medicine_name}</p>
                      <p>Số lượng: {value.quantity.split('.')[0]}</p>
                      <p>Chỉ định: {value.note ? value.note : 'Không có chỉ định'}</p>
                    </div>
                    <Tooltip title="Xóa" className='remove' onClick={() => removeMedicine(index)}>
                      <DeleteIcon />
                    </Tooltip>
                  </div>
                );
              })
            }
            </div>
            <Tooltip title="Ẩn bớt" className='expandIcon' onClick={() => setIsExpandedMedicine(false)}>
              <ExpandLessIcon />
            </Tooltip>
          </div>
        )
      }
      else {
        return (
          <Tooltip title="Mở rộng" className='expandIcon' onClick={() => setIsExpandedMedicine(true)}>
            <ExpandMoreIcon />
          </Tooltip>
        )
      }
    }
  }

  const submitService = async() => {
    const serviceInfo = filterServices.find(service => service.service_name === selectedService);
    if (serviceInfo) {
      await axios.post(`http://localhost:3005/service/serviceUseage/byId/${examId}`, {
        service_id:serviceInfo.service_id, 
        note:notedService
      });
      setSelectedService('');
      setNotedService('');
      await axios.get(`http://localhost:3005/service/serviceUseage/byId/${examId}`).then((respone) => {
        setServices(respone.data);
        console.log(services);
      });

      await axios.get(`http://localhost:3005/service/byId/${examId}`).then((respone) => {
        setListService(respone.data);
        setFilterServices(respone.data);
      });
    }
  }

  const submitMedicine = async() => {

    const medicineInfo = filterMedicines.find(medicine => medicine.medicine_name === selectedMedicine);
    console.log(notedMedicine);
    if (medicineInfo) {
      await axios.post(`http://localhost:3005/medicine/invoices/byId/${examId}`, {
        medicine_id:medicineInfo.medicine_id, 
        note: notedMedicine,
        quantity: parseInt(numsMedicine)
      });
      setSelectedMedicine('');
      setNotedMedicine('');
      setNumsMedicine(0);
      await axios.get(`http://localhost:3005/medicine/byId/${examId}`).then((respone) => {
        setListMedicines(respone.data);
        setFilterMedicines(respone.data);
      });

      await axios.get(`http://localhost:3005/medicine/invoices/byId/${examId}`).then((respone) => {
        setMedicines(respone.data);
      })
    }
  }

  const submitNote = async () => {
    await axios.post(`http://localhost:3005/medExam/medicalExam/byId/${examId}`, {
      notes: notes,
      changeInfo: 'notes'
    });
  }

  const submitExam = async () => {
    await axios.post(`http://localhost:3005/medExam/medicalExam/byId/${examId}`, {
      status: 'completed',
      changeInfo: 'status'
    });
    navigate('/doctor/medical');
  }

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
                    symDiv()
                  }
                </div>
                <div className='patch'>
                  <p>Chuẩn đoán:</p>
                  {
                    diaDiv()
                  } 
                </div>
              </div>
            </div>
            
            <div className='services'>
              <div className='examService'>
                <div className='titleService'>
                  <p >Dịch vụ khám</p>
                </div>
                <div className='addService'>
                  <div className='batch'>
                    <p className='title'>Tên dịch vụ</p>
                    <div className='addNameService ' ref={serviceRef}>
                      <input className='inputService inputValue' value={selectedService} onChange={(event) => filterService(event.target.value)} onFocus={() => {setIsServiceVisible(true); filterService(selectedService); setHighlightedIndex(-1);}} onKeyDown={(event) => {handleKeyDown(event, 'service', listRef)}} placeholder="Type to search..."/>
                      {isServiceVisible && filterServices.length > 0 && (
                          <div className="listService" ref={listRef}>
                            {filterServices.map((item, index) => {
                              if (highlightedIndex === index) {
                                return (
                                  <div className='cellService selected' key={index} onClick={() => {setSelectedService(item.service_name); setIsServiceVisible(false)}}>
                                    {item.service_name}
                                  </div>
                                )
                              }
                              return (
                              <div className='cellService' key={index} onMouseOver={() => setHighlightedIndex(index)} onClick={() => {setSelectedService(item.service_name); setIsServiceVisible(false)}}>
                                {item.service_name}
                              </div>
                            )})}
                          </div>
                        )}  
                    </div>
                  </div>
                  <div className='batch'>
                    <p className='title'>note</p>
                    <input className='noted inputValue' value={notedService} onChange={(event) => setNotedService(event.target.value)}></input>
                  </div>
                  <button className='buttonContent' onClick={() => submitService()}>Thêm dịch vụ</button>
                </div>
                {
                  expandService()
                }
                
              </div>
            </div>

            <div className='medicine'>
              <div className='titleMedicine'>
                  <p>Đơn thuốc</p>
              </div>
              <div className='addMedicine'>
                <div className='batch'>
                  <p className='title'>Tên thuốc</p>
                  <div className='addNameMedicine' ref={medicineRef}>
                    <input className='inputMedicine inputValue' value={selectedMedicine} onChange={(e) => filterMedicine(e.target.value)} onFocus={() => {setIsMedicineVisible(true); filterMedicine(selectedMedicine); setHighlightedIndex(-1);}} onKeyDown={(event) => handleKeyDown(event, 'medicine', listMedicineRef)}></input>
                    {
                      isMedicineVisible && filterMedicines.length > 0 && (
                        <div className='listMedicine' ref={listMedicineRef}> 
                          {
                            filterMedicines.map((item, index) => {
                              if (highlightedIndex === index) {
                                return (
                                  <div className='cellMedicine selected' key={index} onClick={() => {setSelectedMedicine(item.medicine_name); setIsMedicineVisible(false)}}>
                                    {item.medicine_name}
                                  </div>
                                )
                              }
                              return (
                              <div className='cellMedicine' key={index} onMouseOver={() => setHighlightedIndex(index)} onClick={() => {setSelectedMedicine(item.medicine_name); setIsMedicineVisible(false)}}>
                                {item.medicine_name}
                              </div>
                            )})
                          }
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className='batch'>
                  <p className='title'>Số lượng</p>
                  <input className='inputValue' value={numsMedicine} onChange={(e) => setNumsMedicine(changeValueNums(e))}></input>
                </div>
                <div className='batch'>
                  <p className='title'>note</p>
                  <input className='inputValue' value={notedMedicine} onChange={(e) => setNotedMedicine(e.target.value)}></input>
                </div>

                <button className='submitMedicine buttonContent' onClick={() => submitMedicine()}>Thêm thuốc</button>
              </div>
              {
                expandMedicine()
              }
            </div>
            <div className='notes'>
              <div className='title'>
                <p>Notes</p>
              </div>
              <div className='value'>
                <textarea className='area' value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                <button className='buttonContent button' onClick={() => {submitNote()}}>Xác nhận</button>
              </div>
            </div>
            <div className='submitExam'>
                <Button className='buttonSubmit button' onClick={() => submitExam()}>Hoàn thành</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailExam
