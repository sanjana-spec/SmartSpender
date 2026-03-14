

import { useState } from "react";

function Login({ setUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("https://smartspender.onrender.com/api",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.message || "Login failed");
      }

      const displayName = data.username || "User";

      localStorage.setItem("token",data.token);
      localStorage.setItem("userName",displayName);

      setUser(displayName);

    } catch(err){

      console.error(err);
      alert(err.message);

    } finally{
      setLoading(false);
    }
  };


  const register = async () => {

    if(!username || !email || !password){
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try{

      const res = await fetch("https://smartspender.onrender.com/api",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username,
          email,
          password
        })
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful! Please login.");

      setIsRegister(false);
      setPassword("");

    }catch(err){

      alert(err.message);

    }finally{
      setLoading(false);
    }

  };


  return(

    <div className="center-screen">

      <div className="card">

        <h2>
          {isRegister ? "Join SmartSpend" : "Welcome Back"}
        </h2>

        {isRegister && (

          <input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={isRegister ? register : login}
          disabled={loading}
        >

          {loading ? "Processing..." : isRegister ? "Create Account" : "Login"}

        </button>

        <p>

          {isRegister ? "Already have an account?" : "New to SmartSpend?"}

          <span
            onClick={()=>{
              setIsRegister(!isRegister);
              setUsername("");
            }}
          >

            {isRegister ? "Login here" : "Create account"}

          </span>

        </p>

      </div>

    </div>

  );

}

export default Login;
