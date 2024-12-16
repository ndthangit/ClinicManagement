import { useEffect } from 'react';
import './SpecificInfo.css'
import '../../Assets/fonts/themify-icons-font/themify-icons/themify-icons.css'
import './ServiceUsedInfor'
import ServiceUsedInfor from './ServiceUsedInfor';
import MedicineInfo from './MedicineInfo';

function SpecificInfo({props, setIsOpen}) {
    const handleClickEvent = async(event) => {
        const accordionContent = document.querySelectorAll('.accordion-content')
        accordionContent.forEach((item, index) => {
            const descriptions = item.querySelectorAll('.content-table-hist')
            const isVisible = Array.from(descriptions).some(description => window.getComputedStyle(description).display !== 'none');
            const header = item.querySelector('header')
            
            if(isVisible) {
                item.style.minHeight = `${header.offsetHeight}px`;
                descriptions.forEach((description) => {
                    description.style.display = 'none';
                    description.classList.remove('open-hist')
                })
                item.querySelector('i').classList.replace("fa-minus", "fa-plus")
            }
        })

        const modal = document.querySelector('.modal');
        await modal.classList.remove('open');
        setTimeout(() => {
            setIsOpen(false)
        }, 1000);
    }

    const headerOnClick = (event) => {
        const item = event.currentTarget.closest('.accordion-content');
        const header = item.querySelector('header')
        const descriptions = item.querySelectorAll('.content-table-hist')
        const isAnyVisible = Array.from(descriptions).some(description => window.getComputedStyle(description).display !== 'none');
        if (isAnyVisible) {
            // Thu gọn tất cả
            descriptions.forEach(description => {
                description.style.display = 'none';
                description.classList.remove('open-hist');
            });
            item.querySelector('i').classList.replace("fa-minus", "fa-plus");
            item.style.minHeight = `${header.offsetHeight}px`; // Chỉ hiển thị chiều cao của header
        } else {
            // Xổ xuống tất cả
            let totalHeight = header.offsetHeight; // Bắt đầu từ chiều cao của header
            descriptions.forEach(description => {
                description.style.display = 'table';

                const descriptionHeight = description.scrollHeight;
                const styles = window.getComputedStyle(description);
                const marginBottom = parseFloat(styles.marginBottom);
                
                totalHeight += descriptionHeight + marginBottom; // Cộng thêm chiều cao nội dung mỗi bảng
                description.classList.add('open-hist');
            });
            item.querySelector('i').classList.replace("fa-plus", "fa-minus");
            item.style.minHeight = `${totalHeight}px`; // Cập nhật chiều cao tổng
        }
        
    }

    
    useEffect(() => {
        const modal = document.querySelector('.modal-body');
        modal.scrollTop = 0; 
    })

    return ( 
        <div className="modal">
            <div className='close-modal-hist'onClick={handleClickEvent}></div>
            <div className='modal-container'>
                <h2 className='caption-info-hist'>Thông tin chi tiết buổi khám</h2>
                <div className="modal-body">
                    {/*Doctor*/}
                    <form className='form-doctor-info'>
                        <fieldset className='fieldset-info'>
                            <legend className='legend-info'>Thông tin bác sĩ trực tiếp khám</legend>
                            <div className='template-label-info'>
                                <div className="label-info">Name</div>
                                <div className='info-field'>{props?.doctor.name}</div>
                            </div>
                            <div className='template-label-info'>
                                <div className="label-info">Type</div>
                                <div className='info-field'>{props?.doctor.type}</div>
                            </div>
                            <div className='template-label-info'>
                                <div className="label-info">Department</div>
                                <div className='info-field'>{props?.doctor.department}</div>
                            </div>
                        </fieldset>
                    </form>
                    {/*Thông tin dịch vụ khám*/}
                    <div className='accordion-content'>
                        <div className="wrapper">
                            <header onClick={headerOnClick}>
                                <span className="title">Thông tin dịch vụ khám</span>
                                <i className="fa-solid fa-plus"></i>
                            </header>
                        </div>
                        {props?.services.map((item, index) => (
                            <ServiceUsedInfor key={index} props={item}/>
                        ))}
                    </div>
                    {/*Về bệnh nhân*/}
                    <div className='accordion-content' >
                        <div className="wrapper">
                            <header onClick={headerOnClick}>
                                <span className="title">Về bệnh nhân</span>
                                <i className="fa-solid fa-plus"></i>
                            </header>
                        </div>

                        <table className='content-table-hist'>
                            <tbody className='body-table-hist'>
                                <tr>
                                    <td className='title-hist'>Exam date</td>
                                    <td className='prop-hist'>{props?.patient.examDate}</td>
                                </tr>
                                <tr>
                                    <td className='title-hist'>Symptoms</td>
                                    <td className='prop-hist'>{props?.patient.symptoms}</td>
                                </tr>

                                <tr>
                                    <td className='title-hist'>Diagnosis</td>
                                    <td className='prop-hist'>{props?.patient.diagnosis}</td>
                                </tr>

                                <tr>
                                    <td className='bottom-exam-hist title-hist'>Notes</td>
                                    <td className='prop-hist bottom-exam-hist'>{props?.patient.notes}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>  
                    {/*Về thuốc bệnh nhân được nhận kê đơn*/} 
                    <div className='accordion-content' >
                        <div className="wrapper">
                            <header onClick={headerOnClick}>
                                <span className="title">Thuốc chỉ định</span>
                                <i className="fa-solid fa-plus"></i>
                            </header>
                        </div>

                        <table className='content-table-hist'>
                            <tbody className='body-table-hist'>
                                <tr>
                                    <th className='medicine-title' style={{width:'25%'}}>Medicine name</th>
                                    <th className='medicine-title' style={{width:'25%'}}>Quantity</th>
                                    <th style={{width: '50%'}}>Notes</th>
                                </tr>
                                {props?.medicine.map((item, index) => (
                                    <MedicineInfo key={index} props={item}/>
                                ))}
                            </tbody>
                        </table>
                    </div>            
                </div>
            </div>
        </div>
    );
}

export default SpecificInfo;