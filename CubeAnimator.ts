import { Animator } from "./Animator.js";

export class CubeAnimator extends Animator
{
	private cssAnimationCube: HTMLElement;
	private rafCube: HTMLElement;
	private speedMultiplier = 1;

	constructor(renderContainer: HTMLElement)
	{
		super(renderContainer);
		
		const cssAnimationCubeWrapper = document.createElement("div");
		cssAnimationCubeWrapper.className = "cube-wrapper--css-animation";
		cssAnimationCubeWrapper.innerHTML = `
		<div class="cube">
			<div class="front"></div>
			<div class="back"></div>
			<div class="top"></div>
			<div class="bottom"></div>
			<div class="left"></div>
			<div class="right"></div>
		</div>`;

		this.cssAnimationCube = cssAnimationCubeWrapper.querySelector(".cube") as HTMLElement;

		const rafCubeWrapper = cssAnimationCubeWrapper.cloneNode(true) as HTMLElement;
		rafCubeWrapper.className = "cube-wrapper--raf";
		this.rafCube = rafCubeWrapper.querySelector(".cube") as HTMLElement;

		this.renderContainer.appendChild(cssAnimationCubeWrapper);
		this.renderContainer.appendChild(rafCubeWrapper);
	}

	public rAFTick(t: number): void
	{
		this.rafCube.style.transform = `translateX(${-((t / 1.5 * this.speedMultiplier)) % 1280}px)`;
		this.rafCube.style.transform = `rotateX(${(t / 1000 * 360 * this.speedMultiplier) % 360}deg) rotateY(${(t / 1000 * 360 * this.speedMultiplier) % 360}deg)`;
	}

	public SetAnimationSpeed(speedMultiplier: number): void
	{
		this.speedMultiplier = speedMultiplier;
		this.cssAnimationCube.style.animationDuration = `${Math.round(1000 * (1 / this.speedMultiplier) * 1)}ms`;
		this.cssAnimationCube.style.animationName = "none";
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				this.cssAnimationCube.style.animationName = "";
			});
		});
	}
}