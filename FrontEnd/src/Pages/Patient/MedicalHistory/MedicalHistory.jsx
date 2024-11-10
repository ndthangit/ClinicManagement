import axios from "axios";
import './MedicalHistory.css';
import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/appointment/Leftbar";
import MedicalHistoryCell from "./MedicalHistoryCell";
import { useEffect, useState } from "react";
import SpecificInfo from './SpecificInfo';

const fakeData = [
    {
        doctor: {
            name: "Nguyễn Hoàng An",
            type: "PGS.TS",
            department: "Khoa Nội tổng quát",
            email: "hoangannguyen@gmail.com",
            phone: "0987654321"
        },
        service: {
            serviceName: "Khám tổng quát",
            description: "Khám và đánh giá tổng quát sức khỏe bệnh nhân",
            price: "100$",
            usageDate: "30-10-2020",
            note: "Khuyến nghị tái khám sau 6 tháng"
        },
        patient: {
            examDate: "30-10-2020",
            symptoms: "Đau bụng, buồn nôn, sốt",
            diagnosis: "Đau ruột thừa",
            notes: "Bệnh nhân cần nghỉ ngơi và theo dõi thêm tình trạng đau bụng."
        }
    },
    {
        doctor: {
            name: "Trần Văn Minh",
            type: "BS.CKI",
            department: "Khoa Ngoại",
            email: "minhtran@gmail.com",
            phone: "0976543210"
        },
        service: {
            serviceName: "Phẫu thuật tiêu hóa",
            description: "Phẫu thuật cắt bỏ ruột thừa",
            price: "1500$",
            usageDate: "15-11-2020",
            note: "Bệnh nhân cần kiêng cử và nghỉ ngơi 2 tuần sau phẫu thuật."
        },
        patient: {
            examDate: "15-11-2020",
            symptoms: "Đau dữ dội vùng bụng dưới",
            diagnosis: "Viêm ruột thừa cấp",
            notes: "Theo dõi tình trạng đau sau phẫu thuật và tái khám sau 1 tuần."
        }
    },
    {
        doctor: {
            name: "Phạm Thị Lan",
            type: "TS",
            department: "Khoa Nhi",
            email: "lanpham@gmail.com",
            phone: "0901234567"
        },
        service: {
            serviceName: "Khám nhi",
            description: "Kiểm tra và tư vấn sức khỏe cho trẻ em",
            price: "50$",
            usageDate: "01-12-2020",
            note: "Theo dõi thêm chiều cao, cân nặng và tình trạng sức khỏe định kỳ."
        },
        patient: {
            examDate: "01-12-2020",
            symptoms: "Ho, sốt nhẹ",
            diagnosis: "Viêm họng cấp",
            notes: "Uống thuốc hạ sốt và theo dõi nhiệt độ cơ thể trong 48 giờ tới."
        }
    },
    {
        doctor: {
            name: "Trần Văn Minh",
            type: "BS.CKI",
            department: "Khoa Ngoại",
            email: "minhtran@gmail.com",
            phone: "0976543210"
        },
        service: {
            serviceName: "Phẫu thuật tiêu hóa",
            description: "Phẫu thuật cắt bỏ ruột thừa",
            price: "1500$",
            usageDate: "15-11-2020",
            note: "Bệnh nhân cần kiêng cử và nghỉ ngơi 2 tuần sau phẫu thuật."
        },
        patient: {
            examDate: "15-11-2020",
            symptoms: "Đau dữ dội vùng bụng dưới",
            diagnosis: "Viêm ruột thừa cấp",
            notes: "Theo dõi tình trạng đau sau phẫu thuật và tái khám sau 1 tuần."
        }
    },
    {
        doctor: {
            name: "Nguyễn Thị Hạnh",
            type: "BS.CKII",
            department: "Khoa Nội",
            email: "hanhnguyen@gmail.com",
            phone: "0902345678"
        },
        service: {
            serviceName: "Khám tổng quát",
            description: "Khám và đánh giá tình trạng sức khỏe tổng quát",
            price: "200$",
            usageDate: "05-05-2021",
            note: "Bệnh nhân cần theo dõi huyết áp trong 1 tuần."
        },
        patient: {
            examDate: "05-05-2021",
            symptoms: "Huyết áp cao, chóng mặt",
            diagnosis: "Tăng huyết áp",
            notes: "Cần theo dõi huyết áp và hạn chế ăn muối."
        }
    },
    {
        doctor: {
            name: "Lê Quốc Bảo",
            type: "ThS.BS",
            department: "Khoa Mắt",
            email: "baole@gmail.com",
            phone: "0938765432"
        },
        service: {
            serviceName: "Khám mắt",
            description: "Khám và điều trị các bệnh lý về mắt",
            price: "100$",
            usageDate: "20-07-2021",
            note: "Đề nghị đeo kính bảo vệ và kiểm tra thị lực hàng năm."
        },
        patient: {
            examDate: "20-07-2021",
            symptoms: "Mờ mắt, nhức mắt",
            diagnosis: "Loạn thị",
            notes: "Đeo kính và hạn chế sử dụng thiết bị điện tử quá nhiều."
        }
    },
    {
        doctor: {
            name: "Phạm Văn Long",
            type: "BS.CKI",
            department: "Khoa Tim mạch",
            email: "longpham@gmail.com",
            phone: "0987123456"
        },
        service: {
            serviceName: "Khám tim mạch",
            description: "Kiểm tra và tư vấn về sức khỏe tim mạch",
            price: "300$",
            usageDate: "10-10-2021",
            note: "Bệnh nhân cần tập thể dục đều đặn và theo dõi nhịp tim."
        },
        patient: {
            examDate: "10-10-2021",
            symptoms: "Hụt hơi, đau ngực",
            diagnosis: "Bệnh mạch vành",
            notes: "Uống thuốc theo chỉ định và tái khám sau 3 tháng."
        }
    },
    {
        doctor: {
            name: "Đặng Thị Linh",
            type: "TS.BS",
            department: "Khoa Da liễu",
            email: "linhdang@gmail.com",
            phone: "0923456789"
        },
        service: {
            serviceName: "Điều trị da liễu",
            description: "Khám và điều trị các vấn đề về da",
            price: "250$",
            usageDate: "25-12-2021",
            note: "Bệnh nhân nên dùng kem chống nắng hàng ngày và tái khám sau 1 tháng."
        },
        patient: {
            examDate: "25-12-2021",
            symptoms: "Ngứa và nổi mẩn đỏ",
            diagnosis: "Dị ứng da",
            notes: "Tránh tiếp xúc với các chất gây dị ứng."
        }
    }
];


function MedicalHistory() {
    let data
    useEffect(() => {
        axios.get('http://localhost:3005/medExam/medicalExam')
        .then((response) => {
            data = response.data
        })
    }, [])
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
            </div>
        </div> 
        <SpecificInfo props={specificInfoData}/> 
        </div>
    </>
    );
}

export default MedicalHistory;