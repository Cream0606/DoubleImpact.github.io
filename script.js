function calculateAmounts(democratAmount, republicanAmount) {
    const charityAmount = Math.min(democratAmount, republicanAmount) * 2;
    const remainingAmount = Math.max(democratAmount, republicanAmount) - Math.min(democratAmount, republicanAmount);
    return { charityAmount, remainingAmount };
}

function updateCircleSizes(democratAmount, republicanAmount, charityAmount, remainingAmount) {
    const totalParties = democratAmount + republicanAmount;
    const totalCharity = charityAmount + remainingAmount;
    const maxAmount = Math.max(totalParties, totalCharity);

    function setCircleSize(element, amount) {
        const size = Math.max(200, (amount / maxAmount) * 500); // Increased from 50 and 150 to 80 and 250
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.fontSize = `24px`; // Adjusted from 8 to 6 for larger text
    }

    setCircleSize(document.querySelector('.democrat-circle'), democratAmount);
    setCircleSize(document.querySelector('.republican-circle'), republicanAmount);
    setCircleSize(document.querySelector('.charity-circle'), charityAmount);
    setCircleSize(document.querySelector('.remaining-circle'), remainingAmount);

    // Update amounts
    document.getElementById('democrat-amount').textContent = `$${democratAmount.toLocaleString()}`;
    document.getElementById('republican-amount').textContent = `$${republicanAmount.toLocaleString()}`;
    document.getElementById('charity-amount').textContent = `$${charityAmount.toLocaleString()}`;
    document.getElementById('remaining-amount').textContent = `$${remainingAmount.toLocaleString()}`;

    // Set the color of the remaining circle based on the winning party
    const remainingCircle = document.querySelector('.remaining-circle');
    const remainingAmountElement = document.getElementById('remaining-amount');
    if (democratAmount > republicanAmount) {
        remainingCircle.style.borderColor = '#0015BC'; // Democrat blue
        remainingCircle.style.color = '#0015BC';
        remainingAmountElement.style.color = '#0015BC';
    } else if (republicanAmount > democratAmount) {
        remainingCircle.style.borderColor = '#FF0000'; // Republican red
        remainingCircle.style.color = '#FF0000';
        remainingAmountElement.style.color = '#FF0000';
    } else {
        remainingCircle.style.borderColor = '#c29d25'; // Neutral color for a tie
        remainingCircle.style.color = '#c29d25';
        remainingAmountElement.style.color = '#c29d25';
    }
}

function updateDaysRemaining() {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const daysRemaining = endOfMonth.getDate() - now.getDate() + 1;
    document.getElementById('days-remaining').textContent = daysRemaining;
}

document.addEventListener("DOMContentLoaded", function() {
    const democratAmount = parseFloat(document.getElementById("democrat-amount").textContent.replace(/[^0-9.-]+/g,""));
    const republicanAmount = parseFloat(document.getElementById("republican-amount").textContent.replace(/[^0-9.-]+/g,""));
    
    const { charityAmount, remainingAmount } = calculateAmounts(democratAmount, republicanAmount);
    
    // Update circle sizes and amounts
    updateCircleSizes(democratAmount, republicanAmount, charityAmount, remainingAmount);
    
    // Update days remaining
    updateDaysRemaining();
    // Update every day at midnight
    setInterval(updateDaysRemaining, 24 * 60 * 60 * 1000);
});