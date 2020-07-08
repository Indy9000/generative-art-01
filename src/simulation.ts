import { ISimObject, MagicParams } from './isimobject'
import { Particle } from './particle'
import { ColorPalettes, ParticleCount } from './sim-constants'
import { GetRandomInt } from './utils'

export class Simulation implements ISimObject {
	particles: Particle[] = []
	palette: string[] = []
	constructor(private width: number, private height: number) {
		// select a random palette
		this.palette = ColorPalettes[GetRandomInt(0, ColorPalettes.length)]
		// create particles
		for (let i = 0; i < ParticleCount; i++) {
			this.particles.push(
				new Particle(this.width, this.height, this.palette)
			)
		}
	}

	dt = 1 / Math.pow(10, GetRandomInt(1, 5))
	dd = 1 / Math.pow(10, GetRandomInt(1, 5))
	Update(params: MagicParams) {
		params.phase += Math.PI / 256
		params.t += this.dt
		params.d = this.dd
		// Update particles
		this.particles.forEach((p, i) => {
			params.index = i
			p.Update(params)
		})
	}

	init = false
	Draw(ctx: CanvasRenderingContext2D) {
		// Draw background
		if (!this.init) {
			ctx.fillStyle = this.palette[0]
			ctx.fillRect(0, 0, this.width, this.height)
			this.init = true
		}

		// Draw particles
		this.particles.forEach(p => p.Draw(ctx))
	}
}