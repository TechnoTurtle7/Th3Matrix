class Utils {
	constructor() {
		if(this instanceof Utils) {
			throw Error("!Failed to instantiate static class: Utils!");
		}
	}
	
	static hslToHex(h, s, l) {
		l /= 100;
		
		const a = s * Math.min(l, 1 - l) / 100;
		const f = (n) => {
			const k = (n + h / 30) % 12;
			const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			
			return Math.round(255 * color).toString(16).padStart(2, '0');
		}
		
		return `#${f(0)}${f(8)}${f(4)}`;
	}
	
	static roundToFactor(num, factor, method) {
		num /= factor;
		
		if(method == "ceil") {
			var x = Math.ceil(num);
			return x * factor;
		}
		else if(method == "floor") {
			var x = Math.floor(num);
			return x * factor;
		}
		else {
			var x = Math.round(num);
			return x * factor;
		}
	}
}