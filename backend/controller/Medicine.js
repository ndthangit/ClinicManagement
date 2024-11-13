const connection=require('../DB/database')
const MedicineList=async(req,res)=>{
    const [results,fields]=await connection.query(`select * from medicines`)
    res.json(results)
}


module.exports={MedicineList}