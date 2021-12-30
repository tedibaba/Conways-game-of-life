//Keeping track of all the grids
gridArray = {};
entities = [];
//In order to find which neighbour can be revived
tempList = [];

function drawGrid(){
    //Initializing variables
    let width = window.innerWidth;
    let height = window.innerHeight;

    let squareSize = 30;
    let numberOfSquaresHorizontal = Math.floor(width / squareSize) - 2;
    let numberOfSquaresVertical  = Math.floor(height / squareSize) -2;


    for (let i = 0; i < numberOfSquaresVertical; i++){
        //Create a row
        let div = document.createElement("div");
        div.setAttribute("class", "row");
        div.setAttribute("id", "row" + i)
        div.style.width = width;
        document.getElementById("board").append(div);
        //Fill row
        for (let j = 0; j < numberOfSquaresHorizontal; ++j){
            let div = document.createElement("div");
            div.setAttribute("class", "dead");
            div.onclick = function() {
                div.setAttribute("class", "entity");
                entities.push(String(i) + "," + String(j));
                gridArray[String(i) + "," + String(j)][1] = true;
            };
            gridArray[String(i) + "," + String(j)] = [];
            gridArray[String(i) + "," + String(j)].push([div , false]);
            document.getElementById("row" + i).append(div); 
        }
    }
}
function playFrame(){
    //Finding neighbours
    if (entities.length != 0){
        for (let box = 0; box < entities.length; box++){
            let div = gridArray[entities[box]];
            let x = parseInt(entities[box][0]);
            let y = parseInt(entities[box][2]);
            let neighbourCount = 0;
            console.log(x + " " +y);
            for(let xx = -1; xx <= 1 ; ++xx){
                for (let yy = -1; yy <= 1; ++yy){
                    if (xx == 0 && yy == 0){
                        //Not a neighbour, your own grid
                        continue;
                    }
                    if (gridArray[String(x + xx) + "," + String(y + yy)][1] == true){
                        //You have a neighbour :O
                        neighbourCount++;
                        console.log(neighbourCount)
                    }

                }
            } 
            //Any live cell with two or three neighbours survives
            if (neighbourCount != 2 || neighbourCount != 3){
                gridArray[String(x + xx) + "," + String(y + yy)][0].setAttribute("class", "dead");
            }
            //Any dead cell with three live neigbours becomes a live cell 

            //All other live ceels die if the generation and other dead cell stay dead
        }
    }
}

//setInterval(playFrame, 100);
drawGrid();

