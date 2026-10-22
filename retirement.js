document.getElementById('calculateBtn').addEventListener('click', function() {
    const bd = new Date(document.getElementById('birthDate').value);
    const age = parseInt(document.getElementById('retireAge').value);
    if (isNaN(bd) || isNaN(age)) { alert('Please fill all fields'); return; }
    const now = new Date();
    if (bd > now) { alert('Birth date cannot be in the future'); return; }

    const retire = new Date(bd.getFullYear() + age, bd.getMonth(), bd.getDate());
    const ms = retire - now;
    if (ms < 0) { alert('You have already reached the retirement age'); return; }

    let years = retire.getFullYear() - now.getFullYear();
    let months = retire.getMonth() - now.getMonth();
    let days = retire.getDate() - now.getDate();
    if (days < 0) { months--; days += new Date(retire.getFullYear(), retire.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor(ms / 86400000);
    const dow = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const fmt = d => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    document.getElementById('retireDate').textContent = fmt(retire);
    document.getElementById('timeRemaining').textContent = years + 'y ' + months + 'm ' + days + 'd';
    document.getElementById('yearsLeft').textContent = years;
    document.getElementById('monthsLeft').textContent = years * 12 + months;
    document.getElementById('daysLeft').textContent = totalDays.toLocaleString();
    document.getElementById('retireDay').textContent = dow[retire.getDay()];
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});
