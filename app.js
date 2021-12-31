//Initializing variables
//Keeping track of all the grids
gridArray = {};
//Form: Square, neighbours
entities = {};
//In order to find which neighbour can be revived
tempList = {};
//Kill list
killList= [];
//Birth list
birthList = [];

let width = window.innerWidth;
let height = window.innerHeight;

let squareSize = 30;
let numberOfSquaresHorizontal = Math.floor(width / squareSize) - 2;
let numberOfSquaresVertical  = Math.floor(height / squareSize) -2;

function drawGrid(){ 
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
                entities[String(i) + "," + String(j)] = 0;
                gridArray[String(i) + "," + String(j)][1] = true;
                console.log(i + " " + j);

            };
            gridArray[String(i) + "," + String(j)] = [];
            gridArray[String(i) + "," + String(j)].push([div , false]);
            console.log(i + " " + j);
            document.getElementById("row" + i).append(div); 
        }
    }
}
function playFrame(){
    tempList = [];
    //Finding neighbours
    if (entities.length != 0){
        for (let [key, value] of Object.entries(entities)){
            let coordSplit = key.split(',')
            let x = parseInt(coordSplit[0]);
            let y = parseInt(coordSplit[1]);
            
            console.log(key);
            //Counting neighbours
            for(let xx = -1; xx <= 1 ; ++xx){
                for (let yy = -1; yy <= 1; ++yy){
                    console.log(y + " " + yy);
                    if (xx + x< 0 || yy+ y < 0 || xx + x > numberOfSquaresHorizontal|| yy + y > numberOfSquaresVertical){
                        continue;
                    }
                    if (!tempList[String(x + xx) + "," + String(y + yy)]){
                        tempList[String(x + xx) + "," + String(y + yy)] = 1;
                    } else{
                        tempList[String(x + xx) + "," + String(y + yy)]++;
                    }
                    if (xx == 0 && yy == 0){
                        //Not a neighbour, your own grid
                        continue;
                    }
                    if (gridArray[String(x + xx) + "," + String(y + yy)][1] == true){
                        //You have a neighbour :O
                        entities[String(x) + "," + String(y)]++;
                    }
                }
            } 
        }
        //Any live cell with two or three neighbours survives
        for (let [key, value] of Object.entries(entities)){
            console.log(value);
            if (value != 2 && value !=  3){
                killList.push(key);
            }
        }

        //Any dead cell with three live neigbours becomes a live cell 
        for (let [key, value] of Object.entries(tempList)){
            if (value == 3){
                birthList.push(key);
                
            }
        }
        //Finding which should die and which should live has been separated so glitches in who should or shouldnt die does not occur
        for (let i = 0; i < killList.length; ++i){
            gridArray[killList[i]][0][0].setAttribute("class", "dead");
            gridArray[killList[i]][1] = false;
            delete entities[killList[i]];
        }

       for (let i = 0; i < birthList.length; ++i){
            gridArray[birthList[i]][0][0].setAttribute("class", "entity");
            entities[birthList[i]] = 0;
            gridArray[birthList[i]][1] = true;
            
        }
        console.log(entities);
        killList = [];
        birthList = [];
    }
}

function startHell(){
    let interval = Number.isInteger(document.getElementById("intervalTime").value) ? document.getElementById("intervalTime").value : 1000;
    setInterval(playFrame, interval);
}

function reset(){
    location.reload();
}
drawGrid();

