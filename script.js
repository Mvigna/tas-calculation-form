function populateFields(input) {
    const letterGrade = input.value.toUpperCase();
    const gradePointInput = input.closest('tr').querySelector('.grade-points');
    const creditsInput = input.closest('tr').querySelector('.credits');
    const totalPointsInput = input.closest('tr').querySelector('.total-points');
    const adjustmentFactorInput = input.closest('tr').querySelector('.adjustment-factor');

    const credits = parseFloat(input.getAttribute('data-credits'));
    const adjustmentFactor = parseFloat(input.getAttribute('data-adjustment'));

    let gradePoint = 0;

    switch (letterGrade) {
        case 'A':
            gradePoint = 4;
            break;
        case 'B':
            gradePoint = 3;
            break;
        case 'C':
            gradePoint = 2;
            break;
        case 'D':
            gradePoint = 1;
            break;
        case 'F':
        case 'CLEP':
        case 'P':
            gradePoint = 0;
            break;
        default:
            gradePoint = 0;
    }

    gradePointInput.value = gradePoint;
    creditsInput.value = credits || 0;
    const totalPoints = gradePoint * credits;
    totalPointsInput.value = isNaN(totalPoints) ? 0 : totalPoints;
    adjustmentFactorInput.value = adjustmentFactor || 0;

    calculateTotals();
}

function calculateTotals() {
    let totalCredits = 0;
    let totalPoints = 0;
    let totalAdjustment = 0;

    document.querySelectorAll('tr').forEach(row => {
        const credits = parseFloat(row.querySelector('.credits')?.value || 0);
        const points = parseFloat(row.querySelector('.total-points')?.value || 0);
        const adjustment = parseFloat(row.querySelector('.adjustment-factor')?.value || 0);

        totalCredits += credits;
        totalPoints += points;
        totalAdjustment += adjustment;
    });

    document.getElementById('total-credits').textContent = totalCredits.toFixed(2);
    document.getElementById('total-points').textContent = totalPoints.toFixed(2);
    document.getElementById('total-adjustment').textContent = totalAdjustment.toFixed(2);

    const prCum = totalPoints / totalCredits;
    document.getElementById('pr-cum').textContent = isNaN(prCum) ? '0.00' : prCum.toFixed(2);

    const tas = prCum + totalAdjustment;
    document.getElementById('tas').textContent = isNaN(tas) ? '0.00' : tas.toFixed(2);
}
