import { useEffect } from 'react';
import './SpecificInfo.css'
import 'FrontEnd/src/Pages/Assets/fonts/themify-icons-font/themify-icons/themify-icons.css'
function SpecificInfo({props}) {
    const handleClickEvent = () => {
        const modal = document.querySelector('.modal');
        modal.classList.remove('open');
    }

    useEffect(() => {
        const modal = document.querySelector('.modal-body');
        modal.scrollTop = 0; 
    })

    return ( 
        <div className="modal">
            <div className='modal-container'>
                <div onClick={handleClickEvent} className='modal-close'>
                    <i className="ti-close"></i>
                </div>
                <header className="modal-header">
                </header>
                <div className="modal-body">
                    <table className='content-table-hist'>
                        <caption className='caption-table-hist'>
                            Thông tin chi tiết buổi khám
                        </caption>
                        <tbody className='body-table-hist'>
                            <tr>
                                <td className='doctor-info-hist bottom-doctor-hist' rowSpan={5} width={160}>Bác sĩ phụ trách</td>
                                <td className='title-hist'>Name</td>
                                <td className='prop-hist'>{props?.doctor.name}</td>
                            </tr>
                            <tr>
                                <td className='title-hist'>Type</td>
                                <td className='prop-hist'>{props?.doctor.type}</td>
                            </tr>
                            <tr>
                                <td className='title-hist'>Department</td>
                                <td className='prop-hist'>{props?.doctor.department}</td>
                            </tr>
                            <tr>
                                <td className='title-hist'>Email</td>
                                <td className='prop-hist'>{props?.doctor.email}</td>
                            </tr>
                            <tr>
                                <td className='bottom-doctor-hist title-hist'>Phone</td>
                                <td className='prop-hist bottom-doctor-hist'>{props?.doctor.phone}</td>
                            </tr>

                            <tr>
                                <td className='service-info-hist bottom-service-hist' rowSpan={5} width={160}>Dịch vụ khám chữa</td>
                                <td className='title-hist'>Service name</td>
                                <td className='prop-hist'>{props?.service.serviceName}</td>
                            </tr>
                            <tr>
                                <td className='title-hist'>Description</td>
                                <td className='prop-hist'>{props?.service.description}</td>
                            </tr>
                            <tr>
                                <td className='title-hist'>Price</td>
                                <td className='prop-hist'>{props?.service.price}</td>
                            </tr>
                            <tr>
                                <td className='title-hist'>Usage date</td>
                                <td className='prop-hist'>{props?.service.usageDate}</td>
                            </tr>
                            <tr>
                                <td className='bottom-service-hist title-hist'>Note</td>
                                <td className='prop-hist bottom-service-hist'>{props?.service.note}</td>
                            </tr>

                            <tr>
                                <td className='exam-info-hist bottom-exam-hist' rowSpan={4} width={160}>Về bệnh nhân</td>
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
            </div>
        </div>
    );
}

export default SpecificInfo;