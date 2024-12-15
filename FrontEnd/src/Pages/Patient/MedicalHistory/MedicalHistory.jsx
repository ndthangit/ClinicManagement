import axios from "axios";
import './MedicalHistory.css';
import Navbar from "../../Components/navbar/Navbar";
import Leftbar from "../../Components/leftbar/Leftbar";
import MedicalHistoryCell from "./MedicalHistoryCell";
import { useEffect, useState } from "react";
import SpecificInfo from './SpecificInfo';
import { useDispatch, useSelector } from "react-redux";

function MedicalHistory() {
    const [fakeData, setFakeData] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    const { user } = useSelector((state) => state.user.patient);
    const [listExam, setListExam] = useState([]);  
    const dispatch = useDispatch();  
    useEffect(() => {
        axios.get(`http://localhost:3005/medExam/medicalExam/byIDcustomed`)
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
        <div className="appointment dashboard ">
        <Navbar className="header-hist"/>
        <div className="body-hist">
            <div className="content-hist">
                <div className="top-hist">
                    <h1>Lịch sử thăm khám</h1>
                </div>
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