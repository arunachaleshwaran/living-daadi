import Node from './Node'
import Edge from './Edge'
import { Box } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import CenterSquare from '../CenterSquare'
import Coins from './Coins'
import nodes from './Node.model'
import edges from './Edge.model'
import { arrangeRandomCoins } from './actions'

export default function Board() {
	const [size, setSize] = useState(10)
	const [whiteCoins, setWhiteCoins] = useState([]);
	const [blackCoins, setBlackCoins] = useState([]);
	const board = useRef({ current: null })
	const [clickNodeState, setClickNodeState] = useState({ isWhite: true, key: null })
	const findEleIndex = (arr, key) => {
		const i = arr.findIndex(ele => ele.key === key)
		if (i === -1) {
			setClickNodeState(() => ({ isWhite: clickNodeState.isWhite, key: null }))
			throw new Error(`Element with key ${key} not found`)
		}
		return i;
	}
	const isNodeDisabled = (key) => {
		if (!clickNodeState.key) return true
		const node = nodes[findEleIndex(nodes, clickNodeState.key)];
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
	const clickNode = (key) => {
		const node = nodes[findEleIndex(nodes, key)];
		const isWhite = clickNodeState.isWhite
		if (isWhite) {
			whiteCoins[findEleIndex(whiteCoins, clickNodeState.key)].node = node;
			setWhiteCoins(() => [...whiteCoins]);
		} else {
			blackCoins[findEleIndex(blackCoins, clickNodeState.key)].node = node;
			setBlackCoins(() => [...blackCoins])
		}
		setClickNodeState(() => ({ isWhite: !isWhite, key: null }))
	}
	useEffect(() => {
		const size = board.current.clientHeight ? board.current.clientHeight : board.current.clientWidth;
		setSize(() => size / 6)
	}, [board.current.clientWidth, board.current.clientHeight])
	useEffect(() => {
		arrangeRandomCoins(setBlackCoins, setWhiteCoins);
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
							left={startingLocation.x} />)}
					{nodes.map(({ key, location }) => (
						<Node
							key={key}
							top={location.y}
							left={location.x}
							oneUnitLength={size}
							onPress={() => clickNode(key)}
							disabled={isNodeDisabled(key)} />
					))}
					{whiteCoins.map((i) => (<Coins
						key={i.key}
						top={i.node.location.y} left={i.node.location.x}
						completed={i.completed}
						oneUnitLength={size} player={'WHITE'}
						disabled={isCoinDisabled('WHITE', i.key)}
						onPress={() => clickCoin(i.key)} ></Coins>))}
					{blackCoins.map((i) => (<Coins
						key={i.key} id={i.key}
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
