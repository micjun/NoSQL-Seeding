import React, { useState, useEffect } from 'react';
import infocardList from './components/infocardList';
import CardCreator from './components/CardCreator';
import '../stylesheets/app.css'
import { v4 as uuidv4 } from "uuid";
import { Switch, Route } from 'react-router-dom';
import axios from 'axios'



function App() {
  const [infocard, setInfocard] = useState({question: '', answer: ''})
  const [infocards, setInfocards] = useState(SAMPLE_INFOCARDS)

  useEffect(() => {
    axios
      .get('http://localhost:3000/questions')
      .then(res => {
        console.log(res.data.Items)
        for(let i = 0; i < res.data.Items.length; i += 1) {
          const obj = {
            id: res.data.Items[i].id,
            question: res.data.Items[i].Question,
            answer: res.data.Items[i].Answer
          }
          SAMPLE_INFOCARDS.push(obj)
        }
        console.log(SAMPLE_INFOCARDS)
      })
  }, [])

  const addCard = (el) => {
    el.preventDefault()
    const { question, answer } = infocard;
    const validForm = question && answer;
    if (!validForm) {
      return;
    }
    setInfocards((infocards) => [
      ...infocards,
      {
        id: uuidv4(),
        ...infocard
      }
    ])
  }

  const sync = (el) => {
    el.preventDefault()
    let newSync = {}
    newSync.Answer = infocards[infocards.length -1].answer
    newSync.id = infocards[infocards.length -1].id
    newSync.Question = infocards[infocards.length -1].question
    console.log(newSync)
    axios
      .post('http://localhost:3000/questions', (newSync))
      .then(response => {
        console.log('success')
        return;
      })
      .catch (error => {
        console.log(error)
      }) 
  }

  const deleteCard = (el) => {
    const infocardKey = infocards[el];
    setInfocards((infocards) => infocards.filter((_, i) => i !== el));
    axios
      .delete(`http://localhost:3000/questions/${infocardKey.id}`)
      .then(response => {
        console.log('deleted')
        return;
      })
      .catch (error => {
        console.log(error)
      }) 
  }

  return (
    <>
    <div className='prompt'>
      <form onSubmit={addCard}>
        <div>
          <label>Question </label>
          <input
            value={infocard.question}
            onChange={(e) =>
              setInfocard((infocard) => ({ ...infocard, question: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Answer </label>
          <input
            value={infocard.answer}
            onChange={(e) =>
              setInfocard((infocard) => ({ ...infocard, answer: e.target.value }))
            }
          />
        </div>
        <button type="submit">submit</button>
      </form>
        <button id="sync" onClick={sync}>sync</button>
    </div>
    <div>
      <infocardList infocards = { infocards } deleteCard = { deleteCard }/>
    </div>
    </>
  )
}

const SAMPLE_INFOCARDS = [
  
]

export default App;