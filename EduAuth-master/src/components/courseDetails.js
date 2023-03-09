import React, { useEffect, useState } from "react";
const imageUrl = "https://i.imgur.com/fHyEMsl.jpg";

const CourseDetails = ({course}) => {

    const [img, setImg] = useState();

    useEffect (() => {
      
        const fetchImage = async () => {
          const res = await fetch(imageUrl);
          const imageBlob = await res.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImg(imageObjectURL);
        };
          fetchImage();
      }, []);
      

    return (
        <div classname = "contianer">
        < div className="searchItem">
        <img src={img} className = "siImg" alt = "courseImage"/>
            <div className="siDesc">
                <h1 className="siTitle">{course.title}</h1>
                <span className="siDetails">{course.description}</span>
                < span className="enrol">
                    <a href={course.link}><button id="sibtn">Start Course Now</button></a>
                    <a href={course.link}><button id="sibtn">Start Quiz</button></a>
                </span>
            </div>
        </div>
        </div>
    )
}

export default CourseDetails;