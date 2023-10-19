const Pool = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"Doubts",
    password:"System",
    port:5432
})

const createAnswers = (req,res) => {
    console.log('create answer is called')
    const {Qid,Answ} = req.body
    console.log(req.body)

    pool.query('INSERT INTO answer (Qid,Answ) VALUES ($1,$2) RETURNING *',[Qid,Answ], (err,result) => {
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

const getAnswers = (req,res) => {
    pool.query("SELECT * FROM answer",(err,result) => {
        if(err) {
            throw err
        }
        res.json({
            data : result.rows
        })
    })
}

module.exports = {
    createAnswers,getAnswers
}