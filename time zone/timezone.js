let clockCount = 0;
const timezoneInput = document.getElementById('timezone');
// The error causing problem was that I declared timezoneInput after I already called it. Seems hillarious now but when I was searching the bug it was so painfuly difficult 'cause I was doing it all by my own self without any debugger. I literally found the error in inspect section of the chrome.

let country = timezoneInput.value;
let url = `http://worldtimeapi.org/api/timezone/${country}`;
const timezone = timezoneInput.value;

// Adding functionality!!!

// Checking if the clock-Displayer is valid or not.
function isClockDisplayerValid() {
    const clockTaskContainer = document.getElementById('clock-task-container');
    const nextDiv = clockTaskContainer.nextElementSibling;
    return nextDiv && nextDiv.className === 'clocks-displayer';
}

// Creating the clock element.
function createClockElement(clockId) {
    const clockDiv = document.createElement('div');
    clockDiv.id = clockId;
    clockDiv.className = 'clock';
    return clockDiv;
}

// Updating the Clocks.
function updateClockWithTimezone(clockId, timezone) {
    fetchTimeForTimezone(timezone)
        .then((data) => {
            if (data) {
                updateClock(clockId, data.datetime);
            } else {
                setClockError(clockId, 'Invalid timezone');
            }
        })
        .catch((error) => {
            console.error('Error fetching time:', error);
            setClockError(clockId, 'Error');
        });
}

// This time updating clocks with their local time.
function updateClockWithLocalTime(clockId) {
    const now = new Date();
    updateClock(clockId, now.toISOString());
}

// Catching errors in clocks.
function setClockError(clockId, message) {
    const clockDiv = document.getElementById(clockId);
    clockDiv.innerHTML = message;
}

// Actually adding clocks.
function addClock() {
    clockCount++;
    const clockId = `clock-${clockCount}`;
    const clocksDisplayer = document.querySelector('.clocks-displayer');
    
    const clockDiv = createClockElement(clockId);
    clocksDisplayer.appendChild(clockDiv);
    
    // Check if the clocks-displayer is in the correct position
    if (!isClockDisplayerValid()) {
        return;
    }
    
    if (timezone) {
        updateClockWithTimezone(clockId, timezone);
    } else {
        updateClockWithLocalTime(clockId);
    }
}

// Removing clocks
function removeClock() {
    if (clockCount > 0) {
        const clockDiv = document.getElementById(`clock-${clockCount}`);
        clockDiv.remove();
        clockCount--;
    }
}

// Updating clocks.
function updateClock(clockId) {
    const clockDiv = document.getElementById(clockId);
    setInterval(() => {
        const now = new Date();
        clockDiv.innerHTML = now.toLocaleTimeString();
    }, 1000);
}

// Defining/(Designiting) an area to clocks.
function clockArea() {
    const button = document.getElementById('showBtn');
    button.onclick = () => {
        fetchTimeForTimezone(timezone);
    };
}

// Showing clocks after they've been searched.
function showClock() {
    if (timezoneInput.value === '') {
        alert('Please enter a timezone');
        return;
    } else {
        alert(`Fetching time for: ${timezoneInput.value}`);
        fetchTimeForTimezone(timezoneInput.value);
    }
}

// Fetching for timezones and regions and areas and that sort of stuff.
async function fetchTimeForTimezone(timezone) {
    try {
        const response = await fetch(`http://worldtimeapi.org/api/timezone/${timezoneInput.value}`);
        const data = await response.json();
        console.log(`The data is`, data);
        return data;
    } catch (error) {
        console.error('Error fetching time:', error);
    }
}

// commit everything to github first and then notice everything up there is working fine. Now we need to do something in inputbar so that it syncs each letter typed on the bar an suggest countries and regions based on the current word. And divide the input bar into countries and city/region search-bar.