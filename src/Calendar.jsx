import React, {useState, useEffect} from 'react';
import CornerEvents from "./CornerEvents";
import {getFullScreenBackground, getTimePadding, getItemStyling} from "./Functions.js"


const Calendar = () => {

    const [liveEvents, setLiveEvents] = useState([]);
    const [tlkEvents, setTLKEvents] = useState([]);

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
                            if (i.summary.includes("PRIVAT")) {
                                isPrivate = true;
                            }
                            let isNow = false;
                            let isToday = false;
                            if (endTime.getTime() > nowTime && startTime.getTime() < nowTime) isNow = true;
                            if (startTime.getDate() === new Date().getDate()) {
                                isToday = true;
                            }
                            if (endTime > nowTime) {
                                cornerEvents.push({
                                    name: i.summary,
                                    startTime: startTime,
                                    endTime: endTime,
                                    private: isPrivate,
                                    isFullDay: isFullDay,
                                    isFullDayWithTime: isFullDayWithTime,
                                    isNow: isNow,
                                    isToday: isToday
                                });
                            }
                        }
                    }
                    cornerEvents.sort(compare);
                    let maxEvents = cornerEvents.length > 5 ? 5 : cornerEvents.length;
                    let liveEvents = [];
                    for (let i = 0; i < maxEvents; i++) {

                        liveEvents.push(cornerEvents[i]);
                        if (cornerEvents[i].startTime.getDate() === new Date().getDate())
                            maxEvents = maxEvents + 1;
                    }
                    setLiveEvents(liveEvents);
                }
            )
        fetch("http://10.42.3.4:3001")
            .then(response => response.json())
            .then(data => {
                let tlkEvents = [];
                for (let j of data.items) {
                    if (j.status === "confirmed") {
                        let eStartTime, eEndTime, eIsFullDay;
                        if (j.start.date) {
                            eStartTime = new Date(j.start.date);
                            eEndTime = new Date(j.end.date);
                            eIsFullDay = true;
                        } else {
                            eStartTime = new Date(j.start.dateTime);
                            eEndTime = new Date(j.end.dateTime);
                        }
                        let nowTime = new Date();
                        if (eEndTime > nowTime) {
                            tlkEvents.push({
                                name: j.summary,
                                startTime: eStartTime,
                                endTime: eEndTime,
                                isFullDay: eIsFullDay
                            })
                        }
                    }
                }
                tlkEvents.sort(compare);
                let maxEvents = tlkEvents.length > 5 ? 5 : tlkEvents.length;
                let liveTLKEvents = [];
                for (let i = 0; i < maxEvents; i++) {
                    liveTLKEvents.push(tlkEvents[i]);
                }
                setTLKEvents(liveTLKEvents);
            })

    }, [])

    let compare = function (a, b) {
        return a.startTime - b.startTime;
    };


    let today = [];
    let notToday = [];

    for (let i of liveEvents) {
        if (i.isToday) {
            today.push(i);
        } else {
            notToday.push(i);
        }
    }

    console.dir(today);
    for (let i of liveEvents) {
        if (i.isNow) {
            return (
                <div className={getFullScreenBackground(i)}>
                    <div className="text-center mx-24 p-8">
                        <h1 className="text-[8vw] font-extrabold pb-8">{i.name}</h1>
                        <h2 className="text-[7vw] bold italic">{getTimePadding(i.startTime)} - {getTimePadding(i.endTime)}</h2>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex items-center w-screen align-middle h-screen bg-background saturate-100 ">
                    {today &&
                        <div className="container w-fit h-fit mx-auto bg-gradient-to-b from-teal-600 to-[#00F1FF] rounded-xl p-8 m-10 saturate-100">
                            <h1 className="text-[3vw] font-extrabold text-center">Today @ Cornern</h1>
                            {today.length === 0 && (
                             <p className="w-fit h-fit mx-auto text-[2vw]">No events today</p>
                                )
                            }
                            {today.map((cornerEvent, i) => (
                                <div key={i} className={getItemStyling(cornerEvent)}>
                                    <CornerEvents props={cornerEvent}/>
                                </div>
                            ))}
                        </div>}
                    <div className="flex items-center justify-evenly w-auto pr-8">
                        {notToday &&
                            <div className="container w-fit h-fit mx-0 rounded-xl p-6 m-5 bg-gradient-to-b from-blue-500 to-fuschia-600 saturate-100">
                                <h1 className="text-[3vw] font-extrabold text-center">Cornern</h1>
                                {notToday.map((cornerEvent, i) => (
                                    <div key={i} className={getItemStyling(cornerEvent)}>
                                        <CornerEvents props={cornerEvent}/>
                                    </div>
                                ))}
                            </div>}
                        {tlkEvents &&
                            <div className="container w-fit h-fit mx-10 rounded-xl p-6 m-5 bg-gradient-to-b from-orange-500 to-fuschia-600 saturate-100">
                                <h1 className="text-[3vw] font-extrabold text-center ">Events</h1>
                                {tlkEvents.map((tlkEvent, i) => (
                                    <div key={i} className="container mx-auto p-5 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-xl m-5 shadow-inner">
                                        <CornerEvents props={tlkEvent}/>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>


            )
        }
    }


}

export default Calendar;