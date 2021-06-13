import React from 'react';
import PropTypes from 'prop-types';
import erase from '../img/erase.png';
import restore from '../img/restore.png';

export default function RecycleBin({ recycledBin, restoreNote, deleteNote }) {
  return (
    <div>
      {recycledBin.length > 0 ? (
        recycledBin.map((n) => (
          <div key={n.id} className="note trash">
            <h3>{n.name}</h3>
            <p>{n.text}</p>
            <img src={restore} alt="Restore" className="noteImg" onClickCapture={() => restoreNote(n.id)} />
            <img src={erase} alt="Delete" className="noteImg" onClickCapture={() => deleteNote(n.id)} />
          </div>
        ))
      ) : (
        <p>No Tienes Notas en la Papelera</p>
      )}
    </div>
  );
}

RecycleBin.propTypes = {
  recycledBin: PropTypes.objectOf.isRequired,
  restoreNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};
