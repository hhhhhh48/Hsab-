const birthdateInput = document.getElementById('birthdate');
const currentdateInput = document.getElementById('currentdate');
const calculateBtn = document.getElementById('calculateBtn');
const resultsSection = document.getElementById('results');

const today = new Date().toISOString().split('T')[0];
birthdateInput.max = today;
currentdateInput.max = today;

calculateBtn.addEventListener('click', calculateAge);

function calculateAge() {
    const birthValue = birthdateInput.value;
    if (!birthValue) { alert('Please enter your date of birth'); return; }

    const birthDate = new Date(birthValue);
    const currentDate = currentdateInput.value ? new Date(currentdateInput.value) : new Date();

    if (birthDate > currentDate) { alert('Birth date cannot be after current date'); return; }

    const age = calculateExactAge(birthDate, currentDate);
    const totalMs = currentDate - birthDate;
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const bornDay = daysOfWeek[birthDate.getDay()];
    const nextBirthdayInfo = getNextBirthday(birthDate, currentDate);

    document.getElementById('ageResult').textContent =
        `${age.years} years, ${age.months} months, ${age.days} days`;
    document.getElementById('totalDays').textContent = totalDays.toLocaleString();
    document.getElementById('totalWeeks').textContent = totalWeeks.toLocaleString();
    document.getElementById('totalHours').textContent = totalHours.toLocaleString();
    document.getElementById('totalMinutes').textContent = totalMinutes.toLocaleString();
    document.getElementById('bornDay').textContent = bornDay;
    document.getElementById('nextBirthday').textContent = nextBirthdayInfo;

    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function calculateExactAge(birthDate, currentDate) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) { years--; months += 12; }
    return { years, months, days };
}

function getNextBirthday(birthDate, currentDate) {
    let nextBirthday = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (birthDate.getMonth() === 1 && birthDate.getDate() === 29 && !isLeap(currentDate.getFullYear())) {
        nextBirthday = new Date(currentDate.getFullYear(), 2, 1);
    }
    if (nextBirthday < currentDate) {
        const ny = currentDate.getFullYear() + 1;
        nextBirthday = (birthDate.getMonth() === 1 && birthDate.getDate() === 29 && !isLeap(ny))
            ? new Date(ny, 2, 1)
            : new Date(ny, birthDate.getMonth(), birthDate.getDate());
    }
    const daysUntil = Math.ceil((nextBirthday - currentDate) / (1000*60*60*24));
    return daysUntil === 0 ? 'Today!' : `In ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`;
}

function isLeap(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }

let countdownInterval = null;

function startCountdown(birthDate) {
    if (countdownInterval) clearInterval(countdownInterval);
    const box = document.getElementById('countdownBox');
    const el = document.getElementById('countdown');
    box.classList.remove('hidden');

    function tick() {
        const now = new Date();
        let next = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate(), 0, 0, 0);
        if (birthDate.getMonth() === 1 && birthDate.getDate() === 29 && !isLeap(now.getFullYear())) {
            next = new Date(now.getFullYear(), 2, 1);
        }
        if (next <= now) {
            const ny = now.getFullYear() + 1;
            next = (birthDate.getMonth() === 1 && birthDate.getDate() === 29 && !isLeap(ny))
                ? new Date(ny, 2, 1)
                : new Date(ny, birthDate.getMonth(), birthDate.getDate());
        }
        const diff = next - now;
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        el.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }
    tick();
    countdownInterval = setInterval(tick, 1000);
}

// شريط تقدم العمر
calculateBtn.addEventListener('click', function() {
    setTimeout(function() {
        const b = new Date(birthdateInput.value);
        const now = currentdateInput.value ? new Date(currentdateInput.value) : new Date();
        if (isNaN(b) || b > now) return;
        const totalDays = Math.floor((now - b) / 86400000);
        const pct = Math.min(100, (totalDays / (80 * 365.25)) * 100);
        const fill = document.getElementById('progressFill');
        if (!fill) return;
        fill.style.width = pct + '%';
        fill.textContent = pct.toFixed(1) + '%';
        document.getElementById('progressLabel').textContent =
            'You have lived ' + pct.toFixed(1) + '% of an average 80-year life.';
        document.getElementById('progressBox').classList.remove('hidden');
    }, 100);
});
