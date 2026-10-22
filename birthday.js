document.getElementById('calculateBtn').addEventListener('click', function() {
    const birthDate = new Date(document.getElementById('birthDate').value);
    if (isNaN(birthDate)) { alert('Please enter a valid date'); return; }
    const now = new Date();
    if (birthDate > now) { alert('Birth date cannot be in the future'); return; }

    const dow = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const bornDay = dow[birthDate.getDay()];

    function leap(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }
    function nextBday(from) {
        let nb = new Date(from.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (birthDate.getMonth() === 1 && birthDate.getDate() === 29 && !leap(from.getFullYear())) {
            nb = new Date(from.getFullYear(), 2, 1);
        }
        if (nb <= from) {
            const ny = from.getFullYear() + 1;
            nb = (birthDate.getMonth() === 1 && birthDate.getDate() === 29 && !leap(ny))
                ? new Date(ny, 2, 1) : new Date(ny, birthDate.getMonth(), birthDate.getDate());
        }
        return nb;
    }
    const nb = nextBday(now);
    const daysUntil = Math.ceil((nb - now) / 86400000);
    const ageTurning = nb.getFullYear() - birthDate.getFullYear();
    const nbStr = nb.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    function zodiac(d) {
        const m = d.getMonth() + 1, day = d.getDate();
        if ((m===3&&day>=21)||(m===4&&day<=19)) return 'Aries';
        if ((m===4&&day>=20)||(m===5&&day<=20)) return 'Taurus';
        if ((m===5&&day>=21)||(m===6&&day<=20)) return 'Gemini';
        if ((m===6&&day>=21)||(m===7&&day<=22)) return 'Cancer';
        if ((m===7&&day>=23)||(m===8&&day<=22)) return 'Leo';
        if ((m===8&&day>=23)||(m===9&&day<=22)) return 'Virgo';
        if ((m===9&&day>=23)||(m===10&&day<=22)) return 'Libra';
        if ((m===10&&day>=23)||(m===11&&day<=21)) return 'Scorpio';
        if ((m===11&&day>=22)||(m===12&&day<=21)) return 'Sagittarius';
        if ((m===12&&day>=22)||(m===1&&day<=19)) return 'Capricorn';
        if ((m===1&&day>=20)||(m===2&&day<=18)) return 'Aquarius';
        return 'Pisces';
    }

    document.getElementById('birthdayResult').textContent = 'A ' + bornDay;
    document.getElementById('nextBirthdayDate').textContent = nbStr;
    document.getElementById('nextBirthdayDay').textContent = dow[nb.getDay()];
    document.getElementById('daysUntil').textContent = daysUntil === 0 ? 'Today!' : daysUntil + ' days';
    document.getElementById('ageTurning').textContent = ageTurning;
    document.getElementById('zodiac').textContent = zodiac(birthDate);
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});
