function drawGrid(){
    //Initializing variables
    let width = window.innerWidth;
    let height = window.innerHeight;

    let canvas = document.getElementById("board");
    canvas.width = width;
    canvas.height = height;
    let squareSize = 30;
    let numberOfSquaresHorizontal = Math.floor(width / squareSize) - 2;
    let numberOfSquaresVertical  = Math.floor(height / squareSize) -2;
    let paddingHorizontal = width - numberOfSquaresHorizontal * squareSize;
    let paddingVertical = height - numberOfSquaresVertical * squareSize;
    let paddingLeft = paddingHorizontal / 2; 
    let paddingRight = paddingHorizontal / 2;
    let paddingUp = paddingVertical / 2;
    let paddingDown = paddingVertical / 2;
    let ctx = canvas.getContext("2d");
   
    ctx.clearRect(0,0, width, height);


    ctx.strokeStyle = "lightgrey";
    ctx.beginPath();

    //Drawing the grid
    for (let i = paddingLeft; i <= width - paddingRight; i += squareSize){
        ctx.moveTo(i, paddingUp);
        ctx.lineTo(i,  height - paddingDown); 
        
    }

    for (let j  = paddingUp; j <= height - paddingDown; j+= squareSize){
        ctx.moveTo(paddingLeft, j);
        ctx.lineTo(width - paddingRight, j);
    }

    ctx.stroke();
}

setInterval(drawGrid, 100);


