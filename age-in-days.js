document.getElementById('calculateBtn').addEventListener('click', function() {
    const b = new Date(document.getElementById('birthDate').value);
    if (isNaN(b)) { alert('Please enter a valid date'); return; }
    const now = new Date();
    if (b > now) { alert('Birth date cannot be in the future'); return; }

    const ms = now - b;
    const days = Math.floor(ms / 86400000);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.4375);
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor(ms / 1000);

    document.getElementById('mainDays').textContent = days.toLocaleString() + ' days';
    document.getElementById('totalWeeks').textContent = weeks.toLocaleString();
    document.getElementById('totalMonths').textContent = months.toLocaleString();
    document.getElementById('totalHours').textContent = hours.toLocaleString();
    document.getElementById('totalMinutes').textContent = minutes.toLocaleString();
    document.getElementById('totalSeconds').textContent = seconds.toLocaleString();
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});
