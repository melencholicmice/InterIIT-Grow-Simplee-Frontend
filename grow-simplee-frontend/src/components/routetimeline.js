import React, { useState } from 'react'
import '../styles/timeline.css'
import data from '../Data/timelinedata.json'


const Routetimeline = (props) =>{

    // console.log(props.data);

    return(
        <div className="Timeline-container">
            {!props.data?null:props.data.map((val, idx)=>(
                <div style={{width:"80%"}} className="timeline-item">
                    <p> Order ID : {val.itemId}</p>
                    <p> Address  : {}</p>
                    <span className="circle" />
                </div>
            ))}

        </div>
    )
}

export default Routetimeline;