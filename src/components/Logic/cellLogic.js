class Cell {
  // pass in values of true and false to facilitate seing these values
  constructor(value = 0, up, right, down, left, x, y) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.isBomb = value === -1 ? true : false;
    this.up = up;
    this.upRight = up && right;
    this.right = right;
    this.downRight = down && right;
    this.down = down;
    this.downLeft = down && left;
    this.left = left;
    this.upLeft = up && left;
  }

  // setters and getters

  // checkRight() {

  // }
  // checkLeft() {

  // }
  // checkDown() {

  // }
  // checkUp() {

  // }
  // checkRighUp() {

  // }
  // checkLeftUp() {

  // }
  // checkDownRight() {

  // }
  // checkDownLeft() {

  // }
}

module.exports = Cell;
