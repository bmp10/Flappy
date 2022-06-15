let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let flappy = 250;
let flappysize = 50;
let vel = 10;

let pipewidth = 100;
let pipegap = 200;

class Pipe {
    constructor(width, height, x, gap) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.gap = gap;
    }

    check() {
        //x check
        if (this.x <= 100 + flappysize && this.x + this.width >= 100) {
            //y check
            if (flappy + flappysize >= canvas.height - this.height || flappy <= canvas.height - (this.height + this.gap)) {
                return true
            }
        }
    }

    fix() {
        if (this.x < -this.width) {
            this.x = canvas.width;
            this.height = Math.random() * (canvas.height - 300) + 100;
        }
    }

    draw() {
        ctx.fillStyle = 'gray';

        ctx.beginPath();
        ctx.rect(this.x, 0, this.width, canvas.height - (this.height + this.gap));
        ctx.fill();

        ctx.beginPath();
        ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
        ctx.fill();
    }

    update() {
        this.x -= 10;

        this.fix();
        this.draw();
        return this.check();
    }
}

let pipes = [new Pipe(100, 200, 1000, pipegap)];

document.addEventListener("keydown", function(e) {
    if (e.key == ' ') vel = 5;
})

function ani() {
    let crash = false;

    flappy -= vel;

    vel -= 0.2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pipes.forEach(function(pipe) {
        if (pipe.update()) {
            crash = true;
        }
    })

    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.rect(0, canvas.height - 100, canvas.width, 100);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#EEAA00';
    ctx.rect(100, flappy, flappysize, flappysize);
    ctx.fill();

    if (flappy > canvas.height - 100 - flappysize || crash) return

    requestAnimationFrame(ani);
}

ani()