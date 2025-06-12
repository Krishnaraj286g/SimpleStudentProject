import React, { useEffect, useState } from 'react'

export default function Login() {
    const [userName,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,SetShowPassword] = useState("");
   
    useEffect(()=>{
        alert(`Follow this Login Id And Password \n Username : UserLogin \n Password : User@12345`);
    },[])

  function save (e) {
        e.preventDefault();
        if(userName === "UserLogin"){
            if(password === "User@12345"){
                alert("Successfully Login!");
                window.location = "/Student_Details";
            }
            else{
                alert("Incorrect Password!")
            }
        }else{
            alert("Incorrect User Name!");
        }
        

    }

  return (
   <div className='Container_Login'>
        <div className='TitlePro'>
            <marquee behavior="" direction="">simple student project</marquee>
        </div>
        <form className='Login_form' onSubmit={save}>
            <h3>Login</h3>
            <div className='Input-box'>
                <input type="text" placeholder='User Name' value={userName} onChange={(e) => setUsername(e.target.value)} required/>
                <i class="fa-solid fa-user"></i>
            </div>

            <div className='Input-box'>
                <input type={showPassword ? "text":"password"} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <i class={!showPassword ? "fa-solid fa-lock":"fa-solid fa-unlock"} onClick={() => SetShowPassword(!showPassword)}></i>
            </div>

            <button className='LoginSubmit' type='submit'>Login</button>
        </form>

      
   </div>
  )
}
