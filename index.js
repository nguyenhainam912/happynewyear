const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#e26d6db0", "#e2976db0", "#e2c26db0", "#d7e26db0","#ace26db0","#6de29fb0","#6de2dfb0","#6dbae2b0","#b255eab0","#d40f0f"]
const num = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600]
const num1 = [550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400]

const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}

let particles = []

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function Particle(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.ttl = 200

    this.draw = () => {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }

    this.update = () => {
        this.draw();
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.ttl -=1
    }
}

const particlesCount = 30

function generateCircle() {
    for (let index = 0; index < particlesCount; index++){
        const x = mouse.x
        const y = mouse.y
        const radians = (Math.PI * 2) / particlesCount
        const velocity = {
            x : Math.cos(radians * index),
            y : Math.sin(radians * index) 
        }
        particles.push(
            new Particle(
                x,
                y,
                5,
                randomColor(colors),
                velocity
            )
        )
    }
}

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    particles.forEach((item, index) => {
            if(item.ttl === 0){
                particles.splice(index, 1)
            }
            item.update()
        }
    )

}

window.addEventListener("click", function(event) {
    mouse.x = event.clientX
    mouse.y = event.clientY
    generateCircle()
})

animate()

const btn = document.querySelector(".btn")
const text = document.querySelector(".text")
const audio = document.querySelector(".audio")

btn.addEventListener("click", clickBtn)

function clickBtn() {  
    var number = num[Math.floor(Math.random() * num.length)]
    var number1 = num[Math.floor(Math.random() * num.length)]
    var number2 = num1[Math.floor(Math.random() * num1.length)]
    btn.style.display = "none"
    text.style.display = "block"
    audio.play()
    audio.playbackRate = 2
    for (let index = 0; index < particlesCount; index++){
        const radians = (Math.PI * 2) / particlesCount
        const velocity = {
            x : Math.cos(radians * index),
            y : Math.sin(radians * index) 
        }
        particles.push(
            new Particle(
                number2 - number,
                number2 - number1,
                5,
                randomColor(colors),
                velocity
            )
        )       
    }
    setTimeout(clickBtn, 1000)
    
}













