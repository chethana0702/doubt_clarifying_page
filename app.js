const express = require("express")
const app = express()
const PORT= 5000
const dbAdm = require("./admins")
const dbStu= require("./students")
const dbQue = require("./questions")
const dbAns = require("./answer")
const path = require('path')

const currentDirectory = __dirname;

// Serve static files from the 'public' directory
app.use(express.static(path.join(currentDirectory, '')));

app.use(express.json()) 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/getAdmins',dbAdm.getAdmins)

app.post('/getStudents',dbStu.getStudents)

app.post('/addStudent', dbStu.createStudents)

app.post('/addAnswers',dbAns.createAnswers)

app.post('/addQuestions',dbQue.createQuestions)

app.get('/getQuestions',dbQue.getQuestions)
app.get('/getAnswers', dbAns.getAnswers)

// app.post('/add',dbAdm.createAdmins)
// app.get('/:Uid',dbAdm.getAdminsById)
// app.put('/:Uid',dbAdm.updateAdmins)
// app.delete('/:Uid',dbAdm.deleteAdmins)

// app.post('/addStu',dbStu.createStudents)

// app.get('/getstu/:Sid',dbStu.getStudentsById)
// app.put('/updateStu/:Sid',dbStu.updateStudents)
// app.delete('/delStu/:Sid',dbStu.deleteStudents)
//app.get('/getQuestions',dbQue.getQuestions)
// app.post('/addQues',dbQue.createQuestions)
// app.get('/getQues/:Qid',dbQue.getQuestionsById)
// app.put('/updateQues/:Qid',dbQue.updateQuestions)
// app.delete('/delQues/:Qid',dbQue.deleteQuestions)

app.listen(PORT, () => console.log("Server is running on %d",PORT))