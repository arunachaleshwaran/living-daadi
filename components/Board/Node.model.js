import edges from './Edge.model'
function findEdge(key) {
	let t = edges.find((i) => i.key === key)
	if (t === undefined) throw Error('Key not found')
	return t;
}
/**
 * R,D,L,U are the 4 edges of the node
 * RR, RL, LL, DU, DD, UU winning logic
 */
let node = [
	{ key: '00', location: { x: 0, y: 0 }, winningLogic: [['R', 'R'], ['D', 'D']], R: { vertex: null, path: findEdge('0003') }, D: { vertex: findEdge('0030'), path: null }, U: { vertex: null, path: null }, L: { vertex: null, path: null } },
	{ key: '03', location: { x: 3, y: 0 }, winningLogic: [['R', 'L'], ['D', 'D']], R: { vertex: null, path: findEdge('0306') }, D: { vertex: findEdge('0313'), path: null }, U: { vertex: null, path: null }, L: { vertex: findEdge('0003'), path: null } },
	{ key: '06', location: { x: 6, y: 0 }, winningLogic: [['L', 'L'], ['D', 'D']], R: { vertex: null, path: null }, D: { vertex: null, path: findEdge('0636') }, U: { vertex: null, path: null }, L: { vertex: findEdge('0306'), path: null } },
	{ key: '11', location: { x: 1, y: 1 }, winningLogic: [['R', 'R'], ['D', 'D']], R: { vertex: null, path: findEdge('1113') }, D: { vertex: null, path: findEdge('1131') }, U: { vertex: null, path: null }, L: { vertex: null, path: null } },
	{ key: '13', location: { x: 3, y: 1 }, winningLogic: [['R', 'L'], ['D', 'U']], R: { vertex: null, path: findEdge('1315') }, D: { vertex: null, path: findEdge('1323') }, U: { vertex: null, path: findEdge('0313') }, L: { vertex: null, path: findEdge('1113') } },
	{ key: '15', location: { x: 5, y: 1 }, winningLogic: [['L', 'L'], ['D', 'D']], R: { vertex: null, path: null }, D: { vertex: null, path: findEdge('1535') }, U: { vertex: null, path: null }, L: { vertex: null, path: findEdge('1315') } },
	{ key: '22', location: { x: 2, y: 2 }, winningLogic: [['R', 'R'], ['D', 'D']], R: { vertex: null, path: findEdge('2223') }, D: { vertex: null, path: findEdge('2232') }, U: { vertex: null, path: null }, L: { vertex: null, path: null } },
	{ key: '23', location: { x: 3, y: 2 }, winningLogic: [['R', 'L'], ['U', 'U']], R: { vertex: null, path: findEdge('2324') }, D: { vertex: null, path: null }, U: { vertex: null, path: findEdge('1323') }, L: { vertex: null, path: findEdge('2223') } },
	{ key: '24', location: { x: 4, y: 2 }, winningLogic: [['L', 'L'], ['D', 'D']], R: { vertex: null, path: null }, D: { vertex: null, path: findEdge('2434') }, U: { vertex: null, path: null }, L: { vertex: null, path: findEdge('2324') } },
	{ key: '30', location: { x: 0, y: 3 }, winningLogic: [['R', 'R'], ['D', 'U']], R: { vertex: null, path: findEdge('3031') }, D: { vertex: null, path: null }, U: { vertex: null, path: findEdge('0030') }, L: { vertex: null, path: findEdge('3060') } },
	{ key: '31', location: { x: 1, y: 3 }, winningLogic: [['R', 'L'], ['D', 'U']], R: { vertex: null, path: findEdge('3132') }, D: { vertex: null, path: findEdge('3151') }, U: { vertex: null, path: findEdge('1131') }, L: { vertex: null, path: findEdge('3031') } },
	{ key: '32', location: { x: 2, y: 3 }, winningLogic: [['L', 'L'], ['D', 'U']], R: { vertex: null, path: null }, D: { vertex: null, path: findEdge('3242') }, U: { vertex: null, path: findEdge('2232') }, L: { vertex: null, path: findEdge('3132') } },
	{ key: '34', location: { x: 4, y: 3 }, winningLogic: [['R', 'R'], ['D', 'U']], R: { vertex: null, path: findEdge('3435') }, D: { vertex: null, path: null }, U: { vertex: null, path: findEdge('2434') }, L: { vertex: null, path: null } },
	{ key: '35', location: { x: 5, y: 3 }, winningLogic: [['R', 'L'], ['D', 'U']], R: { vertex: null, path: findEdge('3536') }, D: { vertex: null, path: findEdge('3555') }, U: { vertex: null, path: findEdge('1535') }, L: { vertex: null, path: findEdge('3435') } },
	{ key: '36', location: { x: 6, y: 3 }, winningLogic: [['L', 'L'], ['D', 'U']], R: { vertex: null, path: null }, D: { vertex: null, path: findEdge('3666') }, U: { vertex: null, path: findEdge('0636') }, L: { vertex: null, path: findEdge('3536') } },
	{ key: '42', location: { x: 2, y: 4 }, winningLogic: [['R', 'R'], ['U', 'U']], R: { vertex: null, path: findEdge('4243') }, D: { vertex: null, path: null }, U: { vertex: null, path: findEdge('3242') }, L: { vertex: null, path: null } },
	{ key: '43', location: { x: 3, y: 4 }, winningLogic: [['R', 'L'], ['D', 'D']], R: { vertex: null, path: findEdge('4344') }, D: { vertex: null, path: findEdge('4353') }, U: { vertex: null, path: null }, L: { vertex: null, path: findEdge('4243') } },
	{ key: '44', location: { x: 4, y: 4 }, winningLogic: [['L', 'L'], ['U', 'U']], R: { vertex: null, path: null }, D: { vertex: null, path: null }, U: { vertex: null, path: findEdge('3151') }, L: { vertex: null, path: findEdge('4344') } },
	{ key: '51', location: { x: 1, y: 5 }, winningLogic: [['R', 'R'], ['U', 'U']], R: { vertex: null, path: findEdge('5153') }, D: { vertex: null, path: null }, U: { vertex: null, path: null }, L: { vertex: null, path: findEdge('5153') } },
	{ key: '53', location: { x: 3, y: 5 }, winningLogic: [['R', 'L'], ['D', 'U']], R: { vertex: null, path: findEdge('5355') }, D: { vertex: null, path: findEdge('5363') }, U: { vertex: null, path: findEdge('4353') }, L: { vertex: null, path: null } },
	{ key: '55', location: { x: 5, y: 5 }, winningLogic: [['L', 'L'], ['U', 'U']], R: { vertex: null, path: null }, D: { vertex: null, path: null }, U: { vertex: null, path: findEdge('3555') }, L: { vertex: null, path: findEdge('5355') } },
	{ key: '60', location: { x: 0, y: 6 }, winningLogic: [['R', 'R'], ['U', 'U']], R: { vertex: null, path: findEdge('6063') }, D: { vertex: null, path: null }, U: { vertex: null, path: findEdge('3060') }, L: { vertex: null, path: findEdge('6366') } },
	{ key: '63', location: { x: 3, y: 6 }, winningLogic: [['R', 'L'], ['U', 'U']], R: { vertex: null, path: findEdge('6366') }, D: { vertex: null, path: null }, U: { vertex: null, path: findEdge('5363') }, L: { vertex: null, path: findEdge('6063') } },
	{ key: '66', location: { x: 6, y: 6 }, winningLogic: [['L', 'L'], ['U', 'U']], R: { vertex: null, path: null }, D: { vertex: null, path: null }, U: { vertex: null, path: findEdge('3666') }, L: { vertex: null, path: null } },
]

