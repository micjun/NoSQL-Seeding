import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Flashcard from './Flashcard';

export default function FlashcardList({ flashcards, deleteCard }) {
  return (
    <div className='list'>{flashcards.map((flashcard, index) => {
      return (<><Flashcard flashcard={flashcard} key={flashcard.id} /><button className = 'delete' onClick={() => deleteCard(index)}>delete</button></>)
    })}</div>
  )
}
