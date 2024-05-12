let box = document.getElementById('box');
let message = document.getElementById('message');
let retry = document.getElementById('retry');
let clickCount = 0;

let phrases = ['Hello', 'Nice to meet you', 'Good job', 'Keep it up', 'Well done'];

var images = [
    'images/cajita.gif',
    'images/mario-block.gif',
    'images/loot_box.gif',
    'images/item-box-mario-kart.gif',
  ];

window.onload = function() {
    let img = box.querySelector('img');
    let randomImage = images[Math.floor(Math.random() * images.length)];
    img.src = randomImage;
  }
  
box.addEventListener('click', () => {
  clickCount++;

  if (clickCount % 4 === 0) {
    let randomIndex = Math.floor(Math.random() * phrases.length);
    message.style.display = 'block';
    message.innerHTML = phrases[randomIndex];

    box.style.display = 'none';
    retry.style.display = 'block';

  } else {
    let x = Math.floor(Math.random() * (window.innerWidth - box.offsetWidth));
    let y = Math.floor(Math.random() * (window.innerHeight - box.offsetHeight));

    box.style.left = `${x}px`;
    box.style.top = `${y}px`;

    let img = box.querySelector('img');
    let randomImage = images[Math.floor(Math.random() * images.length)];

    img.src = randomImage;
  }
});

function retryGame() {
    box.style.display = 'block';
    retry.style.display = 'none';
    message.style.display = 'none';
    clickCount = 0;
}