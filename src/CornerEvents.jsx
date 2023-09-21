import React from "react";
import {getTimePadding} from "./Functions.js"
const CornerEvents = ({props}) => {
    if(props.isNow === true){
        return(
            <div>
                <h1>{props.name} {props.startTime}</h1>
            </div>
        )
    }
    return (
        <div className="w-fit mx-2">
            <h1 className="text-[1.75vw] font-bold">{props.name}</h1>
            <h2 className="text-[1.4vw] ">{props.startTime.toLocaleDateString('fi-FI').replaceAll('.','_')}</h2>
            <h3 className="text-[1.4vw] font-sans">{getTimePadding(props.startTime)} - {getTimePadding(props.endTime)}</h3>
        </div>
    )

}

export default CornerEvents;