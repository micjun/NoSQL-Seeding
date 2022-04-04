import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Flashcard from './Infocard';

export default function Infocardlist({ infocards, deleteCard }) {
  return (
    <div className='list'>{infocards.map((infocard, index) => {
      return (<><Flashcard infocard={infocard} key={infocard.id} /><button className = 'delete' onClick={() => deleteCard(index)}>delete</button></>)
    })}</div>
  )
}
