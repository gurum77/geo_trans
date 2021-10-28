export default class Point{
    constructor(){
        this.x = 0;
        this.y = 0;

    }
    Point(x, y) {
        this.x = x;
        this.y = y;
      }
    x;
    y;


    /**
     * this - other
     * @param other {Point}
     *  */
    sub(other){
        return new Point(x - other.x, y - other.y);
    }
}