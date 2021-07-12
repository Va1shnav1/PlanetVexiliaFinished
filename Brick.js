class Brick{
    constructor(x,y){
        var options={
            restitution:0.4,
            friction:0,
            density:0.1
        }
        this.body=Bodies.rectangle(x,y,60, 30,options);
        World.add(world, this.body);
        
    }
    display(){
        push()
        translate(this.body.position.x,this.body.position.y)
        fill("blue");
        rotate(this.body.angle)
        rectMode(CENTER)
        rect(0, 0, 60, 30)
        pop();
    }
}