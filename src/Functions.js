
export function getTimePadding(inTime) {
    const hours = inTime.getHours();
    const minutes = inTime.getMinutes();
    let padTime = ("0000" + (hours * 100 + minutes)).slice(-4);
    padTime = padTime.slice(0, 2) + ":" + padTime.slice(2, 4);
    return padTime;
}

export function getFullScreenBackground(event) {
    if (event.private) {
        return "flex items-center justify-center h-screen bg-gradient-to-b from-pink-600 to-red-800";
    } else {
        return "flex items-center justify-center h-screen bg-gradient-to-b from-teal-600 to-green-400";
    }
}

export function getItemStyling(event){
    if(event.private){
        return "container mx-auto p-5 bg-gradient-to-b from-pink-600 to-red-800 rounded-xl m-5 shadow-inner "
    }else{
        return "container mx-auto p-5 bg-gradient-to-b from-teal-600 to-green-400 rounded-xl m-5 shadow-inner drop-shadow-lg"
    }
}

