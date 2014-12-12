/* super inefficient right now, could be improved */
var nc = document.getElementById('nc'),
	nctx = nc.getContext('2d'),
	ncw = nc.width=220,
	nch = nc.height=220,
	rand = function(a, b) {
		return ~~((Math.random() * (b - a + 1)) + a);
	},
	dToR = function(degrees) {
		return degrees * (Math.PI / 180);
	},
	ncircle = {
		x: (ncw / 2),
		y: (nch / 2),
		radius: 50,
		speed: 3,
		rotation: 0,
		angleStart: 270,
		angleEnd: 90,
		hue: 220,
		thickness: 16,
		blur: 40
	},
	particles = [],
	particleMax = 100,
	updateCirclen = function() {
		if (circle.rotation < 360) {
			circle.rotation += circle.speed;
		} else {
			circle.rotation = 0;
		}
	},
	renderCirclen = function() {
		nctx.save();
		nctx.translate(ncircle.x, ncircle.y);
		nctx.rotate(dToR(circle.rotation));
		nctx.beginPath();
		nctx.arc(0, 0, circle.radius, dToR(ncircle.angleStart), dToR(ncircle.angleEnd), true);
		nctx.lineWidth = circle.thickness;
		nctx.strokeStyle = gradient1;
		nctx.stroke();
		nctx.restore();
	},
	renderCircleBordern = function() {
		nctx.save();
		nctx.translate(ncircle.x, ncircle.y);
		nctx.rotate(dToR(ncircle.rotation));
		nctx.beginPath();
		nctx.arc(0, 0, ncircle.radius + (ncircle.thickness / 2), dToR(ncircle.angleStart), dToR(ncircle.angleEnd), true);
		nctx.lineWidth = 2;
		nctx.strokeStyle = gradient2;
		nctx.stroke();
		nctx.restore();
	},
	renderCircleFlaren = function() {
		nctx.save();
		nctx.translate(ncircle.x, ncircle.y);
		nctx.rotate(dToR(ncircle.rotation + 185));
		nctx.scale(1, 1);
		nctx.beginPath();
		nctx.arc(0, ncircle.radius, 30, 0, Math.PI * 2, false);
		nctx.closePath();
		var gradient3 = ctx.createRadialGradient(0, ncircle.radius, 0, 0, ncircle.radius, 30);
		gradient3.addColorStop(0, 'hsla(330, 50%, 50%, .35)');
		gradient3.addColorStop(1, 'hsla(330, 50%, 50%, 0)');
		nctx.fillStyle = gradient3;
		nctx.fill();
		nctx.restore();
	},
	renderCircleFlare2n = function() {
		nctx.save();
		nctx.translate(ncircle.x, ncircle.y);
		nctx.rotate(dToR(ncircle.rotation + 165));
		nctx.scale(1.5, 1);
		nctx.beginPath();
		nctx.arc(0, ncircle.radius, 25, 0, Math.PI * 2, false);
		nctx.closePath();
		var gradient4 = ctx.createRadialGradient(0, ncircle.radius, 0, 0, ncircle.radius, 25);
		gradient4.addColorStop(0, 'hsla(30, 100%, 50%, .2)');
		gradient4.addColorStop(1, 'hsla(30, 100%, 50%, 0)');
		nctx.fillStyle = gradient4;
		nctx.fill();
		nctx.restore();
	},
	createParticlesn = function() {
		if (particles.length < particleMax) {
			particles.push({
				x: (ncircle.x + ncircle.radius * Math.cos(dToR(ncircle.rotation - 85))) + (rand(0, ncircle.thickness * 2) - ncircle.thickness),
				y: (ncircle.y + ncircle.radius * Math.sin(dToR(ncircle.rotation - 85))) + (rand(0, ncircle.thickness * 2) - ncircle.thickness),
				vx: (rand(0, 100) - 50) / 1000,
				vy: (rand(0, 100) - 50) / 1000,
				radius: rand(1, 6) / 2,
				alpha: rand(10, 20) / 100
			});
		}
	},
	updateParticlesn = function() {
		var i = particles.length;
		while (i--) {
			var p = particles[i];
			p.vx += (rand(0, 100) - 50) / 750;
			p.vy += (rand(0, 100) - 50) / 750;
			p.x += p.vx;
			p.y += p.vy;
			p.alpha -= .01;

			if (p.alpha < .02) {
				particles.splice(i, 1)
			}
		}
	},
	renderParticlesn = function() {
		var i = particles.length;
		while (i--) {
			var p = particles[i];
			nctx.beginPath();
			nctx.fillRect(p.x, p.y, p.radius, p.radius);
			nctx.closePath();
			nctx.fillStyle = 'hsla(0, 0%, 100%, ' + p.alpha + ')';
		}
	},
	clearn = function() {
		nctx.globalCompositeOperation = 'destination-out';
		nctx.fillStyle = 'rgba(0, 0, 0, .1)';
		nctx.fillRect(0, 0, ncw, nch);
		nctx.globalCompositeOperation = 'lighter';
	}
loop = function() {
	clearn();
	updateCirclen();
	renderCirclen();
	renderCircleBordern();
	renderCircleFlaren();
	renderCircleFlare2n();
	createParticlesn();
	updateParticlesn();
	renderParticlesn();
}

/* Append Canvas */
//document.body.appendChild(c);

/* Set Constant Properties */
nctx.shadowBlur = ncircle.blur;
nctx.shadowColor = 'hsla(' + ncircle.hue + ', 80%, 60%, 1)';
nctx.lineCap = 'round'

var ngradient1 = nctx.createLinearGradient(0, -ncircle.radius, 0, ncircle.radius);
ngradient1.addColorStop(0, 'hsla(' + ncircle.hue + ', 60%, 50%, .25)');
ngradient1.addColorStop(1, 'hsla(' + ncircle.hue + ', 60%, 50%, 0)');

var ngradient2 = nctx.createLinearGradient(0, -ncircle.radius, 0, ncircle.radius);
ngradient2.addColorStop(0, 'hsla(' + ncircle.hue + ', 100%, 50%, 0)');
ngradient2.addColorStop(.1, 'hsla(' + ncircle.hue + ', 100%, 100%, .7)');
ngradient2.addColorStop(1, 'hsla(' + ncircle.hue + ', 100%, 50%, 0)');

/* Loop It, Loop It Good */
setInterval(loop, 16);