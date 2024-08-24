//Variables//
const screen = document.querySelector('.screen');
const setSizeButton = document.querySelector('#set-size');
const eraseButton = document.querySelector('#erase');
const randomColorButton = document.querySelector('#rainbow-mode');
const colorSelector = document.querySelector('#color-selector');
let numberOfSquares = 16;
let colorMode = 'rainbow';



//functions//

function getSelectedColor() {
    const { r, g, b } = hexToRgb(colorSelector.value);
    return 'rgba(' + r + ',' + g + ',' + b + ',';
}
function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}
function getOpacityFromRGBA(rgba) {
    const match = rgba.match(/rgba?\((\d+), (\d+), (\d+), ([\d.]+)\)/);
    return match ? parseFloat(match[4]) : null;
}
function getRandomColor() {
    const red = Math.random() * 255;
    const green = Math.random() * 255;
    const blue = Math.random() * 255;
    return 'rgba(' + red + ',' + green + ',' + blue + ',';

}
function setScreen(numberOfSquares, colorMode) {
    screen.innerHTML = ''
    for (let i = 0; i < numberOfSquares * numberOfSquares; i++) {
        const div = document.createElement('div');
        div.style.border = '1px solid rgba(0,0,0,0)';
        let squareSize = (600 - numberOfSquares * 2) / numberOfSquares + 'px';
        div.style.width = squareSize;
        div.style.height = div.style.width;
        let color;
        if (colorMode == 'rainbow') {
            color = getRandomColor();
        }
        else if (colorMode === 'singleColor'){
            color = getSelectedColor();
        }
        div.style.backgroundColor = color + '0)';
        div.className = 'square';
        div.addEventListener('mouseenter', () => {
            currentColor = div.style.backgroundColor;
            let currentOpacity = getOpacityFromRGBA(currentColor);
            if (currentOpacity == null) {
                currentOpacity = 1;
            }
            else {
                currentOpacity += 0.2;
            }
            let newColor = color + currentOpacity + ')';
            div.style.backgroundColor = newColor;

        });
        screen.append(div)
    }
}
setScreen(numberOfSquares, colorMode);

randomColorButton.addEventListener('click', () => {setScreen(numberOfSquares, 'rainbow')});
colorSelector.addEventListener('change', () => {
    setScreen(numberOfSquares,'singleColor');
    colorSelector.style.backgroundColor = colorSelector.value;


});



eraseButton.addEventListener('click', () => {
    squares = document.querySelectorAll('.square');
    squares.forEach(element => element.style.backgroundColor = 'rgba(255,0,0,0)');
})

setSizeButton.addEventListener('click', () => {
    numberOfSquares = prompt('set number of squares per side');
    setScreen(numberOfSquares);
})


