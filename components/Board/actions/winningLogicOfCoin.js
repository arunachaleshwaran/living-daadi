import { findEleIndex } from ".";

export const winningLogicOfCoin = (coins, key, isInitial, nodes) => {
	const isCoinPresent = (coins, key) => {
		const i = coins.filter(i => i.node.key === key).length;
		return i === 0 ? false : true;
	}
	const coin = isInitial ? { key, node: nodes[findEleIndex(nodes, key)] } : findEleIndex(coins, key);
	const logics = coin.node.winningLogic;
	if ((isCoinPresent(coins, coin.node[logics[0][0]].vertex.key) && isCoinPresent(coins, coin.node[logics[0][1]].vertex.key))
		|| (isCoinPresent(coins, coin.node[logics[1][0]].vertex.key) && isCoinPresent(coins, coin.node[logics[1][1]].vertex.key))) {
		return true
	}
	return false
}