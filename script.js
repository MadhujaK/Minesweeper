//Create a Cell Object with states bee (present or not) and whether it is revealed or not
//In the main program create a 2D array for a grid and write a function to display it
// Make each element of the 2D array a Cell Object
// 
function Cell (x , y , w) {
  if (random(1) < 0.5) {
    this.bee = true;
  }
  else {
    this.bee = false
  }
  this.revealed = false;
  this.x = x;
  this.y = y;
  this.w = w;
  this.i = floor(x / w);
  this.j = floor(y / w);
  this.neighborCount = 0;
}

Cell.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y ,this.w ,this.w);
  
    if (this.revealed) {
      if(this.bee) {
        fill(127);
        ellipse(this.x+(this.w*0.5) , this.y+(this.w*0.5) , this.w*0.5);
      }
      else {
        fill(190);
        rect(this.x,this.y,this.w,this.w);
        if (this.neighborCount > 0) {
          fill(0);
          text(this.neighborCount, this.x+this.w*0.4, this.y+this.w*0.7);
        }
      }
    }
  }

Cell.prototype.contains = function(x, y) {
  return ((this.x) < x && (this.x + this.w) > x && (this.y) < y && (this.y + this.w) > y);
}

Cell.prototype.reveal = function() {
  this.revealed = true;
}

Cell.prototype.countNeighbors = function() {
  if (this.bee) {
    return -1;
  }
  var total = 0;
  
  //This will cause a problem if your element or neighbour is outside the created grid
  //Hence we use the xoff and yoff
  for (var xoff = -1; xoff <= 1; xoff++) {
    for (var yoff = -1; yoff <= 1; yoff++) {
      var i = this.i + xoff;
      var j = this.j +yoff;
      if (i > -1 && i < rows && j > -1 && j < cols) {
        var neighbor = grid[i][j];
        if (neighbor.bee) {
        total++;
      }
      }
    }
  }
  this.neighborCount = total;
}



function make2DArray(rows,cols) {
  arr = new Array(rows);
    for (var i=0; i < arr.length; i++) {
      arr[i] = new Array(cols);
    }
  return arr;
  }
var rows;
var cols;
var w = 20;
var grid;

function setup() {
  createCanvas(201,201);
  rows = floor(width / w);
  cols = floor(height / w);
  grid = make2DArray(rows,cols);
  
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j] = new Cell(i * w, j * w, w);
    }
  }
  
for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].countNeighbors();
    }
  }

}

function gameOver() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].revealed = true;
    }
  }
}

function mousePressed() {
  for (var i =0; i < rows; i++) {
    for (var j =0; j < cols; j++) {
      if (grid[i][j].contains(mouseX,mouseY)) {
        grid[i][j].reveal();
        
        if (grid[i][j].bee) {
          gameOver();
        }
      }
    }
  }
}

function draw() {
  background(255);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }
}
