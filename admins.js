const Pool = require("pg").Pool
// import { Pool } from "pg";

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"Doubts",
    password:"System",
    port:5432
})

const createAdmins = (req,res) => {
    const {Uname,Upassword,Umail} = req.body

    pool.query('INSERT INTO admin (Uname,Upassword,Umail) VALUES ($1,$2,$3) RETURNING *',[Uname,Upassword,Umail], (err,result) => {
        if(err) {
            console.log(err)
        }
        res.status(200).json({
            msg:"Data created successfully",
            data:result.rows[0]
        })
    } )
}

const getAdmins = (req,res) => {
   queresult = pool.query("SELECT * FROM admin",(err,result) => {
        if(err) {
            console.log(err)
        }
        res.json({
             data: result.rows
        })
    })
}

const getAdminsById = (req,res) => {
    let Uid = parseInt(req.params.Uid)
      pool.query("SELECT * FROM admin WHERE Uid=$1",[Uid],(err,result) => {
        if(err) {
            console.log(err)
        }
        res.json({
           data: result.rows
            
        })
        
    })

}

const updateAdmins = (req,res) => {

    let Uid = parseInt(req.params.Uid)
    const {Uname,Upassword,Umail} = req.body

    pool.query("UPDATE admin SET Uname = $1, Upassword= $2,Umail=$3 WHERE Uid = $4" , [Uname,Upassword,Umail,Uid], (err,result) => {
        if(err){
            console.log(err)
        }
        res.json({
            data: "Updated successfully"
        })
    })
}

const deleteAdmins = (req,res) => {
    const Uid = parseInt(req.params.Uid)

    pool.query('DELETE FROM admin WHERE Uid=$1',[Uid],(err,result) => {
        if(err){
            console.log(err)
        }
        
        res.json({
            msg:"Admin Deleted Successfully",Uid
        })
    })
}

module.exports = {
    createAdmins,getAdmins,getAdminsById,updateAdmins,deleteAdmins
}