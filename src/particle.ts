import { GetRandomFloat, GetRandomInt, FromPolar, ToLuma, Clamp } from './utils'
import { ISimObject, MagicParams } from './isimobject'

// Particle Constants
const MaxParticleSize = 6
const MinParticleSize = 1
////////////////////////////////////

export class Particle implements ISimObject {
	x = 0; y = 0; // location of this particle
	speed = 0; theta = 0 // describes the velocity

	radius = MinParticleSize // size of the particle
	ttl = 500 // how much time left to live
	lifetime = 500 // how long this particle will live

	alpha = 1.0
	color = 'black'

	constructor(private w: number, private h: number, private palette: string[]) {
		this.reset()
	}

	reset() {
		this.x = GetRandomFloat(0, this.w)
		this.y = GetRandomFloat(0, this.h)

		this.speed = GetRandomFloat(0, 3.0)
		this.theta = GetRandomFloat(0, 2 * Math.PI)

		this.radius = 0

		this.color = 'black'
		if (GetRandomFloat(0, 1) > 0.1) {
			this.color = this.palette[GetRandomInt(1, this.palette.length)]
		}

		this.ttl = this.lifetime = GetRandomInt(50, 100)
	}

	imageComplementLuma(imageData: ImageData): number {
		const p = Math.floor(this.x) + Math.floor(this.y) * imageData.width
		// ImageData contains RGBA values
		const i = Math.floor(p * 4)
		const r = imageData.data[i + 0]
		const g = imageData.data[i + 1]
		const b = imageData.data[i + 2]

		const luma = ToLuma(r, g, b) // 0 -> 255
		// luma is higher for lighter pixel
		const ln = 1 - luma / 255.0 // complement; higher ln means darker
		return ln
	}

	Update(params: MagicParams) {

		// compute the delta change
		let dRadius = GetRandomFloat(-MaxParticleSize / 5, MaxParticleSize / 5)
		const i = params.index
		const r = params.phase
		const d = params.d
		const t = params.t
		this.x = Math.cos(r + Math.sin(r + this.x * d - t)) * i + this.w / 2;
		this.y = Math.sin(r - Math.cos(r - this.y * d + t)) * i + this.h / 2;

		// ---
		// this.x = Clamp(0, this.w - 1, this.x)
		// this.y = Clamp(0, this.h - 1, this.y)
		const ln = this.imageComplementLuma(params.imageData)
		const lt = (this.lifetime - this.ttl) / this.lifetime

		let f = ln
		this.alpha = ln

		this.radius += dRadius
		this.radius = Clamp(MinParticleSize, MaxParticleSize, this.radius) * f
		if (this.speed < 1.0) {
			this.radius = 0.1
		}
		// manage particle lifetime
		this.ttl += -1
		if (this.ttl == 0) {
			this.reset()
		}
	}

	Draw(ctx: CanvasRenderingContext2D) {
		ctx.save()
		this.experiment1(ctx)
		ctx.restore()
	}

	experiment1(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = this.color
		ctx.globalAlpha = this.alpha
		let circle = new Path2D()
		circle.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
		ctx.fill(circle)
	}

}
