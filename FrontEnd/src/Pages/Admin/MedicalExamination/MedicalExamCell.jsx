import './MedicalExamCell.css'
function MedicalExamCell({props, onView}) {
    const handleViewButton = async() => {
        await onView(props)
        setTimeout(()=>{
            const detailedInfo = document.querySelector('.detailedInfo')
            detailedInfo.classList.add('open')
        },0)
    }
    return (
    <div className="medicalExamCell">
        <div className='exam-id'>{props.exam_id}</div>
        <div className='appointment-id'>{props.appointment_id}</div>
        <div className='exam-date'>{props.exam_date}</div>
        <div className='button-wrapper'>
            <button 
            className='view-btn'
            onClick={handleViewButton}
            >View</button>
        </div>
    </div> );
}

export default MedicalExamCell;