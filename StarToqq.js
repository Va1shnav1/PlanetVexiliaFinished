class StarToqq{
    constructor(x,y){
        var options={
            restitution:0.4,
            friction:0,
            density:0.1
        }
        this.body=Bodies.circle(x,y,30,options);
        World.add(world, this.body);
    }
    display(){
        push()
        translate(this.body.position.x,this.body.position.y)
        fill("orange");
        rotate(this.body.angle)
        ellipseMode(RADIUS);
        ellipse(0, 0, 30, 30);
        pop();
    }
}