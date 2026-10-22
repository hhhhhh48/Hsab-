document.getElementById('calculateBtn').addEventListener('click', function() {
    const start = new Date(document.getElementById('startDate').value);
    const end = new Date(document.getElementById('endDate').value);
    if (isNaN(start) || isNaN(end)) { alert('Please enter both dates'); return; }
    let s = start, e = end;
    if (s > e) { const t = s; s = e; e = t; }

    let years = e.getFullYear() - s.getFullYear();
    let months = e.getMonth() - s.getMonth();
    let days = e.getDate() - s.getDate();
    if (days < 0) { months--; days += new Date(e.getFullYear(), e.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    const totalMs = e - s;
    const totalDays = Math.floor(totalMs / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const dow = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let businessDays = 0;
    const tmp = new Date(s);
    while (tmp < e) {
        const d = tmp.getDay();
        if (d !== 0 && d !== 6) businessDays++;
        tmp.setDate(tmp.getDate() + 1);
    }

    document.getElementById('diffResult').textContent = years + ' years, ' + months + ' months, ' + days + ' days';
    document.getElementById('totalDays').textContent = totalDays.toLocaleString();
    document.getElementById('totalWeeks').textContent = totalWeeks.toLocaleString();
    document.getElementById('businessDays').textContent = businessDays.toLocaleString();
    document.getElementById('totalHours').textContent = totalHours.toLocaleString();
    document.getElementById('totalMinutes').textContent = totalMinutes.toLocaleString();
    document.getElementById('startDay').textContent = dow[s.getDay()];
    document.getElementById('endDay').textContent = dow[e.getDay()];
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});
