import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StudentForm() {
    const url = "https://67fe04e03da09811b1774265.mockapi.io/krishnaraj/react";
    const [Name,SetName] = useState("");
    const [Gender,SetGender] = useState("");
    const [Education,SetEducation] = useState("");
    const [Skills,SetSkills] = useState([]);
    const [data,Setdata] = useState([]);

    const navigate =useNavigate();

    useEffect(() => {
        axios.get(url)
        .then((res) => {Setdata(res.data)})
        .catch((err) => {console.log("Error",err)})
    },[])

    function handleCheck(e){
        const {value,checked} = e.target;
        if(checked){
            SetSkills([...Skills,value]);
        }else{
            SetSkills(Skills.filter(skill => skill !== value));
        }
    };

    function save(e){
        e.preventDefault();
        const StudFormdata ={
            Name,Education,Gender,Skills
        };

        axios.post(url,StudFormdata)
        .then((res)=>{
        console.log("Data Saved",res.data);
        alert("Form Submited!");
        Setdata([...data,res.data]);
        SetName("");
        SetGender("");
        SetEducation("");
        SetSkills("");
        })
        .catch((err) => {
        console.log("Erorr",err);
        alert("Faild to submit form data!");
        })
    }

    const Remove = (id) =>{
        axios.delete(url+"/"+id)
        .then((e) => {
            alert("Removed Student list!");
            axios.get(url).then((res) => {
                Setdata(res.data);
            }).catch((err) => {console.log("Error",err);})
        })
        .catch((err) => {
            console.log("Error",err);
        })
    } 

   
    const Qualification = ["SSLC", "HSC", "DCA", "DEEE", "DCE", "DME", "DIT", "DAE", "BSc Computer Science", "BSc Mathematics", "BSc Physics", "BCA", "BCom", "BBA", "BA English", "BA History", "BA Economics", "BA Tamil", "BE CSE", "BE EEE", "BE ECE", "BE Mechanical", "BE Civil", "B.Tech IT", "B.Tech AI & DS", "B.Tech BioTech", "B.Tech Food Tech", "MSc Computer Science", "MSc Mathematics", "MSc Physics", "MCA", "MBA", "MCom", "MA English", "MA History", "MA Economics", "MA Tamil", "ME CSE", "ME EEE", "ME Structural", "M.Tech IT", "M.Tech Data Science", "PhD Computer Science", "PhD Mathematics", "PhD Physics", "PhD English"];

  return (
    <div className='ContainerStud'>
        <form className='StuInfForm' onSubmit={save} >
            <h3>Student Information</h3>
            <div className='InputName'>
                <label htmlFor="">Name</label>
                <input type="text" placeholder='Enter Your Name' value={Name} onChange={(e) => SetName(e.target.value)} required/>
            </div>

            <div className='InputGender'>
                <label htmlFor="">Gender</label>
                <div className='GenderType'>
                    <label htmlFor=""><input type="radio" name='Gender' value="Male"  checked = {Gender == "Male"} onChange={(e) => SetGender(e.target.value)} required/>Male</label>
                    <label htmlFor=""><input type="radio" name='Gender' value="Female" checked = {Gender == "Female"} onChange={(e) => SetGender(e.target.value)} required/>Female</label>
                </div>
            </div>

            <div className='InputQual'>
                <label htmlFor="">Qualification</label>
                <select name="" id="" value={Education} onChange={(e) => SetEducation(e.target.value)} required>
                    <option value="">Select</option>
                    {
                        Qualification.map((Education,item) => (
                            <option key={item} value={Education}>{Education}</option>
                        ))
                    }

                </select>
            </div>  


            <div className='InputSkill'>
                <label htmlFor="">Skills</label>
                <div className='Skills'>
                    <label htmlFor=""><input type="checkbox" value="HTML" name='Skills' checked = {Skills.includes("HTML")} onChange={handleCheck} />HTML</label>
                    <label htmlFor=""><input type="checkbox" value="CSS" name='Skills' checked = {Skills.includes("CSS")} onChange={handleCheck}  />CSS</label>
                    <label htmlFor=""><input type="checkbox" value="JS" name='Skills' checked = {Skills.includes("JS")} onChange={handleCheck} />JS</label>
                    <label htmlFor=""><input type="checkbox" value="React" name='Skills' checked = {Skills.includes("React")} onChange={handleCheck} />React</label>
                </div>
            </div>

            <button  className='StudSub' type='submit'>Submit</button>
        </form>
{data.length>0 ?(
    <div className='table'>
          <table className='StuTable'>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Qualification</th>
                    <th>Skills</th>
                    <th>Delete</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>
                {   
                    data.map((item,index)=>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.Name}</td>
                            <td>{item.Gender}</td>
                            <td>{item.Education}</td>
                            <td>{item.Skills.join(", ")}</td>
                            <td><button onClick={()=>Remove(item.id)} className='RemoveBtn'>Delete</button></td>
                            <td><button onClick={() => navigate(`/view/${item.id}`)} className='ViewBtn'>View</button></td>
                        </tr>
                    ))
                }
            </tbody>
            
        </table>
        
        </div>
) : ""
}


    </div>
  )
}
