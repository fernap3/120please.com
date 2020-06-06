import { Ripple } from "./Ripple.js";

export class RippleButton
{
	private button: HTMLButtonElement;
	private onClick: (evt: MouseEvent | TouchEvent) => void;
	private rippleColor: "light" | "dark";
	private touchHappened = false;

	constructor(button: HTMLButtonElement, onClick: (evt: MouseEvent | TouchEvent) => void, rippleColor: "light" | "dark" = "light")
	{
		this.button = button;
		this.button.classList.add("ripple-button");
		this.button.addEventListener("touchstart", (evt: TouchEvent) => this.OnButtonTouchstart(evt));
		this.button.addEventListener("mousedown", (evt: MouseEvent) => this.OnButtonMousedown(evt));
		this.button.onclick = onClick;
		this.button.ontouchstart = onClick;
		this.rippleColor = rippleColor;

		this.onClick = onClick;
	}

	private OnButtonTouchstart(evt: TouchEvent): void
	{
		evt.preventDefault();
		this.touchHappened = true;
		this.HandleButtonInteraction(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY);
	}

	private OnButtonMousedown(evt: MouseEvent): void
	{
		if (this.touchHappened)
		{
			this.touchHappened = false;
			return;
		}

		evt.preventDefault();
		this.HandleButtonInteraction(evt.clientX, evt.clientY);
	}

	private HandleButtonInteraction(clientX: number, clientY: number): void
	{
		const buttonBounds = this.button.getBoundingClientRect();
		const relativeX = clientX - buttonBounds.left;
		const relativeY = clientY - buttonBounds.top;

		new Ripple(this.button, relativeX, relativeY, this.rippleColor);
	}
}
