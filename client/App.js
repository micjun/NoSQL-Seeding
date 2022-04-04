import React, { useState, useEffect } from 'react';
import FlashcardList from './components/FlashcardList';
import CardCreator from './components/CardCreator';
import '../stylesheets/app.css'
import { v4 as uuidv4 } from "uuid";
import { Switch, Route } from 'react-router-dom';
import axios from 'axios'



function App() {
  const [flashcard, setFlashcard] = useState({question: '', answer: ''})
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

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
          SAMPLE_FLASHCARDS.push(obj)
        }
        console.log(SAMPLE_FLASHCARDS)
      })
  }, [])

  const addCard = (el) => {
    el.preventDefault()
    const { question, answer } = flashcard;
    const validForm = question && answer;
    if (!validForm) {
      return;
    }
    setFlashcards((flashcards) => [
      ...flashcards,
      {
        id: uuidv4(),
        ...flashcard
      }
    ])
  }

  const sync = (el) => {
    el.preventDefault()
    let newSync = {}
    newSync.Answer = flashcards[flashcards.length -1].answer
    newSync.id = flashcards[flashcards.length -1].id
    newSync.Question = flashcards[flashcards.length -1].question
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
    const flashcardKey = flashcards[el];
    setFlashcards((flashcards) => flashcards.filter((_, i) => i !== el));
    axios
      .delete(`http://localhost:3000/questions/${flashcardKey.id}`)
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
            value={flashcard.question}
            onChange={(e) =>
              setFlashcard((flashcard) => ({ ...flashcard, question: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Answer </label>
          <input
            value={flashcard.answer}
            onChange={(e) =>
              setFlashcard((flashcard) => ({ ...flashcard, answer: e.target.value }))
            }
          />
        </div>
        <button type="submit">submit</button>
      </form>
        <button id="sync" onClick={sync}>sync</button>
        {/* {flashcards.map((flashcard, index) => {
          return (
            <div key = {flashcard.id}>
              <button onClick= {() => deleteCard(index)}>delete</button>
            </div>
          )
        })} */}
    </div>
    <div>
      <FlashcardList flashcards = { flashcards } deleteCard = { deleteCard }/>
    </div>
    </>
  )
}

const SAMPLE_FLASHCARDS = [
  
]

export default App;