import React from "react";

const CornerEvents = ({props}) => {
    if(props.isNow === true){
        return(
            <div>
                <h1>{props.name} {props.startTime}</h1>
            </div>
        )
    }
    return (
        <div className="w-96">
            <h1 className="text-3xl font-bold">{props.name}</h1>
        </div>
    )

}

export default CornerEvents;