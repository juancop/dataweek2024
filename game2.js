let box = document.getElementById('box2');
let message = document.getElementById('message');
let retry = document.getElementById('retry');
let clickCount = 0;
let timeout;

let phrases = ['Hello', 'Nice to meet you', 'Good job', 'Keep it up', 'Well done'];

let mouseX = 0;
let mouseY = 0;

document.onmousemove = function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
};
window.onload = setupBoxPosition;


box.addEventListener('mouseover', () => {
    if (timeout) clearTimeout(timeout);
    moveBoxAway();
  });

box.addEventListener('click', () => {
    if (timeout) {
        clearTimeout(timeout);
    }
    clickCount++;

    let randomIndex = Math.floor(Math.random() * phrases.length);
    message.innerHTML = phrases[randomIndex];
    message.style.display = 'block';

    box.style.display = 'none';
    retry.style.display = 'block';
    speedFactor =  20; // reset speed factor
});

function setupBoxPosition() {
    let x = Math.floor(Math.random() * (window.innerWidth - box.offsetWidth));
    let y = Math.floor(Math.random() * (window.innerHeight - box.offsetHeight));

    box.style.left = `${x}px`;
    box.style.top = `${y}px`;
}

let speedFactor = 80;
let decreaseFactor = 0.05; // Define your decrease facor

function moveBoxAway() {
    let boxRect = box.getBoundingClientRect();

    let dx = mouseX - (boxRect.x + boxRect.width/2); 
    let dy = mouseY - (boxRect.y + boxRect.height/2); 

    let distance = Math.sqrt(dx*dx + dy*dy);

    if (distance <= 100) {
        let newX = boxRect.x - dx * speedFactor;
        let newY = boxRect.y - dy * speedFactor;

        if(newX < 0) newX = 0;
        if(newX > window.innerWidth - box.offsetWidth) newX = window.innerWidth - box.offsetWidth;
        if(newY < 0) newY = 0;
        if(newY > window.innerHeight - box.offsetHeight) newY = window.innerHeight - box.offsetHeight;

        box.style.top = `${newY}px`;
        box.style.left = `${newX}px`;

        speedFactor = Math.max(1, speedFactor*(1-decreaseFactor)); // Decrease speedFactor only until it is greater than 1
    }
    
    timeout = setTimeout(moveBoxAway, 10);
}

function retryGame() {
    box.style.display = 'block';
    retry.style.display = 'none';
    message.style.display = 'none';
    clickCount = 0;
    speedFactor = 80; // reset speed factor
    moveBox();
}