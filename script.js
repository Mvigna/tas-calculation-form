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
        'CLEP': 0, // Grade points for CLEP should be 0
        'P': 0     // Grade points for P should be 0
    };

    // Credit values for courses
    const courseCredits = {
        'BIO110 or BIO151': 4,
        'BIO123 or ALH140': 4,
        'BIO161': 4,
        'BIO162': 4,
        'ENG101': 3,
        'ENG102': 3,
        'MAT108': 3,
        'PHY100': 4,
        'PSY101': 3,
        'SPH': 3,
        'Humanities Elective': 3 // Replace with actual credits if different
    };

    // Adjustment factor values (0.01 * number of credits for courses other than CLEP/P)
    const adjustmentFactors = {
        'BIO110 or BIO151': 0.04,
        'BIO123 or ALH140': 0.04,
        'BIO161': 0.04,
        'BIO162': 0.04,
        'ENG101': 0.03,
        'ENG102': 0.03,
        'MAT108': 0.03,
        'PHY100': 0.04,
        'PSY101': 0.03,
        'SPH': 0.03,
        'Humanities Elective': 0.03 // Replace with actual factor if different
    };

    if (grade in gradePointValues) {
        // Set grade points
        gradePointsField.value = gradePointValues[grade];
        
        if (grade === 'CLEP' || grade === 'P') {
            // For CLEP and P, adjust other fields specifically
            creditsField.value = ''; // CLEP and P don't have credits
            totalPointsField.value = ''; // CLEP and P don't contribute to total points
            const courseName = inputElement.parentElement.parentElement.cells[0].innerText.trim();
            adjustmentFactorField.value = adjustmentFactors[courseName] || '0.04'; // Specific adjustment factor for each course
        } else {
            // Handle other grades
            const courseName = inputElement.parentElement.parentElement.cells[0].innerText.trim();
            
            const credits = courseCredits[courseName] || 0;
            creditsField.value = credits;

            const totalPoints = gradePointValues[grade] * credits;
            totalPointsField.value = totalPoints.toFixed(2);

            const adjustmentFactor = adjustmentFactors[courseName] || 0;
            adjustmentFactorField.value = (grade !== 'F') ? adjustmentFactor.toFixed(2) : '';
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
