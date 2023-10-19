const Pool = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"Doubts",
    password:"System",
    port:5432
})

const createQuestions = (req,res) => {
    console.log('create question called')
    const {Sid1,Ques} = req.body

    pool.query('INSERT INTO question (Sid1,Ques) VALUES ($1,$2) RETURNING *',[Sid1,Ques], (err,result) => {
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

const getQuestions = (_req,res) => {
    pool.query("SELECT * FROM question",(err,result) => {
        if(err) {
            throw err
        }
        res.json({
            data : result.rows
        })
    })
}

const getQuestionsById = (req,res) => {
    let Qid = parseInt(req.params.Qid)
    pool.query("SELECT * FROM question WHERE Qid=$1",[Qid],(err,result) => {
        if(err) {
            throw err
        }
        res.json({
            data : result.rows
        })
    })
}

const updateQuestions = (req,res) => {

    let Qid = parseInt(req.params.Qid)
    const {Sid1,Ques} = req.body

    pool.query("UPDATE question SET Sid1 = $1, Ques= $2 WHERE Qid = $3" , [Sid1,Ques,Qid], (err,result) => {
        if(err){
            throw err
        }
        res.json({
            data: "Updated successfully"
        })
    })
}

const deleteQuestions = (req,res) => {
    const Qid = parseInt(req.params.Qid)

    pool.query('DELETE FROM question WHERE Qid=$1',[Qid],(err,result) => {
        if(err){
            throw err 
        }
        
        res.json({
            msg:"Question Deleted Successfully",Qid
        })
    })
}
module.exports = {
    createQuestions,getQuestions,getQuestionsById,updateQuestions,deleteQuestions
}