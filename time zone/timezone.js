let clockCount = 0;
let country = timezoneInput;
// let state = '';
// let region = '';
let url = `http://worldtimeapi.org/api/timezone/${country}`;
const timezoneInput = document.getElementById('timezone');
const timezone = timezoneInput.value;

// adding functionality!
function isClockDisplayerValid() {
    const clockTaskContainer = document.getElementById('clock-task-container');
    const nextDiv = clockTaskContainer.nextElementSibling;
    return nextDiv && nextDiv.className === 'clocks-displayer';
}

function createClockElement(id) {
    const clockDiv = document.createElement('div');
    clockDiv.id = id;
    clockDiv.className = 'clock';
    return clockDiv;
}
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

function updateClockWithLocalTime(clockId) {
    const now = new Date();
    updateClock(clockId, now.toISOString());
}

function setClockError(clockId, message) {
    const clockDiv = document.getElementById(clockId);
    clockDiv.innerHTML = message;
}

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

function removeClock() {
    if (clockCount > 0) {
        const clockDiv = document.getElementById(`clock-${clockCount}`);
        clockDiv.remove();
        clockCount--;
    }
}

function updateClock(clockId) {//what does this function do?
    const clockDiv = document.getElementById(clockId);
    setInterval(() => {
        const now = new Date();
        clockDiv.innerHTML = now.toLocaleTimeString();
    }, 1000);
}

function clockArea() {
    const button = document.getElementById('showBtn');
    button.onclick = () => {
        fetchTimeForTimezone(timezone);
    };
}

function showClock() {
    
    if (timezoneInput.value === '') {
        alert('Please enter a timezone');
        return;
    }
    else {
        alert(`Fetching time for: ${timezone}`);
    fetchTimeForTimezone(timezone);
    console.log(`The data is`, data);
    return data;
}
};

async function fetchTimeForTimezone() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(`The data is`, data);
    } catch (error) {
        console.error('Error fetching time:', error);
    }
}