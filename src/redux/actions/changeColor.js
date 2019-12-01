export const CHANGE_COLOR = 'CHANGE_COLOR';

export function changeColor(r, g, b) {
	return { type: CHANGE_COLOR, r: r, g: g, b: b };
}