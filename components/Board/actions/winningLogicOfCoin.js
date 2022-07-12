import { findEle } from ".";

const isCoinPresent = (coins, key) => {
	const i = coins.filter(i => i.node.key === key).length;
	return i === 0 ? false : true;
}
export const winningLogicOfCoin = (coins, key, isInitial, nodes) => {
	const coin = isInitial ? { key, node: findEle(nodes, key) } : findEle(coins, key);
	const logics = coin.node.winningLogic;
	if ((isCoinPresent(coins, coin.node[logics[0][0]].vertex.key) && isCoinPresent(coins, coin.node[logics[0][1]].vertex.key))
		|| (isCoinPresent(coins, coin.node[logics[1][0]].vertex.key) && isCoinPresent(coins, coin.node[logics[1][1]].vertex.key))) {
		return true
	}
	return false
}