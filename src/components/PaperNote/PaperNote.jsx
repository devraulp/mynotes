/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import './PaperNote.css';
import notebook from '../../img/notebook.png';
import save from '../../img/save.png';
import pencil from '../../img/pencil.png';
import edit from '../../img/edit.png';
import recycle from '../../img/recycle.png';
import binEmpty from '../../img/binEmpty.png';
import binFull from '../../img/binFull.png';
import restore from '../../img/restore.png';
import erase from '../../img/erase.png';

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
  }, [notes, recycledNotes]);

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

  const EditNote = (id) => {
    const noteToEdit = notes.find((n) => n.id === id);
    setTitle(noteToEdit.name);
    setContent(noteToEdit.text);
    const findId = notes.filter((n) => n.id !== id);
    setNotes(findId);
  };

  const showBin = () => {
    setRecycledBin(JSON.parse(localStorage.getItem('RecycleBin')));
  };

  const BinImage = recycledNotes.length > 0 ? (binFull) : (binEmpty);

  return (
    <div className="container">

      <div className="noteBook">
        <img id="notebook" src={notebook} alt="notebook" />
        <img id="pencil" src={pencil} alt="pencil" />
        <input type="text" value={title} placeholder="TITULO" onChange={(e) => setTitle(e.target.value)} />
        <textarea name="postit" value={content} placeholder="ESCRIBE TU NOTA AQUI" cols="30" rows="10" onChange={(e) => setContent(e.target.value)} />
        <img id="save" src={save} alt="save" onClickCapture={SaveNote} />
      </div>

      <div className="notes">
        <div className="navBar">
          <h1>Mis Notas</h1>
          <img src={BinImage} alt="Save" className="noteImg" onClickCapture={() => showBin()} />
        </div>
        {notes.length > 0 ? (
          notes.map((n) => (
            <div key={n.id} className="note">
              <h3>{n.name}</h3>
              <p>{n.text}</p>
              <img src={edit} alt="Save" className="noteImg" onClickCapture={() => EditNote(n.id)} />
              <img src={recycle} alt="Save" className="noteImg" onClickCapture={() => sendToRecycleBin(n.id)} />
            </div>
          ))
        ) : (
          <p>No Tienes Notas</p>
        )}
        <div className="notes">
          <div>
            {recycledBin.length > 0 ? (
              recycledBin.map((n) => (
                <div key={n.id} className="note recycledNote">
                  <h3>{n.name}</h3>
                  <p>{n.text}</p>
                  <img src={restore} alt="Restore" className="noteImg" onClickCapture={() => restoreNotes(n.id)} />
                  <img src={erase} alt="Delete" className="noteImg" onClickCapture={() => deleteNote(n.id)} />
                </div>
              ))
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