function findNode(key) {
	return node.find(node => node.key === key)
}

findNode('00').R.vertex = findNode('03')
findNode('00').D.vertex = findNode('30')
findNode('03').L.vertex = findNode('00')
findNode('03').R.vertex = findNode('06')
findNode('03').D.vertex = findNode('13')
findNode('06').L.vertex = findNode('03')
findNode('06').D.vertex = findNode('36')
findNode('11').R.vertex = findNode('13')
findNode('11').D.vertex = findNode('31')
findNode('13').R.vertex = findNode('15')
findNode('13').L.vertex = findNode('11')
findNode('13').U.vertex = findNode('03')
findNode('13').D.vertex = findNode('23')
findNode('15').L.vertex = findNode('13')
findNode('15').D.vertex = findNode('35')
findNode('22').R.vertex = findNode('23')
findNode('22').D.vertex = findNode('32')
findNode('23').U.vertex = findNode('13')
findNode('23').L.vertex = findNode('22')
findNode('23').R.vertex = findNode('24')
findNode('24').L.vertex = findNode('23')
findNode('24').D.vertex = findNode('34')
findNode('30').U.vertex = findNode('00')
findNode('30').D.vertex = findNode('60')
findNode('30').R.vertex = findNode('31')
findNode('31').L.vertex = findNode('30')
findNode('31').D.vertex = findNode('51')
findNode('31').R.vertex = findNode('32')
findNode('31').U.vertex = findNode('11')
findNode('32').L.vertex = findNode('31')
findNode('32').D.vertex = findNode('42')
findNode('32').U.vertex = findNode('22')
findNode('34').U.vertex = findNode('24')
findNode('34').D.vertex = findNode('44')
findNode('34').R.vertex = findNode('35')
findNode('35').L.vertex = findNode('34')
findNode('35').D.vertex = findNode('55')
findNode('35').U.vertex = findNode('15')
findNode('35').R.vertex = findNode('36')
findNode('36').L.vertex = findNode('35')
findNode('36').D.vertex = findNode('66')
findNode('36').U.vertex = findNode('06')
findNode('42').U.vertex = findNode('32')
findNode('42').R.vertex = findNode('43')
findNode('43').L.vertex = findNode('42')
findNode('43').D.vertex = findNode('53')
findNode('43').R.vertex = findNode('44')
findNode('44').L.vertex = findNode('43')
findNode('44').U.vertex = findNode('34')
findNode('51').U.vertex = findNode('31')
findNode('51').R.vertex = findNode('53')
findNode('53').L.vertex = findNode('51')
findNode('53').U.vertex = findNode('43')
findNode('53').R.vertex = findNode('55')
findNode('53').D.vertex = findNode('63')
findNode('55').L.vertex = findNode('53')
findNode('55').U.vertex = findNode('35')
findNode('60').U.vertex = findNode('30')
findNode('60').R.vertex = findNode('63')
findNode('63').L.vertex = findNode('60')
findNode('63').U.vertex = findNode('53')
findNode('63').R.vertex = findNode('66')
findNode('66').L.vertex = findNode('63')
findNode('66').U.vertex = findNode('36')

export default node