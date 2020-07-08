import { GetRandomInt, GetRandomFloat } from './utils'
import { Simulation } from './simulation'
import { MagicParams } from './isimobject'

function createDrawCanvas(imageCtx: CanvasRenderingContext2D, width: number, height: number) {
	const updateFrameRate = 60
	const renderFrameRate = 60
	const canvas = document.createElement('canvas')
	document.body.appendChild(canvas)
	if (!canvas) return
	canvas.width = width
	canvas.height = height

	const ctx = canvas.getContext('2d')
	if (!ctx) return
	ctx.imageSmoothingEnabled = true
	ctx.imageSmoothingQuality = 'high'

	const sim = new Simulation(width, height)
	const imageData = imageCtx.getImageData(0, 0, width, height)
	const params = <MagicParams>{
		imageData: imageData,
		phase: 0,
		t: 0,
		d: 0
	};
	setInterval(
		() => { sim.Update(params) },
		1000 / updateFrameRate
	)

	setInterval(
		() => { sim.Draw(ctx) },
		1000 / renderFrameRate
	)
}

function bootstrapper() {
	const width = 400
	const height = 400

	const imageCanvas = document.createElement('canvas')
	document.body.appendChild(imageCanvas)
	imageCanvas.width = width
	imageCanvas.height = height
	const ctx = imageCanvas.getContext('2d')
	if (!ctx) return

	// create an image element to load the jpg on to
	var image = new window.Image()
	if (!image) return
	image.crossOrigin = 'Anonymous'
	image.onload = (e) => {
		ctx.drawImage(image, 0, 0, width, height)
		createDrawCanvas(ctx, width, height)
	}
	const images = ['vg.jpg', 'eiffel.jpg', 'elon.jpg', 'gpe.jpg', 'hokusai.jpg', 'joker.jpg', 'scarjo.jpg', 'lion.jpg', 'dali.jpg']
	image.src = images[GetRandomInt(0, images.length)]
}

bootstrapper()