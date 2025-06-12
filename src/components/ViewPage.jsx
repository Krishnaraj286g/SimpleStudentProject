import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function ViewPage() {

    const {id} = useParams();
    const url = `https://67fe04e03da09811b1774265.mockapi.io/krishnaraj/react/${id}`;
    const [student,SetStudent] = useState(null);
    const [editmode,SetEditmode] = useState(false);
    const [Name,SetName] = useState("");
    const [Gender,SetGender] = useState("");
    const [Education,SetEducation] = useState("");
    const [Skills,SetSkills] = useState([]);

    const back =() =>{
        window.location = "/Student_Details";
    }

    useEffect(() => {
        axios.get(url)
        .then((res) => {
            SetStudent(res.data);
        })
        .catch((err) => {console.log("Error",err)})
    },[url]);

    const handleEdit = () =>{
            axios.get(url).then((res)=>{
                SetName(res.data.Name);
                SetGender(res.data.Gender);
                SetEducation(res.data.Education);
                SetSkills(res.data.Skills);
                SetEditmode(true);
            }).catch((err)=>{console.log("EditError",err)})
    }

    function handlecheck(e){
        const {value,checked} = e.target;

        if(checked){
            SetSkills ([...Skills,value]);
        }
        else{
            SetSkills (Skills.filter(skill => skill !== value))
        }

    }

    const handleUpdate =(e) =>{
        e.preventDefault();

        const updatedForm ={
        Name,Gender,Education,Skills
        }

        axios.put(url,updatedForm)
        .then((res) => {
            alert("Student Information is Updated!");
            axios.get(url) .then((res) => {SetStudent(res.data)}).catch((err) => {console.log("Error",err)})

        })
        .catch((err) => { console.log("Updating Error",err);})

    }

    const Qualification = ["SSLC", "HSC", "DCA", "DEEE", "DCE", "DME", "DIT", "DAE", "BSc Computer Science", "BSc Mathematics", "BSc Physics", "BCA", "BCom", "BBA", "BA English", "BA History", "BA Economics", "BA Tamil", "BE CSE", "BE EEE", "BE ECE", "BE Mechanical", "BE Civil", "B.Tech IT", "B.Tech AI & DS", "B.Tech BioTech", "B.Tech Food Tech", "MSc Computer Science", "MSc Mathematics", "MSc Physics", "MCA", "MBA", "MCom", "MA English", "MA History", "MA Economics", "MA Tamil", "ME CSE", "ME EEE", "ME Structural", "M.Tech IT", "M.Tech Data Science", "PhD Computer Science", "PhD Mathematics", "PhD Physics", "PhD English"];

  
  return (
    <div className='ViewContainer'>
        <h1 >Student Details</h1>


        <h2>Below is a simple student form with a list of submitted student details for your reference.</h2>
        {student?(

        <div className='viewContent'>
            {editmode?(
            <div className='popup-container'>

                <form className='StuInfForm' >
                    <h3>Update Student Information</h3>
                    <div className='InputName'>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Your Name'  value={Name} onChange={(e) => SetName(e.target.value)}/>
                    </div>

                    <div className='InputGender'>
                        <label htmlFor="">Gender</label>
                        <div className='GenderType'>
                            <label htmlFor=""><input type="radio" name='Gender' value="Male" checked = {Gender == "Male"} onChange={(e) => SetGender(e.target.value)} />Male</label>
                            <label htmlFor=""><input type="radio" name='Gender' value="Female"  checked = {Gender == "Female"} onChange={(e) => SetGender(e.target.value)}/>Female</label>
                        </div>
                    </div>

                    <div className='InputQual'>
                        <label htmlFor="">Qualification</label>
                        <select name="" id="" value={Education} onChange={(e) => SetEducation(e.target.value)} >
                            <option value="">Select</option>
                            {
                                Qualification.map((Education,item)=>(
                                    <option value={Education} key={item}>{Education}</option>
                                ))
                            }

                        </select>
                    </div>  


                    <div className='InputSkill'>
                        <label htmlFor="">Skills</label>
                        <div className='Skills'>
                            <label htmlFor=""><input type="checkbox" value="HTML" checked = {Skills.includes("HTML")} onChange={handlecheck} />HTML</label>
                            <label htmlFor=""><input type="checkbox" value="CSS" checked = {Skills.includes("CSS")} onChange={handlecheck} />CSS</label>
                            <label htmlFor=""><input type="checkbox" value="JS" checked = {Skills.includes("JS")} onChange={handlecheck}/>JS</label>
                            <label htmlFor=""><input type="checkbox" value="React"  checked = {Skills.includes("React")} onChange={handlecheck}/>React</label>
                        </div>
                    </div>

                    <div className='button-uc'>
                    <button  className='StudSub' onClick={handleUpdate}>Update</button>
                    <button onClick={() => SetEditmode(false)}>Cancel</button>
                    </div>
        </form> 
            </div>):("")}

            <h3>The student's name is <span>{student.Name}</span>, identified as <span>{student.Gender}</span>, has completed <span>{student.Education}</span>, and possesses skills in <span>{student.Skills.join(", ")}</span>.</h3>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={back}>Back</button>
                        
        
        </div> ) :("")
}
    </div>
  )
}
