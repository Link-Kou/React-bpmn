var M = Math,
    PI = M.PI,
    TWOPI = PI * 2,
    HALFPI = PI / 2,
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = 350,
    height = canvas.height = 350,
    cx = width / 2,
    cy = height / 2,
    count = 40,
    sizeBase = 0.1,
    sizeDiv = 5,
    tick = 0;

ctx.translate(cx, cy);

(function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(-width / 2, -height / 2, width, height);
    ctx.fillStyle = '#fff';
    var angle = tick / 8,
        radius = -50 + M.sin(tick / 15) * 100,
        size;

    for (var i = 0; i < count; i++) {
        angle += PI / 64;
        radius += i / 30;
        size = sizeBase + i / sizeDiv;

        ctx.beginPath();
        ctx.arc(M.cos(angle) * radius, M.sin(angle) * radius, size, 0, TWOPI, false);
        ctx.fillStyle = 'hsl(200, 70%, 50%)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(M.cos(angle) * -radius, M.sin(angle) * -radius, size, 0, TWOPI, false);
        ctx.fillStyle = 'hsl(320, 70%, 50%)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(M.cos(angle + HALFPI) * radius, M.sin(angle + HALFPI) * radius, size, 0, TWOPI, false);
        ctx.fillStyle = 'hsl(60, 70%, 50%)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(M.cos(angle + HALFPI) * -radius, M.sin(angle + HALFPI) * -radius, size, 0, TWOPI);
        ctx.fillStyle = 'hsl(0, 0%, 100%)';
        ctx.fill();
    }

    tick++;
})();

document.body.appendChild(canvas);
