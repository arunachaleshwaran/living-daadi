export const MOVE_STATE = {
	CAN_MOVE: Symbol('can move'),
	CAN_NOT_MOVE: Symbol('can not move'),
	DEFAULT: Symbol('not active')
}
export const LEFT_DROP = { key: 'LD', location: { x: 7, y: -.5 }, R: { vertex: null, path: null }, D: { vertex: null, path: null }, U: { vertex: null, path: null }, L: { vertex: null, path: null } }
export const RIGHT_DROP = { key: 'RD', location: { x: 7, y: 6.5 }, R: { vertex: null, path: null }, D: { vertex: null, path: null }, U: { vertex: null, path: null }, L: { vertex: null, path: null } }