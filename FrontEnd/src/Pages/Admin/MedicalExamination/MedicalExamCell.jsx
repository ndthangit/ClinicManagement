import './MedicalExamCell.css'
function MedicalExamCell({props, onView}) {
    const handleViewButton = () => {
        const detailedInfo = document.querySelector('.detailedInfo')
        onView(props)
        detailedInfo.classList.add('open')
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