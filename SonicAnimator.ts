import { Animator } from "./Animator.js";

export class SonicAnimator extends Animator
{
	private rafContainer: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private cssAnimationContainer: HTMLElement;
	private speedMultiplier = 1;
	private sonicImage: HTMLImageElement;

	constructor(renderContainer: HTMLElement)
	{
		super(renderContainer);
		renderContainer.classList.add("test-area--vertical");

		const cssAnimationScrollContainer = document.createElement("div");
		cssAnimationScrollContainer.className = "sonic-scroll";

		this.cssAnimationContainer = document.createElement("div");
		this.cssAnimationContainer.className = "sonic-bknd sonic-bknd--css-animation";
		cssAnimationScrollContainer.appendChild(this.cssAnimationContainer);

		this.rafContainer = document.createElement("canvas");
		this.rafContainer.className = "sonic-bknd sonic-bknd--raf";
		this.rafContainer.width = 320;
		this.rafContainer.height = 224;
		this.context = this.rafContainer.getContext("2d", {
			alpha: false,
			desynchronized: true,
		})!;
		
		this.renderContainer.appendChild(cssAnimationScrollContainer);
		this.renderContainer.appendChild(this.rafContainer);

		this.sonicImage = new Image();
		this.sonicImage.src = "images/sonic-bknd.png";
	}

	public rAFTick(t: number): void
	{
		this.context.drawImage(this.sonicImage, -((t / 1.5 * this.speedMultiplier)) % 320, 0);
		this.context.drawImage(this.sonicImage, (-((t / 1.5 * this.speedMultiplier)) % 320) + 320, 0);
		// this.rafContainer.style.transform = `translateX(${-((t / 1.5 * this.speedMultiplier)) % 1280}px)`;
	}

	public SetAnimationSpeed(speedMultiplier: number): void
	{
		this.speedMultiplier = speedMultiplier;
		this.cssAnimationContainer.style.animationDuration = `${Math.round(1000 * (1 / this.speedMultiplier) * 100)}ms`;
		this.cssAnimationContainer.style.animationName = "none";
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				this.cssAnimationContainer.style.animationName = "";
			});
		});
	}
}