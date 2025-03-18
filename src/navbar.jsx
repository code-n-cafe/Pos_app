export default function Navbar(){
    return ( 
        <> <nav className="nav">
            <div className="navdiv">
            <img src="C&CLOGO.png" alt="not found"  width={90} height={55}/> 
            
            </div>
            <a  className="title"><h3>CODES AND COFFEE CAFE</h3></a>
        <ul>
            
            <li> <a href="/About"><h3>Menus</h3></a></li>
            <li><a href="/Projects"><h3>Gift  Cards</h3></a></li>
            <li className="mycontact"> <a href="/Contact"><h3>Contact Us</h3></a></li>
            <li>   <a href="/Services"><h3>Bookings </h3></a></li>

        </ul>
    </nav>
    </>
      );
}