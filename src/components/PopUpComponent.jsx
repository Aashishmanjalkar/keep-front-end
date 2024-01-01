// PopUpComponent.jsx
import React from 'react';

const PopUpComponent = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <p>Can be viewed on web only!</p>
      </div>
    </div>
  );
};

export default PopUpComponent;
