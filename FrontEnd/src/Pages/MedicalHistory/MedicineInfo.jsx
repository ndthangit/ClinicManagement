import './MedicineInfo.css'


function MedicineInfo({props}) {
    return ( 
        <tr>
            <td className="medicine-name-hist">{props.name}</td>
            <td className="medicine-quantity-hist">{props.quantity}</td>
            <td className="medicine-note-hist">{props.note}</td>
        </tr>
    );
}

export default MedicineInfo;