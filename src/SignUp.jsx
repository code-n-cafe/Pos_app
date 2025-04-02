
export default function SignUp() {
    return (
    <>
    
    <div  className="SignUpInfo" >
    <h1>Sign Up Here </h1>
   <div >
        <div>
         
       <label htmlFor="First Name">  First Name</label> <br /><input type="text"/> <br />
       <label htmlFor="last Name">Last Name <br /> <input type="text" name="Fname" id="" /></label> <br />
       <label htmlFor="dob">Date Of Birth <br /> <input type="date" name="DOB" id="" /></label> <br />
       <label htmlFor="Email">Email <br /> <input type="text" name="email" id=""  placeholder="Enter Email here" /></label> <br />
       <label htmlFor="Password">Enter Password </label><br /><input type="password" name="password" id="" />
       <label htmlFor="password2">Confirm Password </label><br /><input type="password" name="password" id="" /> <br />

      

 <a href="" className="SignBut"><button>Sign Me Up</button></a> 
<p>Already Have an account? <a href="LogIn">Sign In </a> </p>
 

       </div>
     
</div>

    </div>
    
    </>
    );
   }