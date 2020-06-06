import { Animator } from "./Animator.js";
import { SquareSpinAnimator } from "./SquareSpinAnimator.js";
import { RippleButton } from "./RippleButton.js";
import { SonicAnimator } from "./SonicAnimator.js";
import { CubeAnimator } from "./CubeAnimator.js";

const rafHzDisplay = document.querySelector(".raf-fps__hz") as HTMLElement;
let speedMultiplier = 1;
const renderContainer = document.querySelector(".test-area") as HTMLElement;
let animator: Animator = new SquareSpinAnimator(renderContainer);

let slowButton = document.querySelector(".speed-button--slow") as HTMLButtonElement;
let moderateButton = document.querySelector(".speed-button--moderate") as HTMLButtonElement;
let fastButton = document.querySelector(".speed-button--fast") as HTMLButtonElement;
let animationSpinningSquaresButton = document.querySelector(".animation-button--spinning-squares") as HTMLButtonElement;
let animationSonicButton = document.querySelector(".animation-button--sonic") as HTMLButtonElement;
let animationSpinningCubesButton = document.querySelector(".animation-button--spinning-cubes") as HTMLButtonElement;

new RippleButton(slowButton, (evt) => { speedMultiplier = .5; animator.SetAnimationSpeed(speedMultiplier); }, "dark");
new RippleButton(moderateButton, (evt) => { speedMultiplier = 1; animator.SetAnimationSpeed(speedMultiplier); }, "dark");
new RippleButton(fastButton, (evt) => { speedMultiplier = 1.5; animator.SetAnimationSpeed(speedMultiplier); }, "dark");
new RippleButton(animationSpinningSquaresButton, (evt) => { animator = new SquareSpinAnimator(renderContainer); animator.SetAnimationSpeed(speedMultiplier); }, "dark");
new RippleButton(animationSonicButton, (evt) => { animator = new SonicAnimator(renderContainer); animator.SetAnimationSpeed(speedMultiplier); }, "dark");
new RippleButton(animationSpinningCubesButton, (evt) => { animator = new CubeAnimator(renderContainer); animator.SetAnimationSpeed(speedMultiplier); }, "dark");


let lastTime = 0;

const tick: FrameRequestCallback = t => {
	animator.rAFTick(t);
	requestAnimationFrame(tick);
	rafHzDisplay.innerHTML = Math.round(1000 / (t - lastTime)) + "";
	lastTime = t;
};

requestAnimationFrame(tick);
animator.SetAnimationSpeed(speedMultiplier);
