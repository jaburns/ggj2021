import { vec2 } from 'gl-matrix';


export class GameObject {

    public position: vec2;
    public velocity: vec2;

    public rotation: number = 0;
    public scale: number = 0;

    public drawOrder: number = 0;

    public sprite: HTMLImageElement;
    constructor() {

    }

    update(deltaTime: number) {
        //this.position += this.velocity;

    }

    render(ctx: CanvasRenderingContext2D) {
        let cx = this.sprite.width / 2;
        let cy = this.sprite.height / 2;
        let cos = Math.cos(this.rotation), sin = Math.sin(this.rotation);

        ctx.setTransform(
            this.scale * cos,
            this.scale * sin,
            this.scale * -sin,
            this.scale * cos,
            this.position[0],
            this.position[1]
        );

        ctx.drawImage(this.sprite, -cx, -cy, this.sprite.width, this.sprite.height)
        ctx.setTransform(1, 0, 0, 1, 0, 0);

    }


}