let knob = document.querySelector(".knob");
let circle = document.getElementById("circle2");
let pointer = document.querySelector(".pointer");
let text = document.querySelector(".text");
let screen = document.querySelector('.screen');

let isRotating = false;

document.addEventListener("mousedown", (e) => {
  if (e.target.closest(".knob")) {
    isRotating = true;
  }
});

const rotateKnob = (e) => {
  if (isRotating) {
    let knobX = knob.getBoundingClientRect().left + knob.clientWidth / 2;
    let knobY = knob.getBoundingClientRect().top + knob.clientHeight / 2;

    let deltaX = e.clientX - knobX;
    let deltaY = e.clientY - knobY;

    let angleRad = Math.atan2(deltaY, deltaX);
    let angleDeg = (angleRad * 180) / Math.PI;

    let rotationAngle = (angleDeg - 135 + 360) % 360;

    if (rotationAngle <= 270) {
      pointer.style.transform = `rotate(${rotationAngle - 45}deg)`;

      let progressPercent = rotationAngle / 270;

      circle.style.strokeDashoffset = `${440 - 330 * progressPercent}`;

      let numberOfSquares = Math.round(progressPercent * 100);
      text.innerHTML = `${numberOfSquares}`;

     
      screen.innerHTML = '';
        
      for (let i = 0; i < numberOfSquares * numberOfSquares; i++) {
        const div = document.createElement('div');
        const squareSize = (600 - numberOfSquares * 2) / numberOfSquares;
        div.style.height = `${squareSize}px`;
        div.style.width = `${squareSize}px`;
        let red = Math.floor(Math.random() *255);
        let blue = Math.floor(Math.random() *255);
        let green = Math.floor(Math.random() *255);
        let color = 'rgb('+red+','+blue+','+green+')';
        div.style.backgroundColor = color;          
        
        div.style.opacity = '0';
        div.className = "square";
        div.addEventListener('mouseenter', () => {
            opacity = Number(div.style.opacity) ;
            opacity += 0.3;
            div.style.opacity = opacity.toString();
            

        })
        screen.append(div);
      }
    }
  }
};

document.addEventListener("mousemove", rotateKnob);

document.addEventListener("mouseup", () => {
  isRotating = false;
});


const button2 = document.querySelector("#erase");

button2.addEventListener('click', () => {
  const squares = document.querySelectorAll('.square');
  let numberOfSquares = Number(text.innerHTML);
  
  squares.forEach(square => {
    square.style.opacity = '0' ;
  });
});

