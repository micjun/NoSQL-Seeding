const axios = require('axios')
const { addOrUpdateQuestion } = require('./dynamo')

const seedData = async() => {
  const url = 'https://opentdb.com/api.php?amount=50'
  try {
    const {data : questions} = await axios.get(url)
    const questionPromises = questions.results.map((question, i) => 
      addOrUpdateQuestion({Question: question.question, id: `hello${i}`, Answer: question.correct_answer})
    )
    await Promise.all(questionPromises)
  } catch (error) {
    console.log(error)
  }
  // const url = 'http://hp-api.herokuapp.com/api/characters'
  // try {
  //   const {data : questions} = await axios.get(url)
  //   const questionPromises = questions.map((question, i) => 
  //     addOrUpdateQuestion({Question: question.name, id: `${i}hello${i}`, Answer: question.house})
  //   )
  //   await Promise.all(questionPromises)
  // } catch (error) {
  //   console.log(error)
  // }
  // const url = 'https://pokeapi.co/api/v2/pokemon'
  // try {
  //   const {data : questions} = await axios.get(url)
  //   const questionPromises = questions.results.map((question, i) => 
  //     addOrUpdateQuestion({Question: question.question, id: `hello${i}`, Answer: question.correct_answer})
  //   )
  //   await Promise.all(questionPromises)
  // } catch (error) {
  //   console.log(error)
  // }
}

seedData()