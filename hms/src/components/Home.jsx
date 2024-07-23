import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end', // Aligns items to the bottom
      height: '50vh', // Full viewport height
      padding: '20px', // Padding around the edges
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centers buttons horizontally
    },
    button: {
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none', // Removes underline from the link
      margin: '10px 0', // Adds vertical spacing between buttons
      display: 'inline-block', // Makes the link behave like a button
      textAlign: 'center', // Centers the text inside the button
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3', // Darker shade for hover effect
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <Link to="/doctorReg" style={styles.button}>Doctor Register</Link>
        <Link to="/patientreg" style={styles.button}>Patient Register</Link>
      </div>
    </div>
  );
};

export default Home;
