var canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var ctx = canvas.getContext("2d");

const gravity = 2;
var colorArray = ["#23303B", "#385D84", "#AED3F2", "#F2F2F2", "#E77557"];

let mouse = {
     x: innerWidth / 2,
     y: innerHeight / 2,
};

// Utility Functions

function RandomIntFromRange(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
}

function RandomColor(colors) {
     return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
     let xDistance = x2 - x1;
     let yDistance = y2 - y1;

     return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

addEventListener("resize", function () {
     canvas.width = document.innerWidth;
     canvas.height = document.innerHeight;

     init();
});

addEventListener("mousemove", function (event) {
     mouse.x = event.clientX;
     mouse.y = event.clientY;
});

function Particle(x, y, radius, color) {
     this.x = x;
     this.y = y;
     this.color = color;
     this.radius = radius;

     this.draw = function () {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
          ctx.strokeStyle = this.color;
          ctx.stroke();
          ctx.closePath();
     };

     this.update = function () {
          this.draw();
     };
}

let particles = [];

function init() {
     for (let i = 0; i < 100; i++) {
          const radius = 10;
          let x = RandomIntFromRange(radius, canvas.width - radius);
          let y = RandomIntFromRange(radius, canvas.height - radius);
          const color = "blue";

          if (i !== 0) {
               for (let j = 0; j < particles.length; j++) {
                    if (
                         distance(x, y, particles[j].x, particles[j].y) -
                              radius * 2 <
                         0
                    ) {
                         x = RandomIntFromRange(radius, canvas.width - radius);
                         y = RandomIntFromRange(radius, canvas.height - radius);

                         j = -1;
                    }
               }
          }

          particles.push(new Particle(x, y, radius, color));
     }
}

function animate() {
     window.requestAnimationFrame(animate);
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     for (let i = 0; i < particles.length; i++) {
          particles[i].update();
     }
}

init();
animate();
