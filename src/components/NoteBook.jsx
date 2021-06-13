import React from 'react';
import PropTypes from 'prop-types';
import notebook from '../img/notebook.png';
import pencil from '../img/pencil.png';
import save from '../img/save.png';

export default function NoteBook({
  title, content, setTitle, setContent, saveNote,
}) {
  return (
    <div>
      <form className="noteBook">
        <img id="notebookimg" src={notebook} alt="notebook" />
        <img id="pencil" src={pencil} alt="pencil" />
        <input type="text" value={title} placeholder="TITULO" onChange={(e) => setTitle(e.target.value)} />
        <textarea name="postit" value={content} placeholder="ESCRIBE TU NOTA AQUI" cols="30" rows="10" onChange={(e) => setContent(e.target.value)} />
        <img id="save" src={save} alt="save" onClickCapture={saveNote} />
      </form>
    </div>
  );
}

NoteBook.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
};
