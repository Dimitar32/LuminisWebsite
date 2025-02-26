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
        <h1 className={styles.title}>Перфектният избор за всеки повод и вкус!</h1>
        <button className={styles.actionButton} onClick={handleNavigate}>Поръчай сега</button>
        <p className={styles.tagline}>Luminis – Моменти, които значат повече.</p>
        
        <div className={styles.productsSection}>
          <Products />
        </div>
        
        {/* Why LudoSphere Section - Now Positioned Below the Tagline */}
        {/*<div className={styles.whyLudoSphere}>
          <h2 className={styles.whyTitle}>Защо Luminis?</h2>
          <p className={styles.whySubtitle}>Ние не сме просто Космически бранд</p>

          <div className={styles.comparisonTable}>
            <table>
              <thead>
                <tr>
                  <th>Luminis</th>
                  <th>Другите</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>✔ Елегантни</td>
                  <td className={styles.cross}>✘</td>
                </tr>
                <tr>
                  <td>✔ Издръжливи</td>
                  <td className={styles.cross}>✘</td>
                </tr>
                <tr>
                  <td>✔ Артистични</td>
                  <td className={styles.cross}>✘</td>
                </tr>
                <tr>
                  <td className={styles.cross}>✘ Евтини</td>
                  <td>✔</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>*/}
      </div>
    </div>
  );
};

export default Home;
