import { Animator } from "./Animator.js";

export class SonicAnimator extends Animator
{
	private rafContainer: HTMLElement;
	private cssAnimationContainer: HTMLElement;
	private speedMultiplier = 1;

	constructor(renderContainer: HTMLElement)
	{
		super(renderContainer);
		renderContainer.classList.add("test-area--vertical");

		const cssAnimationScrollContainer = document.createElement("div");
		cssAnimationScrollContainer.className = "sonic-scroll";

		this.cssAnimationContainer = document.createElement("div");
		this.cssAnimationContainer.className = "sonic-bknd sonic-bknd--css-animation";
		cssAnimationScrollContainer.appendChild(this.cssAnimationContainer);

		const rafScrollContainer = document.createElement("div");
		rafScrollContainer.className = "sonic-scroll";

		this.rafContainer = document.createElement("div");
		this.rafContainer.className = "sonic-bknd sonic-bknd--raf";
		rafScrollContainer.appendChild(this.rafContainer);
		
		this.renderContainer.appendChild(cssAnimationScrollContainer);
		this.renderContainer.appendChild(rafScrollContainer);
	}

	public rAFTick(t: number): void
	{
		this.rafContainer.style.transform = `translateX(${-((t / 1.5 * this.speedMultiplier)) % 1280}px)`;
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