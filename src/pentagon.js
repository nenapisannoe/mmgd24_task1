export default class Pentagon {
    constructor(s, x, y, vx, vy) {
        this.s = s
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.hits = 0
        this.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
    }


    draw(context) {

        const vertices = [];
        const numVertices = 5;
        for (let i = 0; i < numVertices; i++) {
            const angle = (Math.PI * 2 / numVertices) * i;
            const vertexX = this.x + this.s * Math.cos(angle);
            const vertexY = this.y + this.s * Math.sin(angle);
            vertices.push({ x: vertexX, y: vertexY });
        }

        context.beginPath();
        context.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 1; i < vertices.length; i++) {
            context.lineTo(vertices[i].x, vertices[i].y);
        }
        context.closePath(); 

        context.fillStyle = this.color;
        context.fill();
    }

    get left() {
        return this.x - (this.s / 2)
    }

    intersects(otherPentagon) {
        const thisAABB = {
            left: this.left,
            right: this.left + this.s,
            top: this.y - this.s,
            bottom: this.y + this.s
        };

        const otherAABB = {
            left: otherPentagon.left,
            right: otherPentagon.left + otherPentagon.s,
            top: otherPentagon.y - otherPentagon.s,
            bottom: otherPentagon.y + otherPentagon.s
        };

        const horizontalOverlap = thisAABB.right > otherAABB.left && thisAABB.left < otherAABB.right;

        const verticalOverlap = thisAABB.bottom > otherAABB.top && thisAABB.top < otherAABB.bottom;

        return horizontalOverlap && verticalOverlap;
    }
}