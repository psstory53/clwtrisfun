const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Constants
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_RADIUS = 10;
const PADDLE_SPEED = 5;
const BALL_SPEED = 5;

// Paddle objects
let paddle1 = {
    x: 20,
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    dy: 0,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT
};

let paddle2 = {
    x: WIDTH - 20 - PADDLE_WIDTH,
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    dy: 0,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT
};

// Ball object
let ball = {
    x: WIDTH / 2,
    y: HEIGHT / 2,
    dx: BALL_SPEED,
    dy: BALL_SPEED,
    radius: BALL_RADIUS
};

// Draw paddles
function drawPaddle(paddle) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

// Update game objects
function update() {
    // Move paddles
    paddle1.y += paddle1.dy;
    paddle2.y += paddle2.dy;

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > HEIGHT) {
        ball.dy = -ball.dy;
    }

    // Ball collision with paddles
    if (
        ball.x - ball.radius < paddle1.x + paddle1.width &&
        ball.y > paddle1.y &&
        ball.y < paddle1.y + paddle1.height
    ) {
        ball.dx = -ball.dx;
    }
    if (
        ball.x + ball.radius > paddle2.x &&
        ball.y > paddle2.y &&
        ball.y < paddle2.y + paddle2.height
    ) {
        ball.dx = -ball.dx;
    }

    // Reset ball if it goes past paddle
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > WIDTH) {
        ball.x = WIDTH / 2;
        ball.y = HEIGHT / 2;
        ball.dx = BALL_SPEED;
        ball.dy = BALL_SPEED;
    }
}

// Render the game
function render() {
    // Clear canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw paddles
    drawPaddle(paddle1);
    drawPaddle(paddle2);

    // Draw ball
    drawBall();
}

// Main game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Keyboard event listeners
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        paddle2.dy = -PADDLE_SPEED;
    } else if (event.key === "ArrowDown") {
        paddle2.dy = PADDLE_SPEED;
    } else if (event.key === "w") {
        paddle1.dy = -PADDLE_SPEED;
    } else if (event.key === "s") {
        paddle1.dy = PADDLE_SPEED;
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        paddle2.dy = 0;
    } else if (event.key === "w" || event.key === "s") {
        paddle1.dy = 0;
    }
});

// Start the game loop
gameLoop();

