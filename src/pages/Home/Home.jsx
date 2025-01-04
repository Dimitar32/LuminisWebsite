import React from "react";
import { useNavigate } from "react-router-dom";
import Products from '../Products/Products.jsx';
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
        
        <div className={styles.productsSection}>
          <Products />
        </div>

        {/* Why LudoSphere Section - Now Positioned Below the Tagline */}
        <div className={styles.whyLudoSphere}>
          <h2 className={styles.whyTitle}>Why LudoSphere?</h2>
          <p className={styles.whySubtitle}>We aren't just any Space Brand</p>

          <div className={styles.comparisonTable}>
            <table>
              <thead>
                <tr>
                  <th>LudoSphere</th>
                  <th>Others</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>✔ Elegant</td>
                  <td className={styles.cross}>✘</td>
                </tr>
                <tr>
                  <td>✔ Durable</td>
                  <td className={styles.cross}>✘</td>
                </tr>
                <tr>
                  <td>✔ Artistic</td>
                  <td className={styles.cross}>✘</td>
                </tr>
                <tr>
                  <td className={styles.cross}>✘ Cheap</td>
                  <td>✔</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
