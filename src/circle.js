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

        const thisAABB = {
            left: this.left,
            right: this.right,
            top: this.y - this.r,
            bottom: this.y + this.r
        };


        context.strokeStyle = 'red'; 
        context.strokeRect(thisAABB.left, thisAABB.top, thisAABB.right - thisAABB.left, thisAABB.bottom - thisAABB.top); 
    }

    get left() {
        return this.x - this.r
    }

    get right() {
        return this.x + this.r
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

    intersectsShape(otherTriangle) {
        const thisAABB = {
            left: this.left,
            right: this.right,
            top: this.y - this.r,
            bottom: this.y + this.r
        };

        const otherAABB = {
            left: otherTriangle.left,
            right: otherTriangle.right,
            top: otherTriangle.y - otherTriangle.s,
            bottom: otherTriangle.y + otherTriangle.s
        };

        const horizontalOverlap = thisAABB.right > otherAABB.left && thisAABB.left < otherAABB.right;

        const verticalOverlap = thisAABB.bottom > otherAABB.top && thisAABB.top < otherAABB.bottom;

        return horizontalOverlap && verticalOverlap;
    }


    
}