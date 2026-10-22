document.getElementById('calculateBtn').addEventListener('click', function() {
    const dob = new Date(document.getElementById('dob').value);
    const as = new Date(document.getElementById('assessment').value);
    if (isNaN(dob) || isNaN(as)) { alert('Please enter both dates'); return; }
    if (dob > as) { alert('Date of birth must be before the assessment date'); return; }

    let years = as.getFullYear() - dob.getFullYear();
    let months = as.getMonth() - dob.getMonth();
    let days = as.getDate() - dob.getDate();
    if (days < 0) { months--; days += new Date(as.getFullYear(), as.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((as - dob) / 86400000);
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalDays / 7);

    document.getElementById('medicalFormat').textContent =
        years + '-' + String(months).padStart(2,'0') + '-' + String(days).padStart(2,'0');
    document.getElementById('mainAge').textContent =
        years + ' years, ' + months + ' months, ' + days + ' days';
    document.getElementById('totalMonths').textContent = totalMonths;
    document.getElementById('totalWeeks').textContent = totalWeeks;
    document.getElementById('totalDays').textContent = totalDays.toLocaleString();
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});
