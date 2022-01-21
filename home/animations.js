function startAnimations() {
	codeRain();
}

function codeRain() {
	const canvas = document.getElementById("code-rain");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight * 0.9;
	
	const ctx = canvas.getContext("2d");

	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	class Drop {
		constructor(startX, startY, startTrail) {
			this.x = startX;
			this.y = startY;
			this.trail = startTrail;
		}

		draw() {
			ctx.font = `${canvas.height / 64}px Arial`;

			var index = 0;
			this.trail.forEach((item) => {
				var tempColor = ctx.fillStyle;
				if(index == 0) {
					ctx.fillStyle = "#FFFFFF";
				}
				
				ctx.fillText(item, this.x, this.y - index * (canvas.height / 64));
				index++;
				
				ctx.fillStyle = tempColor;
			});
		}

		fall() {
			this.y += canvas.height / 64;

			if (this.y >= canvas.height + (canvas.height / 64) * 8) {
				this.x = Utils.roundToFactor(Math.random() * canvas.width, canvas.height / 64, "round");
				this.y = Math.random() * -canvas.height * 1.5;
			}

			this.trail.unshift(`${Math.round(Math.random())}`);
			this.trail.pop();

			this.draw();
		}
	}

	var drops = [];

	for (var i = 0; i < 500; i++) {
		drops.push(new Drop(
			Utils.roundToFactor(Math.random() * canvas.width, canvas.height / 64, "round"), 
			Math.random() * -canvas.height * 1.5, 
			[
			`${Math.round(Math.random())}`,
			`${Math.round(Math.random())}`,
			`${Math.round(Math.random())}`,
			`${Math.round(Math.random())}`,
			`${Math.round(Math.random())}`,
			`${Math.round(Math.random())}`,
			`${Math.round(Math.random())}`,
			`${Math.round(Math.random())}`
		]));
	}
	
	var rainColor = 0;

	setInterval(() => {
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = Utils.hslToHex(rainColor, 100, 40);
		drops.forEach((drop) => {
			drop.fall();
		})
	}, 100);
	
	setInterval(() => {
		rainColor++;
		if(rainColor == 361) {
			rainColor = 0;
		}
	}, 50);
}