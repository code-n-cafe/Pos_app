import { getImgURLMenu } from "../../util.js";

export default function Menu() {
     return (
     <>
        <h2>Our Menu</h2>
    <div>
    <div className="Menunav">
    <nav>
    <h4>Drinks</h4>
      
        <ul>
            <li><a href="./About"> Hot Coffee </a></li>
            <li><a href="./About">Cold Coffee </a></li>
            <li><a href="./About"> Hot Tea </a></li>
            <li><a href="./About"> Cold Tea </a></li>
            <li><a href="./About">Americano</a></li>
            <li><a href="./About">Hot Chocolate  </a></li>
            <li><a href="./About">Bottled Breverages</a></li>
            </ul>
        <h4>Food</h4>
        <ul>
        <li><a href="./About">Breakfast </a></li>
        <li><a href="./About">Bakery</a></li>
        <li><a href="./About">Brunch</a></li>
        <li><a href="./About">Treats</a></li>
        <li><a href="./About">Snacks</a></li>

        </ul>
       
        
       </nav>
       
    </div>
    <div className="allmenu">
    <div >
        <div className="row1" >
            <div ><img src={getImgURLMenu("coldcoffee.png")} alt="" className="row1a" /> <p>Cold Coffee</p></div>
            <div ><img src={getImgURLMenu("hotcoffee.png")} alt="" className="row1a" /> <p>Hot Coffee</p></div>
        </div>
    </div>
    <div className="row1" >
            <div ><img src={getImgURLMenu("hottea.png")} alt="" className="row1a" /> <p>Hot Tea</p></div>
            <div ><img src={getImgURLMenu("coldtea.png")} alt="" className="row1a" /> <p>Cold Tea</p></div>
    </div>
    
    </div>
    



    
    </div>
     </>
     );
     }
