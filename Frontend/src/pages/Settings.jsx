import { useState, useEffect } from "react";

function Settings() {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [theme,setTheme]=useState("light");

  const saveChanges=()=>{
    localStorage.setItem("theme", theme);
    alert("Settings Saved!");
  };

  // APPLY THEME
  useEffect(()=>{
    document.body.setAttribute("data-theme", theme);
  },[theme]);

  return (
    <div className="page-container">

      <h2 className="page-title">⚙️ Settings</h2>

      <div className="settings-grid">

        <div className="settings-card">
          <h3>Profile Information</h3>

          <label>Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} />

          <label>Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} />

          <label>Phone</label>
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} />

          <button onClick={saveChanges}>Save Changes</button>
        </div>

        <div className="settings-card">

          <h3>Theme Preferences</h3>

          <div className="theme-toggle">

            <button
              className={`theme-btn ${theme==="light" ? "active":""}`}
              onClick={()=>setTheme("light")}
            >
              ☀ Light
            </button>

            <button
              className={`theme-btn ${theme==="dark" ? "active":""}`}
              onClick={()=>setTheme("dark")}
            >
              🌙 Dark
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;