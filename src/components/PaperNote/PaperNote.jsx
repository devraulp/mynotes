/* eslint-disable no-nested-ternary */
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
  const [recycledBin, setRecycledBin] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (localStorage.length > 0) {
      setNotes(JSON.parse(localStorage.getItem('SavedNotes')));
    } else {
      localStorage.setItem('SavedNotes', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (localStorage.length > 0) {
      setRecycledBin(JSON.parse(localStorage.getItem('RecycleBin')));
    } else {
      localStorage.setItem('RecycleBin', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (notes) {
      localStorage.setItem('SavedNotes', JSON.stringify(notes));
    }
    if (recycledBin) {
      localStorage.setItem('RecycleBin', JSON.stringify(recycledBin));
    }
  }, [notes, recycledBin]);

  const SaveNote = async () => {
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
    setRecycledBin([...recycledBin, recycledNote]);
  };

  const deleteNote = (id) => {
    const findId = recycledBin.filter((n) => n.id !== id);
    setRecycledBin(findId);
  };

  const restoreNotes = (id) => {
    const findId = recycledBin.filter((n) => n.id !== id);
    setRecycledBin(findId);
    const restoreNote = recycledBin.find((n) => n.id === id);
    setNotes([...notes, restoreNote]);
  };

  const EditNote = (id) => {
    const noteToEdit = notes.find((n) => n.id === id);
    setTitle(noteToEdit.name);
    setContent(noteToEdit.text);
    const findId = notes.filter((n) => n.id !== id);
    setNotes(findId);
  };

  const showNotes = () => {
    setShow(true);
  };

  const showBin = () => {
    setRecycledBin(JSON.parse(localStorage.getItem('RecycleBin')));
    setShow(false);
  };

  const BinImage = recycledBin.length > 0 ? (binFull) : (binEmpty);
  let numberBinNotes;
  const numberBin = () => {
    if (recycledBin.length > 0) {
      numberBinNotes = recycledBin.length;
    }
  };
  numberBin();

  let numberNotes;
  const numberNotesSavec = () => {
    if (notes.length > 0) {
      numberNotes = notes.length;
    }
  };
  numberNotesSavec();

  return (
    <div className="container">

      <form className="noteBook">
        <img id="notebook" src={notebook} alt="notebook" />
        <img id="pencil" src={pencil} alt="pencil" />
        <input type="text" value={title} placeholder="TITULO" onChange={(e) => setTitle(e.target.value)} />
        <textarea name="postit" value={content} placeholder="ESCRIBE TU NOTA AQUI" cols="30" rows="10" onChange={(e) => setContent(e.target.value)} />
        <img id="save" src={save} alt="save" onClickCapture={SaveNote} />
      </form>

      <div className="notes">

        <nav className="navBar">
          <div className="showNotes">
            <button type="button" onClickCapture={showNotes}>Mis Notas</button>
            <p onClickCapture={showNotes}>{numberNotes}</p>
          </div>
          <div className="showBin">
            <p onClickCapture={showBin}>{numberBinNotes}</p>
            <img src={BinImage} alt="Bin" className="noteImg" onClickCapture={showBin} />
          </div>
        </nav>

        <hr />

        <div>
          {show === true ? (
            notes.length > 0 ? (
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
            )
          ) : (
            recycledBin.length > 0 ? (
              recycledBin.map((n) => (
                <div key={n.id} className="note">
                  <h3>{n.name}</h3>
                  <p>{n.text}</p>
                  <img src={restore} alt="Restore" className="noteImg" onClickCapture={() => restoreNotes(n.id)} />
                  <img src={erase} alt="Delete" className="noteImg" onClickCapture={() => deleteNote(n.id)} />
                </div>
              ))
            ) : (
              <p>No Tienes Notas en la Papelera</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
