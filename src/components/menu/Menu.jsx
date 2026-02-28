import { getImgURLMenu } from "../../util.js";
import styles from "./menu.module.css";

export default function Menu() {
  return (
    <div className={styles.pageContainer}>
      <h1>Our Menu</h1>
      <div className={styles.menuContainer}>
        <div className={styles.menuContent}>
          <h2>Drinks</h2>
          <ul className={styles.navList}>
            <li><a href='#'>Hot Coffee</a></li>
            <li><a href='#'>Cold Coffee</a></li>
            <li><a href='#'>Hot Tea</a></li>
            <li><a href='#'>Cold Tea</a></li>
            <li><a href='#'>Americano</a></li>
            <li><a href='#'>Hot Chocolate</a></li>
            <li><a href='#'>Bottled Beverages</a></li>
          </ul>
          <h2>Food</h2>
          <ul className={styles.navList}>
            <li><a href='#'>Breakfast</a></li>
            <li><a href='#'>Bakery</a></li>
            <li><a href='#'>Brunch</a></li>
            <li><a href='#'>Treats</a></li>
            <li><a href='#'>Snacks</a></li>
          </ul>
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.gridLayout}>
            <div className={styles.gridItem}>
              <img src={getImgURLMenu("coldcoffee.png")} alt="Cold Coffee" className={styles.menuImage} />
              <h3>Cold Coffee</h3>
            </div>
            <div className={styles.gridItem}>
              <img src={getImgURLMenu("hotcoffee.png")} alt="Hot Coffee" className={styles.menuImage} />
              <h3>Hot Coffee</h3>
            </div>
            <div className={styles.gridItem}>
              <img src={getImgURLMenu("hottea.png")} alt="Hot Tea" className={styles.menuImage} />
              <h3>Hot Tea</h3>
            </div>
            <div className={styles.gridItem}>
              <img src={getImgURLMenu("coldtea.png")} alt="Cold Tea" className={styles.menuImage} />
              <h3>Cold Tea</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}