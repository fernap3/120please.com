export class Ripple
{
	private ripple: HTMLElement;
	private rippleFinished: boolean;
	private mouseupHappened = false;
	private mouseupHandler: (evt: MouseEvent) => void;
	private touchendHandler: (evt: TouchEvent) => void;

	/**
	 * Creates a new ripple that starts rippling outward immediately.  Must be called in response to a mousedown event.
	 * @param container The container in which to put the ripple
	 * @param relativeX The x-coord at which to center the ripple, relative to the container bounds
	 * @param relativeY The y-coord at which to center the ripple, relative to the container bounds
	 * @param color The ripple color
	 */
	constructor(container: HTMLElement, relativeX: number, relativeY: number, color: "light" | "dark")
	{
		this.rippleFinished = false;
		this.mouseupHappened = false;
		
		this.ripple = document.createElement("div");
		this.ripple.className = "ripple";
		this.ripple.style.backgroundColor = color === "light" ? "rgba(255,255,255,.2)" : "rgba(0,0,0,.1)";

		const buttonDiagonal = Math.sqrt(container.offsetWidth ** 2 + container.offsetHeight ** 2)
		const rippleWidth = buttonDiagonal * 2;
		const rippleHeight = buttonDiagonal * 2;
		this.ripple.style.width = rippleWidth + "px";
		this.ripple.style.height = rippleHeight + "px";
		this.ripple.style.opacity = "1";

		this.ripple.style.left = relativeX - (rippleWidth / 2) + "px";
		this.ripple.style.top = relativeY - (rippleHeight / 2) + "px";

		this.ripple.style.transform = "scale(0)";
		container.appendChild(this.ripple);

		this.ripple.addEventListener("transitionend", () => {
			this.rippleFinished = true;
			if (this.mouseupHappened)
				this.FadeRipple();
		});

		setTimeout(() => {
			this.ripple.style.transform = "";
		}, 10);

		this.mouseupHandler = evt => this.HandleMouseup();
		this.touchendHandler = evt => this.HandleTouchend();
		document.addEventListener("mouseup", this.mouseupHandler);
		document.addEventListener("touchend", this.touchendHandler);
	}

	private FadeRipple(): void
	{
		this.ripple.style.opacity = "0";
		this.ripple.addEventListener("transitionend", (evt) => { this.ripple.remove(); })
	}

	private HandleMouseup(): void
	{
		this.mouseupHappened = true;
		document.removeEventListener("mouseup", this.mouseupHandler);

		if (this.rippleFinished)
			this.FadeRipple();
	}

	private HandleTouchend(): void
	{
		this.mouseupHappened = true;
		document.removeEventListener("mouseup", this.mouseupHandler);

		if (this.rippleFinished)
			this.FadeRipple();
	}
}