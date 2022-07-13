import Node from './Node'
import Edge from './Edge'
import { Box } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import CenterSquare from '../CenterSquare'
import Coins from './Coins'
import nodes from './Node.model'
import edges from './Edge.model'
import { arrangeRandomCoins, findEle, winningLogicOfCoin } from './actions'
import { CAN_MOVE, CAN_NOT_MOVE, NOT_ACTIVE } from './constant'
export default function Board() {
	const [size, setSize] = useState(10)
	const [whiteCoins, setWhiteCoins] = useState([]);
	const [blackCoins, setBlackCoins] = useState([]);
	const board = useRef({ current: null })
	const [clickNodeState, setClickNodeState] = useState({ isWhite: true, key: null })
	const isNodeDisabled = (key) => {
		if (!clickNodeState.key) return true
		const node = findEle(clickNodeState.isWhite ? whiteCoins : blackCoins, clickNodeState.key).node;
		if (node.R.vertex?.key === key || node.D.vertex?.key === key || node.L.vertex?.key === key || node.U.vertex?.key === key)
			return false
		return true
	}
	const isCoinDisabled = (color, key) => {
		if (clickNodeState.key === key) return false;
		if (clickNodeState.key) return true;
		if (color === 'WHITE') {
			return !clickNodeState.isWhite
		}
		if (color === 'BLACK') {
			return clickNodeState.isWhite
		}
		return true;
	}
	const clickCoin = (key) => {
		if (key === clickNodeState.key) {
			setClickNodeState(() => ({ isWhite: clickNodeState.isWhite, key: null }))
			return;
		}
		setClickNodeState(() => ({ isWhite: clickNodeState.isWhite, key }))
	}
	const removeCoin = (key, isWhite, winBy) => {
		let coins = isWhite ? whiteCoins : blackCoins;
		const matchElementId = (key) => coins.findIndex(i => i.node.key === key)
		const node = findEle(coins, key).node;
		const win = coins[coins.findIndex(i => i.key === key)].node.winningLogic[winBy];
		let index = findEle(coins, key, { returnIndex: true });
		coins.splice(index, 1);
		if (win[0] === win[1]) {
			index = matchElementId(node[win[0]].vertex[win[0]].vertex.key);
			coins.splice(index, 1);
			index = matchElementId(node[win[0]].vertex.key);
			coins.splice(index, 1);
		} else {
			index = matchElementId(node[win[0]].vertex.key);
			coins.splice(index, 1);
			index = matchElementId(node[win[1]].vertex.key);
			coins.splice(index, 1);
		}
		if (isWhite) {
			setWhiteCoins(coins);
		} else {
			setBlackCoins(coins);
		}
	}
	const clickNode = (key) => {
		const node = findEle(nodes, key);
		const isWhite = clickNodeState.isWhite
		if (isWhite) {
			findEle(whiteCoins, clickNodeState.key).node = node;
			setWhiteCoins(() => [...whiteCoins]);
		} else {
			findEle(blackCoins, clickNodeState.key).node = node;
			setBlackCoins(() => [...blackCoins])
		}
		setClickNodeState(() => ({ isWhite: !isWhite, key: null }))
		const coins = isWhite ? whiteCoins : blackCoins;
		const winBy = winningLogicOfCoin(coins, clickNodeState.key, false, nodes)
		if (winBy) {
			setTimeout(() => {
				removeCoin(clickNodeState.key, isWhite, winBy - 1)
			}, 600);
		}
	}
	/**
	 * 
	 * @param {string} key - key of node or edge
	 * @param {bool} isEdge - mention if it is edge or node
	 * @returns {'CAN_MOVE'|'CAN_NOT_MOVE'|'NOT_ACTIVE'}
	 */
	const activeState = (key, isEdge = false) => {
		if (!clickNodeState.key) return NOT_ACTIVE;
		const attr = isEdge ? 'path' : 'vertex'
		const coinEdge = clickNodeState.isWhite ? findEle(whiteCoins, clickNodeState.key).node : findEle(blackCoins, clickNodeState.key).node;
		const allCoin = whiteCoins.concat(blackCoins);
		const isPresentInDirection = (direction) => allCoin.filter(i => (direction ? i.node[direction][attr]?.key : i.node[key]) === key).length > 0;
		if (coinEdge.R[attr]?.key === key || coinEdge.D[attr]?.key === key || coinEdge.L[attr]?.key === key || coinEdge.U[attr]?.key === key) {
			if (isEdge) {
				if ((coinEdge.R[attr]?.key === key && !isPresentInDirection('L'))
					|| (coinEdge.D[attr]?.key === key && !isPresentInDirection('U'))
					|| (coinEdge.L[attr]?.key === key && !isPresentInDirection('R'))
					|| (coinEdge.U[attr]?.key === key && !isPresentInDirection('D'))) {
					return CAN_MOVE
				}
			} else {
				if (!isPresentInDirection()) return CAN_MOVE
			}
			return CAN_NOT_MOVE
		}
		return NOT_ACTIVE;
	}
	useEffect(() => {
		const size = board.current.clientHeight ? board.current.clientHeight : board.current.clientWidth;
		setSize(() => size / 6)
	}, [board.current.clientWidth, board.current.clientHeight])
	useEffect(() => {
		arrangeRandomCoins(setBlackCoins, setWhiteCoins, nodes);
	}, [])
	return (
		<CenterSquare>
			<Box position={'relative'} justifyContent={'center'} alignItems={'center'} m={'10%'} ref={board}>
				{size && <>
					{edges.map(({ units, isHorizontal, startingLocation, key }) =>
						<Edge
							key={key}
							unit={units}
							oneUnitLength={size}
							isHorizontal={isHorizontal}
							top={startingLocation.y}
							left={startingLocation.x}
							active={activeState(key, true)} />)}
					{nodes.map(({ key, location }) => (
						<Node
							key={key}
							top={location.y}
							left={location.x}
							oneUnitLength={size}
							onPress={() => clickNode(key)}
							disabled={isNodeDisabled(key)}
							active={activeState(key)} />
					))}
					{whiteCoins.map((i) => (<Coins
						key={i.key}
						top={i.node.location.y} left={i.node.location.x}
						completed={i.completed}
						oneUnitLength={size} player={'WHITE'}
						disabled={isCoinDisabled('WHITE', i.key)}
						onPress={() => clickCoin(i.key)} ></Coins>))}
					{blackCoins.map((i) => (<Coins
						key={i.key}
						top={i.node.location.y} left={i.node.location.x}
						completed={i.completed}
						oneUnitLength={size} player={'BLACK'}
						disabled={isCoinDisabled('BLACK', i.key)}
						onPress={() => clickCoin(i.key)} ></Coins>))}
				</>}
			</Box>
		</CenterSquare>
	)
}
