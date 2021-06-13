import React, { useState, useEffect } from 'react';
import '../style/style.css';
import Notes from './Notes';
import RecycleBin from './RecycleBin';
import NavBar from './NavBar';
import NoteBook from './NoteBook';
import binEmpty from '../img/binEmpty.png';
import binFull from '../img/binFull.png';

export default function MyNotes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [recycledBin, setRecycledBin] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (localStorage.length > 0) {
      setNotes(JSON.parse(localStorage.getItem('SavedNotes')));
      setRecycledBin(JSON.parse(localStorage.getItem('RecycleBin')));
    } else {
      localStorage.setItem('SavedNotes', JSON.stringify([]));
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

      <NoteBook
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        saveNote={SaveNote}
      />

      <div className="notes">

        <NavBar
          showNotes={showNotes}
          numberNotes={numberNotes}
          showBin={showBin}
          numberBinNotes={numberBinNotes}
          BinImage={BinImage}
        />

        <hr />

        <div>
          {show === true ? (
            <Notes notes={notes} editNote={EditNote} recycleNote={sendToRecycleBin} />
          ) : (
            <RecycleBin
              recycledBin={recycledBin}
              restoreNote={restoreNotes}
              deleteNote={deleteNote}
            />
          )}
        </div>
      </div>
    </div>
  );
}
