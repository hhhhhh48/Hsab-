document.getElementById('calculateBtn').addEventListener('click', function() {
    const lmp = new Date(document.getElementById('lmp').value);
    if (isNaN(lmp)) { alert('Please enter a valid date'); return; }
    const now = new Date();
    const due = new Date(lmp.getTime() + 280 * 86400000);
    const conception = new Date(lmp.getTime() + 14 * 86400000);
    const elapsed = Math.floor((now - lmp) / 86400000);
    const weeks = Math.floor(elapsed / 7);
    const days = elapsed % 7;
    const remaining = Math.max(0, Math.ceil((due - now) / 86400000));
    let tri = weeks < 14 ? 'First' : weeks < 27 ? 'Second' : 'Third';
    const t1End = new Date(lmp.getTime() + 13 * 7 * 86400000);
    const t2End = new Date(lmp.getTime() + 27 * 7 * 86400000);
    const fmt = d => d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    document.getElementById('dueDate').textContent = fmt(due);
    document.getElementById('weeksPregnant').textContent = weeks + 'w ' + days + 'd';
    document.getElementById('trimester').textContent = tri;
    document.getElementById('daysRemaining').textContent = remaining + ' days';
    document.getElementById('t1End').textContent = fmt(t1End);
    document.getElementById('t2End').textContent = fmt(t2End);
    document.getElementById('conception').textContent = fmt(conception);
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});
