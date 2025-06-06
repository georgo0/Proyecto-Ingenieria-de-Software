// src/components/BackgroundLayout.jsx
import React from 'react';

const BackgroundLayout = ({ children, variant }) => {
  const wallpaperImages = {
    default: 'https://images2.alphacoders.com/747/thumb-1920-747506.jpg', // HOME & ALUMNOS
    teachers: 'https://wallpapers.com/images/hd/cute-teacher-l53dgivdwri9fidx.jpg', // PROFESORES
  };

  const backgroundStyle = {
    backgroundImage: `url(${wallpaperImages[variant || 'default']})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    position: 'relative',
    paddingTop: '50px',
    paddingBottom: '50px',
    color: 'white',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', // Oscurece para mejorar contraste
    zIndex: 1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
  };

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default BackgroundLayout;
