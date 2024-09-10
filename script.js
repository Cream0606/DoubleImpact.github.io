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
        const baseSize = window.innerWidth <= 767 ? Math.min(window.innerWidth * 0.4, 200) : Math.min(window.innerWidth * 0.25, 200);
        const size = Math.max(baseSize, (amount / maxAmount) * baseSize * 2);
        const fontSize = 24;

        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.fontSize = `${fontSize}px`;
        
        const amountSpan = element.querySelector('span');
        if (amountSpan) {
            amountSpan.style.fontSize = `${fontSize * 1.2}px`;
        }
    }

    setCircleSize(document.querySelector('.democrat-circle'), democratAmount);
    setCircleSize(document.querySelector('.republican-circle'), republicanAmount);
    setCircleSize(document.querySelector('.charity-circle'), charityAmount);
    setCircleSize(document.querySelector('.remaining-circle'), remainingAmount);

    // Update amount text
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
        remainingCircle.querySelector('p').innerHTML = 'Towards <br> Democratic';
    } else if (republicanAmount > democratAmount) {
        remainingCircle.style.borderColor = '#FF0000'; 
        remainingCircle.style.color = '#FF0000';
        remainingAmountElement.style.color = '#FF0000';
        remainingCircle.querySelector('p').innerHTML = 'Towards <br> Republican';
    } else {
        remainingCircle.style.borderColor = '#c29d25';
        remainingCircle.style.color = '#c29d25';
        remainingAmountElement.style.color = '#c29d25';
        remainingCircle.querySelector('p').innerHTML = ' ';
    }
}

function updateDaysRemaining() {
    const now = new Date();
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const timeDifference = lastDayOfMonth - now;
    
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    
    const daysRemainingElement = document.getElementById('days-remaining');
    
    if (daysRemaining > 1) {
        daysRemainingElement.textContent = `${daysRemaining} days`;
    } else if (daysRemaining === 1) {
        daysRemainingElement.textContent = `1 day`;
    } else if (hoursRemaining > 0) {
        daysRemainingElement.textContent = `${hoursRemaining} hours and ${minutesRemaining} minutes`;
    } else {
        daysRemainingElement.textContent = `${minutesRemaining} minutes`;
    }
}

const fullDescriptions = [
    'Make-A-Wish creates life-changing wishes for children with critical illnesses. By granting wishes, the organization provides hope, strength, and joy to children and their families during difficult times. Every donation helps bring a child\'s dream to life, offering them a moment of happiness and the emotional strength to fight their illness. With the help of generous donors, Make-A-Wish has made dreams come true for thousands of children across the globe.',
    'Heifer International works to end hunger and poverty around the world by empowering communities through sustainable agriculture and economic development. By providing livestock, seeds, and training, Heifer helps families lift themselves out of poverty, ensuring they can achieve self-reliance and build better futures. Your donation can transform lives by providing resources that create lasting change',
    'Feeding America is the largest hunger-relief organization in the United States, working to provide meals to individuals and families struggling with food insecurity. Through its network of food banks, Feeding America distributes millions of meals each year to those in need, ensuring that no one has to go hungry. Every dollar donated helps put food on the table for families, children, and seniors who face hunger in communities across the country.',
    'Junior Achievement (JA) inspires and prepares young people to succeed in a global economy by delivering hands-on, experiential learning in financial literacy, work readiness, and entrepreneurship. Through its programs, JA equips students with the knowledge and skills they need to make smart academic and economic decisions, empowering them to own their future success.',
    'The Humane Society of the United States is the nation\'s most effective animal protection organization, working to end suffering for all animals. Through advocacy, education, and hands-on animal rescue efforts, the Humane Society aims to prevent cruelty, exploitation, and neglect while promoting the humane treatment of all creatures.',
    'The American Red Cross provides emergency assistance, disaster relief, and education in the United States. With a strong commitment to helping people in need, the Red Cross offers services like blood donation, disaster response, support for military families, and international relief efforts. Your donation ensures the continuation of these life-saving services.'
];

const charityLinks = [
    '<a href="https://wish.org" target="_blank" class="charity-link">Learn More</a>',
    '<a href="https://www.heifer.org/gift-catalog/animals/index.html" target="_blank" class="charity-link">Learn More</a>',
    '<a href="https://www.feedingamerica.org/" target="_blank" class="charity-link">Learn More</a>',
    '<a href="https://www.juniorachievement.org" target="_blank" class="charity-link">Learn More</a>',
    '<a href="https://www.humanesociety.org" target="_blank" class="charity-link">Learn More</a>',
    '<a href="https://www.redcross.org" target="_blank" class="charity-link">Learn More</a>'
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

// Add this function to handle resizing
function handleResize() {
    const democratAmount = parseFloat(document.getElementById("democrat-amount").textContent.replace(/[^0-9.-]+/g,""));
    const republicanAmount = parseFloat(document.getElementById("republican-amount").textContent.replace(/[^0-9.-]+/g,""));
    
    const { charityAmount, remainingAmount } = calculateAmounts(democratAmount, republicanAmount);
    
    updateCircleSizes(democratAmount, republicanAmount, charityAmount, remainingAmount);
}

// Call handleResize on window resize
window.addEventListener('resize', handleResize);

// Call handleResize on initial load
document.addEventListener("DOMContentLoaded", handleResize);

// Call updateDaysRemaining immediately and then every minute
updateDaysRemaining();
setInterval(updateDaysRemaining, 60000);


document.addEventListener('DOMContentLoaded', updateDaysRemaining);
updateCharityContent();
window.addEventListener('resize', updateCharityContent);
