let clockCount = 0;

function addClock() {
    clockCount++;
    const clockDiv = document.createElement('div');
    clockDiv.id = `clock-${clockCount}`;
    clockDiv.className = 'clock';
    document.getElementById('clocks-container').appendChild(clockDiv);
    updateClock(clockDiv.id);
}

function removeClock() {
    if (clockCount > 0) {
        const clockDiv = document.getElementById(`clock-${clockCount}`);
        clockDiv.remove();
        clockCount--;
    }
}

function updateClock(clockId) {
    const clockDiv = document.getElementById(clockId);
    setInterval(() => {
        const now = new Date();
        clockDiv.innerHTML = now.toLocaleTimeString();
    }, 1000);
}

function clockArea() {
    const label = document.getElementById('labelEnter');
    const input = document.getElementById('timezone');
    const button = document.getElementById('showBtn');

    button.onclick = () => {
        const timezone = input.value;
        fetchTimeForTimezone(timezone);
    };

}

function fetchTimeForTimezone(timezone) {
    // Placeholder function to fetch and display time for the given timezone
    console.log(`Fetching time for timezone: ${timezone}`);
    // Implement the logic to fetch and display the time for the given timezone

};
