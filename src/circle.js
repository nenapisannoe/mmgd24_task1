export default class Circle {
    constructor(x, y, r, vx, vy) {
        this.x = x
        this.y = y
        this.r = r
        this.vx = vx
        this.vy = vy
        this.hits = 0
        this.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
    }

    draw(context)
    {
        if(this.hits >= 3)
            return;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
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

    newColor() {
        this.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
    }

    contains(point) {
        //TODO
    }

    intersects(otherCircle) {
        const distance = Math.sqrt(Math.pow(this.x - otherCircle.x, 2) + Math.pow(this.y - otherCircle.y, 2));
        return distance < this.r + otherCircle.r;
    }

    
}