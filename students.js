const Pool = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"Doubts",
    password:"System",
    port:5432
})

const createStudents = (req,res) => {
    console.log('create student is called')
    const {Sname,Password,Class,School,Smail} = req.body
    console.log(req.body)

    pool.query('INSERT INTO student (Sname,Password,Class,School,Smail) VALUES ($1,$2,$3,$4,$5) RETURNING *',[Sname,Password,Class,School,Smail], (err,result) => {
        if(err) {
            console.log(err)
            throw err
        }
        res.status(200).json({
            msg:"Data created successfully",
            data:result.rows[0]
        })
    } )
}

const getStudentsById = (req,res) => {
    let Sid = parseInt(req.params.Sid)
    pool.query("SELECT * FROM student WHERE Sid=$1",[Sid],(err,result) => {
        if(err) {
            throw err
        }
        res.json({
            data : result.rows
        })
    })
}

const getStudents = (req,res) => {
    pool.query("SELECT * FROM student",(err,result) => {
        if(err) {
            throw err
        }
        res.json({
            data : result.rows
        })
    })
}

const updateStudents = (req,res) => {

    let Sid = parseInt(req.params.Sid)
    const {Sname,Password,Class,School,Smail} = req.body

    pool.query("UPDATE student SET Sname = $1, Password= $2, Class=$3 , School=$4, Smail=$5 WHERE Sid = $6" , [Sname,Password,Class,School,Smail,Sid], (err,result) => {
        if(err){
            throw err
        }
        res.json({
            data: "Updated successfully"
        })
    })
}

const deleteStudents = (req,res) => {
    const Sid = parseInt(req.params.Sid)

    pool.query('DELETE FROM student WHERE Sid=$1',[Sid],(err,result) => {
        if(err){
            throw err 
        }
        
        res.json({
            msg:"Student Deleted Successfully",Sid
        })
    })
}


module.exports = {
    createStudents,getStudentsById,getStudents,updateStudents,deleteStudents
}