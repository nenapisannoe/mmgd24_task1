export default class Circle {
    constructor(x, y, r, vx, vy) {
        this.x = x
        this.y = y
        this.r = r
        this.vx = vx
        this.vy = vy
    }

    get left() {
        return this.x
    }

    get right() {
        return this.x + this.w
    }

    get top() {
        return this.y
    }

    get bottom() {
        return this.y + this.h
    }

    contains(point) {
        //TODO
    }

    intersects(otherCircle) {
        const distance = Math.sqrt(Math.pow(this.x - otherCircle.x, 2) + Math.pow(this.y - otherCircle.y, 2));
        return distance < this.r + otherCircle.r;
    }

    
}