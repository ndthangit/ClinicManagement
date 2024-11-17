import axios from "axios";
import './MedicalHistory.css';
import Navbar from "../Components/NavBar/Navbar";
import Leftbar from "../Components/Appointment/Leftbar";
import MedicalHistoryCell from "./MedicalHistoryCell";
import { useEffect, useState } from "react";
import SpecificInfo from './SpecificInfo';

const fakeData = [
    {
        doctor: {
            name: "Lê Minh Tuấn",
            type: "ThS.BS",
            department: "Khoa Tim mạch",
            email: "tuanle@gmail.com",
            phone: "0909876543"
        },
        services: [
            {
                serviceName: "Khám tim mạch",
                description: "Khám và tư vấn về sức khỏe tim mạch cho bệnh nhân",
                price: "350$",
                usageDate: "10-01-2022",
                note: "Cần thực hiện các xét nghiệm trước khi khám"
            },
            {
                serviceName: "Điện tâm đồ",
                description: "Xét nghiệm để kiểm tra hoạt động điện của tim",
                price: "200$",
                usageDate: "10-01-2022",
                note: "Thực hiện khi có triệu chứng rối loạn nhịp tim"
            }
        ],
        medicine: [
            { name: "Aspirin", quantity: 30, note: "Uống mỗi ngày 1 viên" },
            { name: "Lisinopril", quantity: 20, note: "Uống 1 lần/ngày sau ăn" }
        ],
        patient: {
            examDate: "10-01-2022",
            symptoms: "Đau ngực, khó thở",
            diagnosis: "Thiếu máu cơ tim",
            notes: "Theo dõi tình trạng tim và tái khám sau 3 tháng."
        }
    },
    {
        doctor: {
            name: "Vũ Thị Thảo",
            type: "BS.CKII",
            department: "Khoa Nhi",
            email: "thaovu@gmail.com",
            phone: "0987654321"
        },
        services: [
            {
                serviceName: "Khám nhi khoa",
                description: "Khám sức khỏe cho trẻ em và tư vấn dinh dưỡng",
                price: "80$",
                usageDate: "05-03-2023",
                note: "Kiểm tra sức khỏe tổng thể cho trẻ"
            },
            {
                serviceName: "Siêu âm thai",
                description: "Kiểm tra sức khỏe thai nhi qua siêu âm",
                price: "300$",
                usageDate: "05-03-2023",
                note: "Thực hiện khi thai kỳ từ 12 tuần"
            }
        ],
        medicine: [
            { name: "Paracetamol", quantity: 50, note: "Dùng khi sốt" },
            { name: "Calcium", quantity: 60, note: "Uống mỗi ngày 1 viên" }
        ],
        patient: {
            examDate: "05-03-2023",
            symptoms: "Ho, sốt nhẹ",
            diagnosis: "Cảm cúm",
            notes: "Uống thuốc và nghỉ ngơi, theo dõi nhiệt độ."
        }
    },
    {
        doctor: {
            name: "Nguyễn Thị Quỳnh",
            type: "TS.BS",
            department: "Khoa Da liễu",
            email: "quynhnguyen@gmail.com",
            phone: "0901234567"
        },
        services: [
            {
                serviceName: "Khám da liễu",
                description: "Khám và điều trị các bệnh lý về da liễu",
                price: "150$",
                usageDate: "20-04-2022",
                note: "Kiểm tra các vấn đề về mụn, viêm da"
            },
            {
                serviceName: "Điều trị nám da",
                description: "Điều trị các vết nám và tàn nhang trên da mặt",
                price: "250$",
                usageDate: "20-04-2022",
                note: "Thực hiện điều trị trong vòng 2 tháng"
            }
        ],
        medicine: [
            { name: "Hydrocortisone", quantity: 15, note: "Bôi lên da mỗi ngày 1 lần" },
            { name: "Vitamin C", quantity: 30, note: "Uống mỗi ngày 1 viên" }
        ],
        patient: {
            examDate: "20-04-2022",
            symptoms: "Mụn, da khô",
            diagnosis: "Viêm da dị ứng",
            notes: "Cần tránh ánh nắng trực tiếp và sử dụng kem chống nắng."
        }
    },
    {
        doctor: {
            name: "Trương Văn Khôi",
            type: "BS.CKI",
            department: "Khoa Ngoại",
            email: "khoi.truong@gmail.com",
            phone: "0935436789"
        },
        services: [
            {
                serviceName: "Khám ngoại khoa",
                description: "Khám và chẩn đoán các vấn đề về cơ xương khớp",
                price: "120$",
                usageDate: "01-08-2023",
                note: "Tư vấn điều trị các vấn đề về xương khớp"
            },
            {
                serviceName: "Chụp X-quang",
                description: "Xét nghiệm hình ảnh để kiểm tra cấu trúc xương",
                price: "80$",
                usageDate: "01-08-2023",
                note: "Cần chụp khi có nghi ngờ về gãy xương"
            }
        ],
        medicine: [
            { name: "Ibuprofen", quantity: 20, note: "Uống mỗi 6 giờ khi đau" },
            { name: "Calcium", quantity: 30, note: "Uống mỗi ngày 1 viên" }
        ],
        patient: {
            examDate: "01-08-2023",
            symptoms: "Đau lưng, khó di chuyển",
            diagnosis: "Thoái hóa đĩa đệm",
            notes: "Cần điều trị vật lý trị liệu và nghỉ ngơi."
        }
    },
    {
        doctor: {
            name: "Hoàng Minh Tâm",
            type: "PGS.TS",
            department: "Khoa Nội tổng quát",
            email: "tamhoang@gmail.com",
            phone: "0945236789"
        },
        services: [
            {
                serviceName: "Khám nội tổng quát",
                description: "Khám và đánh giá tổng quát tình trạng sức khỏe",
                price: "200$",
                usageDate: "18-06-2021",
                note: "Khám sức khỏe tổng thể, bao gồm xét nghiệm máu và siêu âm"
            },
            {
                serviceName: "Xét nghiệm chức năng gan",
                description: "Xét nghiệm kiểm tra chức năng gan",
                price: "100$",
                usageDate: "18-06-2021",
                note: "Cần làm khi có dấu hiệu suy gan"
            }
        ],
        medicine: [
            { name: "Liver Support", quantity: 30, note: "Uống mỗi ngày 1 viên sau bữa ăn" },
            { name: "Paracetamol", quantity: 40, note: "Dùng khi có sốt" }
        ],
        patient: {
            examDate: "18-06-2021",
            symptoms: "Đau bụng, vàng da",
            diagnosis: "Suy gan",
            notes: "Cần theo dõi chức năng gan và tuân thủ chế độ ăn uống."
        }
    },
    {
        doctor: {
            name: "Phan Ngọc Duy",
            type: "BS.CKII",
            department: "Khoa Chấn thương chỉnh hình",
            email: "duyphan@gmail.com",
            phone: "0987651234"
        },
        services: [
            {
                serviceName: "Khám chấn thương chỉnh hình",
                description: "Khám và điều trị các bệnh lý về xương khớp",
                price: "180$",
                usageDate: "25-10-2022",
                note: "Chẩn đoán và điều trị các vấn đề về khớp và xương"
            },
            {
                serviceName: "Phẫu thuật chỉnh hình",
                description: "Phẫu thuật sửa chữa các gãy xương hoặc vấn đề về khớp",
                price: "1500$",
                usageDate: "25-10-2022",
                note: "Phẫu thuật khi có vấn đề về xương khớp nghiêm trọng"
            }
        ],
        medicine: [
            { name: "Anti-inflammatory", quantity: 30, note: "Uống khi đau" },
            { name: "Calcium", quantity: 60, note: "Uống mỗi ngày 1 viên" }
        ],
        patient: {
            examDate: "25-10-2022",
            symptoms: "Đau khớp, khó vận động",
            diagnosis: "Thoái hóa khớp",
            notes: "Cần điều trị bằng thuốc và vật lý trị liệu."
        }
    },
    {
        doctor: {
            name: "Đoàn Thị Mai",
            type: "TS.BS",
            department: "Khoa Phẫu thuật thần kinh",
            email: "maidoan@gmail.com",
            phone: "0912345678"
        },
        services: [
            {
                serviceName: "Phẫu thuật thần kinh",
                description: "Phẫu thuật để điều trị các bệnh lý thần kinh như thoát vị đĩa đệm",
                price: "2500$",
                usageDate: "15-12-2022",
                note: "Phẫu thuật cần thực hiện khi có các triệu chứng nghiêm trọng"
            },
            {
                serviceName: "Xét nghiệm thần kinh",
                description: "Xét nghiệm để kiểm tra chức năng thần kinh",
                price: "400$",
                usageDate: "15-12-2022",
                note: "Cần xét nghiệm khi có triệu chứng như tê tay chân"
            }
        ],
        medicine: [
            { name: "Gabapentin", quantity: 20, note: "Uống mỗi ngày 1 viên" },
            { name: "Painkiller", quantity: 30, note: "Dùng khi có đau" }
        ],
        patient: {
            examDate: "15-12-2022",
            symptoms: "Tê tay chân, đau lưng",
            diagnosis: "Thoát vị đĩa đệm",
            notes: "Cần phẫu thuật và theo dõi tình trạng phục hồi."
        }
    },
    {
        doctor: {
            name: "Bùi Thị Lan Anh",
            type: "BS.CKI",
            department: "Khoa Tiết niệu",
            email: "lananh@gmail.com",
            phone: "0923456789"
        },
        services: [
            {
                serviceName: "Khám tiết niệu",
                description: "Khám và điều trị các bệnh lý về đường tiết niệu",
                price: "220$",
                usageDate: "30-09-2021",
                note: "Khám các vấn đề về thận và bàng quang"
            },
            {
                serviceName: "Siêu âm thận",
                description: "Siêu âm để kiểm tra tình trạng thận và bàng quang",
                price: "100$",
                usageDate: "30-09-2021",
                note: "Thực hiện khi có triệu chứng đau lưng hoặc tiểu buốt"
            }
        ],
        medicine: [
            { name: "Antibiotics", quantity: 30, note: "Uống mỗi ngày 1 viên" },
            { name: "Painkiller", quantity: 20, note: "Dùng khi đau" }
        ],
        patient: {
            examDate: "30-09-2021",
            symptoms: "Đau lưng, tiểu buốt",
            diagnosis: "Viêm đường tiết niệu",
            notes: "Theo dõi tình trạng sau khi sử dụng thuốc."
        }
    }
];



function MedicalHistory() {
    // let data
    // useEffect(() => {
    //     axios.get('http://localhost:3005/medExam/medicalExam')
    //     .then((response) => {
    //         data = response.data
    //     })
    // }, [])
    const [specificInfoData, setSpecificInfoData] = useState(null);
    const handleViewButton = (data) => {
        setSpecificInfoData(data)
    }
    return ( 
    <>
        <div className="appointment dashboard ">
        <Navbar className="header-hist"/>
        <div className="body-hist">
            <Leftbar className= "left-bar-hist"/>
            <div className="content-hist">
                <div className="top-hist">
                    <h1>Lịch sử thăm khám</h1>
                </div>
                <div className="align-content-hist">
                    {fakeData.map((data, index) => (
                        <MedicalHistoryCell key={index} onView = {handleViewButton} props={data}/>
                    ))}
                    
                </div>
                <SpecificInfo props={specificInfoData}/> 
            </div>
        </div> 
        </div>
    </>
    );
}

export default MedicalHistory;