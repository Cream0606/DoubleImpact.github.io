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
        const size = Math.max(200, (amount / maxAmount) * 500); 
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.fontSize = `24px`; 
    }

    setCircleSize(document.querySelector('.democrat-circle'), democratAmount);
    setCircleSize(document.querySelector('.republican-circle'), republicanAmount);
    setCircleSize(document.querySelector('.charity-circle'), charityAmount);
    setCircleSize(document.querySelector('.remaining-circle'), remainingAmount);

    document.getElementById('democrat-amount').textContent = `$${democratAmount.toLocaleString()}`;
    document.getElementById('republican-amount').textContent = `$${republicanAmount.toLocaleString()}`;
    document.getElementById('charity-amount').textContent = `$${charityAmount.toLocaleString()}`;
    document.getElementById('remaining-amount').textContent = `$${remainingAmount.toLocaleString()}`;

    const remainingCircle = document.querySelector('.remaining-circle');
    const remainingAmountElement = document.getElementById('remaining-amount');
    if (democratAmount > republicanAmount) {
        remainingCircle.style.borderColor = '#0015BC'; 
        remainingCircle.style.color = '#0015BC';
        remainingAmountElement.style.color = '#0015BC';
        remainingCircle.querySelector('p').textContent = 'Towards Democratic';
    } else if (republicanAmount > democratAmount) {
        remainingCircle.style.borderColor = '#FF0000'; 
        remainingCircle.style.color = '#FF0000';
        remainingAmountElement.style.color = '#FF0000';
        remainingCircle.querySelector('p').textContent = 'Towards Republican';
    } else {
        remainingCircle.style.borderColor = '#c29d25';
        remainingCircle.style.color = '#c29d25';
        remainingAmountElement.style.color = '#c29d25';
        remainingCircle.querySelector('p').textContent = 'Towards Party';
    }
}

function updateDaysRemaining() {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const daysRemaining = endOfMonth.getDate() - now.getDate() + 1;
    document.getElementById('days-remaining').textContent = daysRemaining;
}

const fullDescriptions = [
    'Make-A-Wish creates life-changing wishes for children with critical illnesses. By granting wishes, the organization provides hope, strength, and joy to children and their families during difficult times. Every donation helps bring a child\'s dream to life, offering them a moment of happiness and the emotional strength to fight their illness. With the help of generous donors, Make-A-Wish has made dreams come true for thousands of children across the globe.',
    'Systemic Altruism focuses on using evidence and data to drive charitable giving toward the most effective causes. By working to identify solutions that have a long-lasting, high-impact effect on global problems, Systemic Altruism channels donations toward the issues that matter most, such as poverty alleviation, climate change, and public health. Your contribution helps amplify the impact of global giving by supporting projects that prioritize long-term, systemic change.',
    'Feeding America is the largest hunger-relief organization in the United States, working to provide meals to individuals and families struggling with food insecurity. Through its network of food banks, Feeding America distributes millions of meals each year to those in need, ensuring that no one has to go hungry. Every dollar donated helps put food on the table for families, children, and seniors who face hunger in communities across the country.'
];

const charityLinks = [
    '<a href="https://wish.org" target="_blank" class="charity-link">Learn More</a>',
    '<a href="https://systemicaltruism.com" target="_blank" class="charity-link">Learn More</a>',
    '<a href="https://www.feedingamerica.org/" target="_blank" class="charity-link">Learn More</a>'
];

function updateCharityContent() {
    const isSmallScreen = window.innerWidth < 800;
    const charityItems = document.querySelectorAll('.charity-item');

    charityItems.forEach((item, index) => {
        const description = item.querySelector('p');
        
        if (isSmallScreen) {
            description.innerHTML = charityLinks[index];
        } else {
            description.textContent = fullDescriptions[index];
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const democratAmount = parseFloat(document.getElementById("democrat-amount").textContent.replace(/[^0-9.-]+/g,""));
    const republicanAmount = parseFloat(document.getElementById("republican-amount").textContent.replace(/[^0-9.-]+/g,""));
    
    const { charityAmount, remainingAmount } = calculateAmounts(democratAmount, republicanAmount);
    
    updateCircleSizes(democratAmount, republicanAmount, charityAmount, remainingAmount);
    
    updateDaysRemaining();
    setInterval(updateDaysRemaining, 24 * 60 * 60 * 1000);
});

window.addEventListener('resize', updateCharityContent);
