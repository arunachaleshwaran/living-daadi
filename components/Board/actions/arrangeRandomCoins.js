import { winningLogicOfCoin } from './winningLogicOfCoin';

export const arrangeRandomCoins = (setBlackCoins, setWhiteCoins, nodes) => {
	let allIndex = Array(24).fill().map((_, idx) => idx);
	let isWhite = true;
	let wC = []; let bC = [];

	while (wC.length < 9 || bC.length < 9) {
		const num = Math.floor(Math.random() * allIndex.length);
		const index = allIndex[num];
		if (isWhite && wC.length < 9 && !winningLogicOfCoin(wC, nodes[index].key, true, nodes)) {
			allIndex.splice(num, 1);
			wC.push({ key: nodes[index].key, node: nodes[index], completed: false });
		}
		if (!isWhite && bC.length < 9 && !winningLogicOfCoin(bC, nodes[index].key, true, nodes)) {
			allIndex.splice(num, 1);
			bC.push({ key: nodes[index].key, node: nodes[index], completed: false });
		}
		isWhite = !isWhite;
	}
	setBlackCoins(bC);
	setWhiteCoins(wC);
}
