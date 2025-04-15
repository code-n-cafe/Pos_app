import { getImgURLMenu } from "../../util.js";
import "./menu.module.css";

export default function Menu() {
  return (
    <div className="menu-container">
      <h2 className="menu-title">Our Menu</h2>
      
      <div className="menu-content">
        {/* Navigation Box */}
        <div className="nav-box">
          <nav className="menu-nav">
            <div className="nav-section">
              <h4 className="nav-title">Drinks</h4>
              <ul className="nav-list">
                <li><a href="#" className="nav-link">Hot Coffee</a></li>
                <li><a href="#" className="nav-link">Cold Coffee</a></li>
                <li><a href="#" className="nav-link">Hot Tea</a></li>
                <li><a href="#" className="nav-link">Cold Tea</a></li>
                <li><a href="#" className="nav-link">Americano</a></li>
                <li><a href="#" className="nav-link">Hot Chocolate</a></li>
                <li><a href="#" className="nav-link">Bottled Beverages</a></li>
              </ul>
            </div>

            <div className="nav-section">
              <h4 className="nav-title">Food</h4>
              <ul className="nav-list">
                <li><a href="#" className="nav-link">Breakfast</a></li>
                <li><a href="#" className="nav-link">Bakery</a></li>
                <li><a href="#" className="nav-link">Brunch</a></li>
                <li><a href="#" className="nav-link">Treats</a></li>
                <li><a href="#" className="nav-link">Snacks</a></li>
              </ul>
            </div>
          </nav>
        </div>

        {/* 2x2 Grid Items */}
        <div className="grid-container">
          <div className="grid-item">
            <img src={getImgURLMenu("coldcoffee.png")} alt="Cold Coffee" className="menu-image" />
            <p className="item-name">Cold Coffee</p>
          </div>
          <div className="grid-item">
            <img src={getImgURLMenu("hotcoffee.png")} alt="Hot Coffee" className="menu-image" />
            <p className="item-name">Hot Coffee</p>
          </div>
          <div className="grid-item">
            <img src={getImgURLMenu("hottea.png")} alt="Hot Tea" className="menu-image" />
            <p className="item-name">Hot Tea</p>
          </div>
          <div className="grid-item">
            <img src={getImgURLMenu("coldtea.png")} alt="Cold Tea" className="menu-image" />
            <p className="item-name">Cold Tea</p>
          </div>
        </div>
      </div>
    </div>
  );
}