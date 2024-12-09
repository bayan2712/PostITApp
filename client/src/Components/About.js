import React from "react";
import userImage from "../Images/user.png";

 const About =()=>{
    return(
        <div>
            <h1>About This project</h1>
            <p>This project is Developed byBayan ALBartmani</p>
            <p>Email:36S1941@UTAS.EDU.OM</p>
            <img src={userImage} alt="devimage" className="userImage"/>
            <button>Contact developer</button>
            
        </div>
    );
 };