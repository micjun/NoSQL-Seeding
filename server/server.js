const express = require('express');
const { getQuestion, getQuestionById, addOrUpdateQuestion, deleteQuestion } = require('./dynamo');
const app = express();
const path = require('path');
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// app.get('/', (req,res) => {
//   res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
// })
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.resolve(__dirname, '../build')))

app.get('/questions', async (req, res) => {
  try {
    const questions = await getQuestion();
    res.json(questions)
  } catch (error) {
    res.status(500).json({error: 'oops'})
  }
})

app.get('/questions/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const questions = await getQuestionById(id);
    res.json(questions)
  } catch (error) {
    res.status(500).json({error: 'oops'})
  }
})

app.post('/questions', async (req, res) => {
  const question = req.body;
  try {
    const questions = await addOrUpdateQuestion(question);
    res.json(questions)
  } catch (error) {
    res.status(500).json({error: 'oops'})
  }
})

app.put('/questions/:id', async (req, res) => {
  const question = req.body;
  const { id } = req.params;
  question.id = id;
  try {
    const questions = await addOrUpdateQuestion(question);
    res.json(questions)
  } catch (error) {
    res.status(500).json({error: 'oops'})
  }
})

app.delete('/questions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const questions = await deleteQuestion(id);
    res.json(questions)
  } catch (error) {
    res.status(500).json({error: 'oops'})
  }
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port')
})

module.exports = app;