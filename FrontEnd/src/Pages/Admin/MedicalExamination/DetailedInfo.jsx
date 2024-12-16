import './DetailedInfo.css'
function DetailedInfo({props, setIsOpen}) {
    const handleClickEvent = async() => {
        const modal = document.querySelector('.detailedInfo')
        await modal.classList.remove('open');
        setTimeout(() => {
            setIsOpen(false)
        }, 1000);
    }
    console.log(props)
    return ( 
        <div className="detailedInfo">
            <div className='close-detailedInfo-hist'onClick={handleClickEvent}></div>
            <div className='detailedInfo-container'>
                <h2 className='caption-info-hist'>Thông tin chi tiết buổi khám</h2>
                <div className="detailedInfo-body">
                <table className='detailed-table'>
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='row-title'>Exam ID</td>
                            <td className='row-info'>{props?.exam_id || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td className='row-title'>Appointment ID</td>
                            <td className='row-info'>{props?.appointment_id || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td className='row-title'>Exam Date</td>
                            <td className='row-info'>{props?.exam_date || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td className='row-title'>Symptoms</td>
                            <td className='row-info'>{props?.symptoms || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td className='row-title'>Diagnosis</td>
                            <td className='row-info'>{props?.diagnosis || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td className='row-title'>Notes</td>
                            <td className='row-info'>{props?.notes || 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
}

export default DetailedInfo;