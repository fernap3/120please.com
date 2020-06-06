import { Animator } from "./Animator.js";

export class SquareSpinAnimator extends Animator
{
	private cssAnimationSquare: HTMLElement;
	private rafSquare: HTMLElement;
	private speedMultiplier = 1;
	
	constructor(renderContainer: HTMLElement)
	{
		super(renderContainer);

		this.cssAnimationSquare = document.createElement("div");
		this.cssAnimationSquare.className = "test-square test-square--css-animation";

		for (let i = 0; i < 4; i++)
		{
			const block = document.createElement("div");
			block.className = "test-square__block";
			this.cssAnimationSquare.appendChild(block);
		}

		renderContainer.appendChild(this.cssAnimationSquare);

		this.rafSquare = document.createElement("div");
		this.rafSquare.className = "test-square test-square--css-raf";

		for (let i = 0; i < 4; i++)
		{
			const block = document.createElement("div");
			block.className = "test-square__block";
			this.rafSquare.appendChild(block);
		}

		renderContainer.appendChild(this.rafSquare);
	}

	public rAFTick(t: number): void
	{
		this.rafSquare.style.transform = `rotate(${(t / 1000 * 360 * this.speedMultiplier) % 360}deg)`;
	}

	public SetAnimationSpeed(speedMultiplier: number): void
	{
		this.speedMultiplier = speedMultiplier;
		this.cssAnimationSquare.style.animationDuration = `${Math.round(1000 * (1 / this.speedMultiplier))}ms`;
		this.cssAnimationSquare.style.animationName = "none";
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				this.cssAnimationSquare.style.animationName = "";
			});
		});
	}
}
