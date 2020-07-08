// Utility Functions
// GetRandomFloat returns a random floating point number
// in a given range
export function GetRandomFloat(min: number, max: number): number {
	return Math.random() * (max - min) + min
}

// GetRandomInt returns a random integer
// in a given range
export function GetRandomInt(min: number, max: number): number {
	return Math.floor(GetRandomFloat(min, max))
}

// FromPolar returns the catesian co-ordinates for a
// given polar co-ordinate
export function FromPolar(v: number, theta: number) {
	return [v * Math.cos(theta), v * Math.sin(theta)]
}

export function ToLuma(r: number, g: number, b: number): number {
	return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Clamp makes sure the value stays in the range min,max
export function Clamp(min: number, max: number, value: number): number {
	return value > max ? max : (value < min ? min : value)
}

export function GetRandomFloatArray(min: number, max: number, length: number): Array<number> {
	let r = new Array<number>(length)
	for (let i = 0; i < length; i++) {
		r[i] = GetRandomFloat(min, max)
	}
	return r
}