import React, { useState, useEffect } from 'react';
import './Dashboard.css'; 
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { AccessTime, LocalHospital, 
         Medication, CheckCircleOutline,
         HealthAndSafety, Science, SupportAgent } from '@mui/icons-material';

function Dashboard() {
  const { user } = useSelector((state) => state.user.patient);
  const navigate = useNavigate();

  const newsData = [
    {
      title: 'Ngày hội sức khỏe 2024',
      description: 'Tham gia ngày hội sức khỏe để nhận tư vấn miễn phí từ các chuyên gia',
      image: require('../../Assets/newsContent1.jpg'),
    },
    {
      title: 'Khuyến mãi dịch vụ xét nghiệm',
      description: 'Giảm 20% cho tất cả các dịch vụ xét nghiệm trong tháng 12.',
      image: require('../../Assets/newsContent2.jpg'),
    },
    {
      title: 'Chương trình khám sức khỏe miễn phí',
      description: 'Khám sức khỏe miễn phí cho người cao tuổi trong tháng 12.',
      image: require('../../Assets/newsContent3.jpg'),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [newsData.length]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsData.length) % newsData.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  const goToAppointment = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/appointment');
    }
  };

  const showSchedule = () => {
    if (!user) {
      navigate('/login')
    } else {
      axios.get(`http://localhost:3005/patient/byCCCD/${user.patient_id}`).then((response) => {
        navigate(`/schedule/${response.data.patient_id}`);
      });
    }
  };

  return (
    <div className='healthcareDashboard'>
      { /* Hero Banner */}
      <div className='healthcareDashboard__heroBanner'>
        <h1>Hệ thống quản lý khám bệnh</h1>
        <p>Dễ dàng đặt lịch, quản lý thông tin khám bệnh mọi lúc mọi nơi.</p>
      </div>
      
      {/* 3 chức năng chính: */}
      <div className="healthcareDashboard__mainFunctions">
        { /* Đặt lịch khám */}
        <div className="healthcareDashboard__largeCard">
          <AccessTime style={{ fontSize: 70, color: '#00796b' }} />
          <h3>Đặt lịch khám</h3>
          <p className="healthcareDashboard__largeCardDescription">
            Dễ dàng thực hiện các thao tác đặt lịch khám chỉ với vài bước.
          </p>
          <Button className="healthcareDashboard__functionButton" onClick={goToAppointment}>Đặt lịch ngay</Button>
        </div>
  
        {/* Xem lịch khám và giá thành dịch vụ */}
        <div className='healthcareDashboard__smallCards'>
          <div className='healthcareDashboard__functionCard'>
            <LocalHospital style={{ fontSize: 60, color: '#00796b' }} />
            <h3>Xem lịch khám</h3>
            <p>Kiểm tra lịch khám của bạn và thông tin liên quan.</p>
            <Button className='healthcareDashboard__functionButton' onClick={showSchedule}>Xem ngay</Button>
          </div>
  
          <div className='healthcareDashboard__functionCard'>
            <Medication style={{ fontSize: 60, color: '#00796b' }} />
            <h3>Giá thành dịch vụ</h3>
            <p>Xem chi tiết giá các dịch vụ khám bệnh tại đây.</p>
            <Button className='healthcareDashboard__functionButton'>Xem giá</Button>
          </div>
        </div>
  
      </div>
  
      {!user && (
        <div className="healthcareDashboard__loginPrompt">
          <p>Chưa có tài khoản? <span onClick={() => navigate('/signup')} className="healthcareDashboard__loginLink">Đăng ký ngay</span></p>
          <p>Đã có tài khoản? <span onClick={() => navigate('/login')} className="healthcareDashboard__loginLink">Đăng nhập ngay</span></p>
        </div>
      )}

      <div className="healthcareDashboard__contentWrapper">
        <div className="healthcareDashboard__about">
          <h2>Về chúng tôi</h2>
          <p>Hệ thống quản lý lịch khám được xây dựng để giúp bạn dễ dàng hơn trong việc quản lý và đặt lịch khám bệnh.</p>
          <p>Chúng tôi tự hào có đội ngũ bác sĩ tận tâm và cơ sở vật chất hiện đại, sẵn sàng phục vụ bạn mọi lúc.</p>
        </div>

        <div className="healthcareDashboard__services">
          <h2>Các dịch vụ nổi bật</h2>
          <div className="healthcareDashboard__serviceCards">
            <div className="serviceCard">
              <HealthAndSafety style={{ fontSize: 40, color: '#00796b' }} />
              <h4>Khám tổng quát</h4>
              <p>Kiểm tra sức khỏe định kỳ với đội ngũ bác sĩ chuyên môn cao.</p>
            </div>
            <div className="serviceCard">
              <Science style={{ fontSize: 40, color: '#00796b' }} />
              <h4>Xét nghiệm</h4>
              <p>Dịch vụ xét nghiệm hiện đại và chính xác.</p>
            </div>
            <div className="serviceCard">
              <SupportAgent style={{ fontSize: 40, color: '#00796b' }} />
              <h4>Tư vấn sức khỏe</h4>
              <p>Nhận lời khuyên hữu ích từ các chuyên gia.</p>
            </div>
            <div className="serviceCard">
              <CheckCircleOutline style={{ fontSize: 40, color: '#00796b' }} />
              <h4>Chăm sóc hậu phẫu</h4>
              <p>Dịch vụ chăm sóc sau mổ với các bác sĩ và y tá chuyên nghiệp.</p>
            </div>
          </div>
        </div>

        <div className="healthcareDashboard__testimonials">
          <h2>Phản hồi từ khách hàng</h2>
          <div className="testimonial">
            <p>"Dịch vụ tuyệt vời, đội ngũ bác sĩ rất tận tâm!"</p>
            <h4>- Nguyễn Văn A</h4>
          </div>
          <div className="testimonial">
            <p>"Hệ thống đặt lịch tiện lợi, tôi không cần phải chờ đợi lâu."</p>
            <h4>- Trần Thị B</h4>
          </div>
        </div>  

        <div className="healthcareDashboard__news">
          <h2>Tin tức và sự kiện</h2>
          <div className="newsSlider">
            <ArrowBack className="arrow-icon" onClick={handlePrevClick}/>

            <div className="newsItem">
              <img src={newsData[currentIndex].image} alt={newsData[currentIndex].title} className="newsImage" />
              <div className="newsContent">
                <h4>{newsData[currentIndex].title}</h4>
                <p>{newsData[currentIndex].description}</p>
              </div>
            </div>

            <ArrowForward className="arrow-icon" onClick={handleNextClick}/>
          </div>
        </div>

      </div>

      <div className="healthcareDashboard__footer">
        <p>Thông tin liên hệ</p>
        <p>Số điện thoại: <a href="tel:+0987654321">+0987 654 321</a></p>
        <p>Email: <a href="mailto:contact@healthcare.com">contact@healthcare.com</a></p>
        <p>Địa chỉ: Số 1, Đường Đại Cồ Việt, Quận Hai Bà Trưng, Thành phố Hà Nội</p>
        <p>Thành viên thực hiện: </p>
        <p>&copy; 2024 Hệ thống quản lý lịch khám</p>
      </div>
    </div>
  );
}

export default Dashboard;
