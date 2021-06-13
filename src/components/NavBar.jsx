import React from 'react';
import PropTypes from 'prop-types';

export default function NavBar({
  showNotes, numberNotes, showBin, numberBinNotes, BinImage,
}) {
  return (
    <nav className="navBar">
      <div className="showNotes">
        <button type="button" onClickCapture={showNotes}>Mis Notas</button>
        <p onClickCapture={showNotes}>{numberNotes}</p>
      </div>
      <div className="showBin">
        <p onClickCapture={showBin}>{numberBinNotes}</p>
        <button type="button"><img src={BinImage} alt="Bin" className="noteImg" onClickCapture={showBin} /></button>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  showNotes: PropTypes.func.isRequired,
  numberNotes: PropTypes.number.isRequired,
  showBin: PropTypes.func.isRequired,
  numberBinNotes: PropTypes.func.isRequired,
  BinImage: PropTypes.func.isRequired,
};
