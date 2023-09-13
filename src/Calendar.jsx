import React, {useState, useEffect} from 'react';
import CornerEvents from "./CornerEvents";
import cornerEvents from "./CornerEvents";
const Calendar = () => {

    const [liveEvents, setLiveEvents] = useState([]);

    useEffect(() => {
        fetch("http://10.42.3.4:3000")
            .then(response => {
                return response.json()
            })
            .then(data => {
                let cornerEvents = [];
                for (let i of data.items) {
                    if (i.status === "confirmed") {
                        let isFullDay, isFullDayWithTime, hasTime, startTime, endTime;
                        if (i.start.date) {
                            startTime = new Date(i.start.date);
                            endTime = new Date(i.start.date);
                        } else {
                            hasTime = true;
                            startTime = new Date(i.start.dateTime);
                            endTime = new Date(i.end.dateTime);
                        }

                        if (startTime.getDate() !== endTime.getDate()) {
                            let startDateCheck = new Date();
                            startDateCheck.setDate(startDateCheck.getDate() + 1);
                            let endPadding = getTimePadding(endTime);
                            if (hasTime) {
                                if (endPadding !== "00:00" && endTime.getDate() !== startDateCheck.getDate()) {
                                    isFullDayWithTime = true;
                                }
                            } else {
                                if (endTime.getDate() !== startDateCheck.getDate()) {
                                    isFullDay = true;
                                }
                            }
                        }
                        let isPrivate = false;
                        const nowTime = new Date().getTime();
                        if (i.summary !== undefined) {
                            if (i.summary.includes("PRIVAT")) {
                                isPrivate = true;
                            }
                        }
                        let isNow = false;
                        if(endTime.getTime() > nowTime && startTime.getTime() < nowTime) isNow = true;
                        if (endTime > nowTime) {
                            cornerEvents.push({
                                name: i.summary,
                                startTime: Number(startTime),
                                endTime: endTime,
                                private: isPrivate,
                                isFullDay: isFullDay,
                                isFullDayWithTime: isFullDayWithTime,
                                isNow: isNow
                            });
                        }
                    }
                }
                cornerEvents.sort(compare);
                let maxEvents = cornerEvents.length > 5 ? 5 : cornerEvents.length;
                let liveEvents = [];
                for(let i = 0; i < maxEvents; i++){
                    liveEvents.push(cornerEvents[i]);
                }
                setLiveEvents(liveEvents);
                }
            )
    }, [])

    console.log(liveEvents);
    let compare = function (a, b) {
        return a.startTime - b.startTime;
    };
    function getTimePadding(inTime) {
        const hours = inTime.getHours();
        const minutes = inTime.getMinutes();
        let padTime = ("0000" + (hours * 100 + minutes)).slice(-4);
        padTime = padTime.slice(0, 2) + ":" + padTime.slice(2, 4);
        return padTime;
    }

    for(let i of cornerEvents){
        if(i.isNow){
            return(
                <div className="full"></div>
            )
        }
    }
    return (
        <div className="container mx-auto bg-gray-300 rounded-xl p-8 m-10">
            {liveEvents.map((cornerEvent,i) => (
                <div key={i} className="cotainer mx-8 p-8 bg-amber-200 rounded-xl m-10" >
                    <CornerEvents props={cornerEvent} />
                </div>
            ))}
        </div>
    )
}

export default Calendar;