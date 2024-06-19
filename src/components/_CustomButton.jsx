// CustomButton.jsx

import React from 'react';

const CustomButton = ({ onClick, buttonColor, buttonClick, children, style }) => {
  return (
    <button
      onClick={onClick}
      onMouseDown={buttonClick}
      style={{
        fontSize:"50px",
        backgroundColor: buttonColor,
        border: 'none',
        borderRadius: '50px',
        padding: '10px 20px', // ボタンの内側の余白を設定
        cursor: 'pointer',
        fontFamily: 'Roboto, sans-serif' ,
        ...style
      }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
