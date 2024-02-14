export default class Rectangle {
    constructor(x, y, w, h, vx, vy) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
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
        return (point.x >= this.x &&
            point.x < this.x + this.w &&
            point.y >= this.y &&
            point.y < this.y + this.h)
    }

    intersects(rect) {
        return (this.x < rect.x + rect.w)
            && (rect.x < this.x + this.w)
            && (this.y < rect.y + rect.h)
            && (rect.y < this.y + this.w)
    }

    intersectsCircle(circle)
    {
        let closestX = Math.max(this.x, Math.min(circle.x, this.x + this.w));
        let closestY = Math.max(this.y, Math.min(circle.y, this.y + this.h));

        let distanceX = circle.x - closestX;
        let distanceY = circle.y - closestY;

        return (distanceX * distanceX + distanceY * distanceY) < (circle.r * circle.r);
    }

    
}