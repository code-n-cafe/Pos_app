export default function LogIn() {
    return (
        <>
            <div className="LogInInfo">
                <h1>Log In Here</h1>
                <div>
                    <div>
                        <label htmlFor="email">Email</label> <br />
                        <input type="text" name="email" id="email" placeholder="Enter Email here" /> <br />
                        
                        <label htmlFor="password">Password</label> <br />
                        <input type="password" name="password" id="password" placeholder="Enter Password here" /> <br />
                        
                        <button className="LogInButton">Log In</button>
                        
                        <p>Don't have an account? <Link to="/Signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}