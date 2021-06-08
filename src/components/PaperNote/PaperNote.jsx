/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

export default function PaperNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [recycledNotes, setRecycledNotes] = useState([]);
  const [recycledBin, setRecycledBin] = useState([]);

  useEffect(() => {
    if (notes) {
      localStorage.setItem('SavedNotes', JSON.stringify(notes));
    }
    if (recycledNotes) {
      localStorage.setItem('RecycleBin', JSON.stringify(recycledNotes));
    }
  }, [notes, recycledBin, recycledNotes]);

  const SaveNote = () => {
    const newNote = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: title,
      text: content,
    };
    setNotes([...notes, newNote]);
    setTitle('');
    setContent('');
  };

  const sendToRecycleBin = (id) => {
    const findId = notes.filter((n) => n.id !== id);
    setNotes(findId);
    const recycledNote = notes.find((n) => n.id === id);
    setRecycledNotes([...recycledNotes, recycledNote]);
  };

  const deleteNote = (id) => {
    const findId = recycledNotes.filter((n) => n.id !== id);
    setRecycledNotes(findId);
    setRecycledBin(findId);
  };

  const restoreNotes = (id) => {
    const findId = recycledNotes.filter((n) => n.id !== id);
    setRecycledBin(findId);
    setRecycledNotes(findId);
    const restoreNote = recycledNotes.find((n) => n.id === id);
    setNotes([...notes, restoreNote]);
  };

  const showBin = () => {
    setRecycledBin(JSON.parse(localStorage.getItem('RecycleBin')));
  };

  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea name="postit" value={content} cols="30" rows="10" onChange={(e) => setContent(e.target.value)} />
      <button type="button" onClick={SaveNote}>Guardar</button>
      <div>
        {notes.length > 0 ? (
        // eslint-disable-next-line array-callback-return
          notes.map((n) => (
            <div key={n.id} className="note">
              <h1>{n.name}</h1>
              <p>{n.text}</p>
              <button type="button" onClick={() => sendToRecycleBin(n.id)}>X</button>
            </div>
          ))
        ) : (
          <p>No hay Notas</p>
        )}
      </div>
      <div>
        <button type="button" onClick={showBin}>RecyclinBin</button>
      </div>
      <div>
        {recycledBin ? (
        // eslint-disable-next-line array-callback-return
          recycledBin.map((n) => (
            <div key={n.id} className="note">
              <h1>{n.name}</h1>
              <p>{n.text}</p>
              <button type="button" onClick={() => restoreNotes(n.id)}>R</button>
              <button type="button" onClick={() => deleteNote(n.id)}>X</button>
            </div>
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
