import { useEffect, useState } from "react";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import './MedicalExamination.css'
import MedicalExamCell from "./MedicalExamCell";
import DetailedInfo from "./DetailedInfo";
import axios from "axios";
import AdminLeftbarSchedule from "../../components/leftbar/AdminNavbarSchedule";

function MedicalExamination() {
    const [fakeData, setFakeData] = useState([]);

    const [searchingType, setSearchType] = useState('Exam date');
    const [placeHolder, setPlaceHolder] = useState('exam date dd-mm-yyyy...');

    const formatDate= (isoString) =>{
        // Tạo đối tượng Date từ chuỗi ISO
        const date = new Date(isoString);
    
        // Lấy các thành phần ngày, giờ
        const day = date.getDate().toString().padStart(2, '0'); // Ngày
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng (0-based)
        const year = date.getFullYear(); // Năm
    
        const hours = date.getHours().toString().padStart(2, '0'); // Giờ
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Phút
    
        // Tạo chuỗi ngày giờ dễ đọc
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    useEffect(() => {
        axios.get(`http://localhost:3005/users/medical_exam`)
        .then((response) => {
            let data = response.data;
            data = data.map((item) => {
                item.exam_date = formatDate(item.exam_date);
                return item;
            })

            setFakeData(response.data)
        })
    }, [])
    useEffect(() => {
        setFilteredList(fakeData); // Đồng bộ danh sách lọc với dữ liệu từ API
    }, [fakeData]);
    const [detailedInfo, setDetailedInfo] = useState(null);
    const [filteredList, setFilteredList] = useState(fakeData);


    const handleSearching = (e) => {
        const searchData = e.target.value.toLowerCase();
        const filterData = fakeData.filter((item)=>{
            if(searchingType === 'Exam date'){
                return(
                    item.exam_date.toLocaleLowerCase().includes(searchData)
                )
            }else if(searchingType === 'Appointment ID'){
                return (
                    item.appointment_id.toString().toLocaleLowerCase().includes(searchData)
                )
            }else{
                return(
                    item.exam_id.toString().toLocaleLowerCase().includes(searchData)
                )
            }
        })
        setFilteredList(filterData);
    }
    const handleViewButton = (data) => {
        setDetailedInfo(data)
    }

    const handleButtonClick = () => {
        const optionMenu = document.querySelector(".select-menu")
        optionMenu.classList.toggle('active')
    }

    const optionClick = (event) => {
        const optionMenu = document.querySelector(".select-menu");
        const selectedOption = event.currentTarget.querySelector('.option-text').innerText;

        setSearchType(selectedOption);
        switch (selectedOption) {
            case 'Appointment ID':
                setPlaceHolder('the appointment ID...');
                break;
            case 'Exam ID':
                setPlaceHolder('the exam ID...');
                break;
            default:
                setPlaceHolder('exam date dd-mm-yyyy...');
        }

        optionMenu.classList.remove('active');
    };

    

    return ( 
    <div className="medicalExamDetail dashboard">
        <AdminNavbar className='header'/>
        <div className="body">
            <AdminLeftbarSchedule className='leftBar'/>
            <div className="content customed-content">
                <h1 className="title-content">Các buổi thăm khám đã thực hiện</h1>
                <div className="main-content">
                    <div className="container-hist-search customed-search">
                        <div class="searchbar">
                            <input type="text" placeholder={placeHolder} id="searchBar" onKeyUp={handleSearching} name="searchBar"/>
                            <i class="fa-solid fa-magnifying-glass glass"></i>
                        </div>
                        <div class="select-menu">
                            <div class="select-btn" onClick={handleButtonClick}>
                                <span class="sBtn-text">{searchingType}</span>
                                <i class="bx bx-chevron-down"></i>
                            </div>

                            <ul class="options">
                                <li class="option" onClick={optionClick}>
                                    <span class="option-text">Exam ID</span>
                                </li>
                                <li class="option" onClick={optionClick}>
                                    <span class="option-text">Appointment ID</span>
                                </li>
                                <li class="option" onClick={optionClick}>
                                    <span class="option-text">Exam date</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="align-content-hist">
                        <div className="header-table-exam">
                            <h3 className="header-title">Examination ID</h3>
                            <h3 className="header-title">Appointment ID</h3>
                            <h3 className="header-title">Examination date</h3>
                            <h3 className="action-title">Action</h3>
                        </div>
                        <div className="content-table-exam">
                            {filteredList.map((data, index) => {
                                return(
                                    <MedicalExamCell props={data} key={index} onView={handleViewButton}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <DetailedInfo props={detailedInfo}/>
            </div>
        </div>
    </div> );
}

export default MedicalExamination;