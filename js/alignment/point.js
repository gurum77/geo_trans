export default class Point {
    constructor() {
        this.x = 0;
        this.y = 0;

    }
    /**
     * string으로 x, y를 취함
     * @param {string} str 
     */
    fromString(str) {
        let arr = str.split(",");
        if (arr.length < 2)
            return;
        this.x = arr[0];
        this.y = arr[1];
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
    sub(other) {
        return new Point(x - other.x, y - other.y);
    }
}