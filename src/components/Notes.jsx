import React from 'react';
import PropTypes from 'prop-types';
import edit from '../img/edit.png';
import recycle from '../img/recycle.png';

export default function Notes({ notes, editNote, recycleNote }) {
  return (
    <div>
      {notes.length > 0 ? (
        notes.map((n) => (
          <div key={n.id} className="note">
            <h3>{n.name}</h3>
            <p>{n.text}</p>
            <img src={edit} alt="Save" className="noteImg" onClickCapture={() => editNote(n.id)} />
            <img src={recycle} alt="Save" className="noteImg" onClickCapture={() => recycleNote(n.id)} />
          </div>
        ))
      ) : (
        <p>No Tienes Notas</p>
      )}
    </div>
  );
}

Notes.propTypes = {
  notes: PropTypes.arrayOf.isRequired,
  editNote: PropTypes.func.isRequired,
  recycleNote: PropTypes.func.isRequired,
};
