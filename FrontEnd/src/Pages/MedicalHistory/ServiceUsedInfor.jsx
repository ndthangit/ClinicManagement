import './ServiceUsedInfo.css'
function ServiceUsedInfor({props}) {
    return ( 
        // header-service-hist
        <table className='content-table-hist'>
            
            <tbody className='body-table-hist'>
                <tr>
                    <td className='title-hist'>Name</td>
                    <td className='prop-hist'>{props?.serviceName}</td>
                </tr>
                <tr>
                    <td className='title-hist'>Description</td>
                    <td className='prop-hist'>{props?.description}</td>
                </tr>
                <tr>
                    <td className='title-hist'>Price</td>
                    <td className='prop-hist'>{props?.price}</td>
                </tr>
                <tr>
                    <td className='title-hist'>Usage date</td>
                    <td className='prop-hist'>{props?.usageDate}</td>
                </tr>
                <tr>
                    <td className='bottom-service-hist title-hist'>Note</td>
                    <td className='prop-hist bottom-service-hist'>{props?.note}</td>
                </tr>
            </tbody>
        </table> 
    );
}

export default ServiceUsedInfor;