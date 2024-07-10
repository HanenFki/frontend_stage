import React from 'react';
import Button from 'devextreme-react/button';

const Button = ({ icon, color, onClick, text }) => {
 

  return (
    <Button
      icon={icon}
      text={text}
      stylingMode="contained"
      onClick={onClick}
      style={styles.button}
      color={color}
    />
  );
};

export default Button;
