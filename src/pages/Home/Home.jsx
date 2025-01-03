import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Home/Home.module.css";

const Home = () => {
  const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate("/products"); 
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>Докосни Вселената в ръцете си.</h1>
        <button className={styles.actionButton} onClick={handleNavigate}>Поръчай сега</button>
        <p className={styles.tagline}>Luminis – където изкуството среща звездите.</p>
      </div>
    </div>
  );
};

export default Home;
