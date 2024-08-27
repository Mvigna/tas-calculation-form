function populateFields(inputElement) {
    const row = inputElement.parentElement.parentElement;
    const grade = inputElement.value.toUpperCase();
    const gradePointsField = row.querySelector('.grade-points');
    const creditsField = row.querySelector('.credits');
    const totalPointsField = row.querySelector('.total-points');
    const adjustmentFactorField = row.querySelector('.adjustment-factor');

    // Grade point values
    const gradePointValues = {
        'A': 4,
        'B': 3,
        'C': 2,
        'D': 1,
        'F': 0,
        'CLEP': 0,
        'P': 0
    };

    // Get the course name
    const courseNameCell = row.querySelector('td:first-child');
    const courseName = courseNameCell.querySelector('input')?.placeholder || courseNameCell.innerText.trim();

    // Determine the correct credits and adjustment factor
    let credits = 0;
    let adjustmentFactor = 0;

    if (courseName === 'Humanities Elective') {
        credits = 3;
        adjustmentFactor = 0.03;
    } else {
        credits = parseFloat(row.querySelector('.letter-grade').dataset.credits);
        adjustmentFactor = parseFloat(row.querySelector('.letter-grade').dataset.adjustment);
    }

    if (grade in gradePointValues) {
        gradePointsField.value = gradePointValues[grade];
        creditsField.value = credits;
        totalPointsField.value = (gradePointValues[grade] * credits).toFixed(2);

        // Correctly populate adjustment factor, including 'D' and 'F' cases
        if (grade === 'CLEP' || grade === 'P') {
            adjustmentFactorField.value = adjustmentFactor.toFixed(2);
        } else if (grade !== 'F') {
            adjustmentFactorField.value = adjustmentFactor.toFixed(2);
        } else {
            adjustmentFactorField.value = '0.00';
        }
    } else {
        // Clear fields if the grade is invalid or removed
        gradePointsField.value = '';
        creditsField.value = '';
        totalPointsField.value = '';
        adjustmentFactorField.value = '';
    }

    // Recalculate the totals
    calculateTotals();
}

function calculateTotals() {
    let totalCredits = 0;
    let totalPoints = 0;
    let totalAdjustmentFactor = 0;

    document.querySelectorAll('tr').forEach(row => {
        const credits = parseFloat(row.querySelector('.credits')?.value) || 0;
        const points = parseFloat(row.querySelector('.total-points')?.value) || 0;
        const adjustmentFactor = parseFloat(row.querySelector('.adjustment-factor')?.value) || 0;

        totalCredits += credits;
        totalPoints += points;
        totalAdjustmentFactor += adjustmentFactor;
    });

    document.getElementById('total-credits').innerText = totalCredits.toFixed(2);
    document.getElementById('total-points').innerText = totalPoints.toFixed(2);
    document.getElementById('total-adjustment').innerText = totalAdjustmentFactor.toFixed(2);

    // Calculate PR CUM and TAS
    const prCum = totalCredits ? (totalPoints / totalCredits) : 0;
    document.getElementById('pr-cum').innerText = prCum.toFixed(2);
    const tas = prCum + totalAdjustmentFactor;
    document.getElementById('tas').innerText = tas.toFixed(2);
}

