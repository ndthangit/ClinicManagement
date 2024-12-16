import axios from "axios";
import './MedicalHistory.css';
import Navbar from "../../components/navbar/Navbar";
import MedicalHistoryCell from "./MedicalHistoryCell";
import { useEffect, useState } from "react";
import SpecificInfo from './SpecificInfo';
import { useSelector } from "react-redux";

function MedicalHistory() {
    const [fakeData, setFakeData] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    const { user } = useSelector((state) => state.user.patient); 
    console.log(user);
    useEffect(() => {
        axios.get(`http://localhost:3005/medExam/medicalExam/byIDPatient/${user.patient_id}`)
        .then((response) => {
            console.log(response.data)
            setFakeData(response.data)
        })
    }, [])

    useEffect(() => {
        setFilteredList(fakeData)
    }, [fakeData]) // Đồng bộ danh sách lọc với dữ liệu từ API
    const [specificInfoData, setSpecificInfoData] = useState(null);
    const handleViewButton = (data) => {
        setSpecificInfoData(data)
    }
    const displayItem = (items) => {
        return(
            items.map((data, index) => (
                <MedicalHistoryCell key={index} onView = {handleViewButton} props={data}/>
            ))
        )
    }

    const handleSearching = (e) => {
        const searchData = e.target.value.toLowerCase();
        const filterData = fakeData.filter((item)=>{
            return(
                item.patient.examDate.toLocaleLowerCase().includes(searchData)
            )
        })
        setFilteredList(filterData);
    }
    
    return ( 
    <>
        <div className="appointment dashboard history">
        <Navbar className="header-hist"/>
        <div className="body-hist">
            <div className="content-hist">
                <h1 className="title-content">Lịch sử thăm khám</h1>
                <div className="container-hist">
                    <div className="container-hist-search">
                        <div class="searchbar">
                            <input type="text" placeholder="Search...(DD-MM-YYYY)" id="searchBar" onKeyUp={handleSearching} name="searchBar"/>
                            <i class="fa-solid fa-magnifying-glass glass"></i>
                        </div>
                    </div>
                    <div className="align-content-hist">
                        {displayItem(filteredList)}
                    </div>
                </div>
                <SpecificInfo props={specificInfoData}/> 
            </div>
        </div> 
        </div>
    </>
    );
}

export default MedicalHistory;