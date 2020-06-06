export abstract class Animator
{
	constructor (public renderContainer: HTMLElement)
	{
		renderContainer.innerHTML = "";
		renderContainer.classList.remove("test-area--vertical");
	}

	abstract rAFTick(t: number): void;
	abstract SetAnimationSpeed(speedMultiplier: number): void;
}