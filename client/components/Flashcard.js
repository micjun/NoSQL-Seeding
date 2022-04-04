import React, { useState } from 'react'
import CardCreator from './CardCreator'

export default function Flashcard( { flashcard } ) {
  const [flip, setFlip] = useState(false)
  
  return (
    <div 
      className = 'card'
      // className = {`card ${flip ? 'flip' : ''}`}
      onClick = {() => setFlip(!flip)}
    >
      {/* <div className = 'front'>
        {flashcard.question}
      </div>
      <div className = 'back'>
        {flashcard.answer}
      </div> */}
      {flip ? flashcard.answer : flashcard.question}
    </div>
  )
}
