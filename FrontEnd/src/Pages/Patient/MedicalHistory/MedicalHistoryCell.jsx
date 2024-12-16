import SpecificInfo from './SpecificInfo';
import './MedicalHistoryCell.css'


function MedicalHistoryCell({props, onView}) {

    const handleViewButton = () => {
        const modal = document.querySelector('.modal')
        onView(props)
        modal.classList.add('open')

    }
    
    return(
        <>
            <div className='hist-cell'>
                <div className='descript'>
                    <p className='date-time-hist'>{props.patient.examDate}</p>
                </div>
                <button 
                    className='view-button'
                    onClick={handleViewButton}
                >View</button>
            </div> 
        </>

    );
}

export default MedicalHistoryCell;