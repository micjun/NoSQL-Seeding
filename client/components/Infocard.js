import React, { useState } from 'react'
import CardCreator from './CardCreator'

export default function Infocard( { infocard } ) {
  const [flip, setFlip] = useState(false)
  
  return (
    <div 
      className = 'card'
      onClick = {() => setFlip(!flip)}
    >
      {flip ? infocard.answer : infocard.question}
    </div>
  )
}
