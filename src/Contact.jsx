export default function Contact() {
     return (
     <>
     <h1>CONTACT US </h1>
     <div >
     <p>We're here to help! Reach out to us for inquiries, support, or feedback. <br/>Fill out the form below, or email us at [your email]. We'll respond promptly!</p>
    <div  className="contactinfo">
         <div>
          
        <label htmlFor="First Name">  First Name</label> <br /><input type="text" name="Lname" id="" /> <br />
        <label htmlFor="last Name">Last Name <br /> <input type="text" name="Fname" id="" /></label> <br />
        <label htmlFor="Email">Email <br /> <input type="text" name="email" id=""  placeholder="Enter Email here" /></label> <br />
        <label htmlFor="phone">Phone </label><br /><input type="number" name="phone" id="" /> <br />
        <label for="message">Message:</label><br />
  <textarea id="message" name="message" rows="6" cols="50" placeholder="Enter your message here..."></textarea> <br />
  <a href="/" ><button>Send</button></a> 
  
 
        </div>
        <div className="picdiv"> <img src="customerS.webp" alt="Not Found"   height={400}/></div>
</div>
 
     </div>
     
     </>
     );
    }