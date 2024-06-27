document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.meeting-scheduler form');
    const meetingTimeInput = document.getElementById('meeting-time');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const meetingTime = new Date(meetingTimeInput.value);
        if (isNaN(meetingTime)) {
            alert('Please select a valid date and time.');
            return;
        }

        const now = new Date();
        if (meetingTime < now) {
            alert('You cannot schedule a meeting in the past. Please select a future date and time.');
            return;
        }

        alert(`Meeting successfully scheduled for: ${meetingTime.toLocaleString()}`);
    });
});

