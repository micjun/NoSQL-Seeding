import React from 'react'

export default function CardCreator({ flashcard, addCard, setFlashcard }) {
  return (
    <form onSubmit={addCard}>
        <div>
          <label>Question</label>
          <input
            value={flashcard.question}
            onChange={(e) =>
              setFlashcard((flashcard) => ({ ...flashcard, question: e.target.value }))
            }
          />
        </div>
        <div>
          <label>answer</label>
          <input
            value={flashcard.answer}
            onChange={(e) =>
              setFlashcard((flashcard) => ({ ...flashcard, answer: e.target.value }))
            }
          />
        </div>
        <button type="submit">submit</button>
      </form>
  )
}
