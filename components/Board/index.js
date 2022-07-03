import Node from './Node'
import Edge from './Edge'
import { Box, Flex, Pressable, Text } from 'native-base'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CenterSquare from '../CenterSquare'
import Coins from './Coins'
import nodes from './Node.model'
import edges from './Edge.model'


export default function Board() {
	const [whiteCoins, setWhiteCoins] = useState([]);
	const [blackCoins, setBlackCoins] = useState([]);
	let randomNum = Array.from({ length: 40 }, () => Math.floor(Math.random() * 24));
	let arrangeRandomCoins = () => {
		// find the key already present in the array
		let allIndex = Array(24).fill().map((_, idx) => idx);
		let isWhite = true;
		let wC = []; let bC = [];

		while (wC.length < 9 || bC.length < 9) {
			const num = Math.floor(Math.random() * allIndex.length);
			const index = allIndex[num];
			allIndex.splice(num, 1);
			if (isWhite && wC.length < 9) {
				wC.push({ key: nodes[index].key, node: nodes[index], completed: false });
			}
			if (!isWhite && bC.length < 9) {
				bC.push({ key: nodes[index].key, node: nodes[index], completed: false });
			}
			isWhite = !isWhite;
		}
		setBlackCoins(bC);
		setWhiteCoins(wC);
	}
	useEffect(() => {
		arrangeRandomCoins();
	}, [])
	console.log(whiteCoins, blackCoins);
	const board = useRef({ current: null })
	const [size, setSize] = useState(0)
	const [input, setInput] = useState(0)
	const [clickNode, setClickNode] = useState({ white: true, coin: true, node: false })
	useEffect(() => {
		setSize(() => board.current.clientWidth / 6)
	}, [board.current.clientHeight])
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
						<Node key={key} id={key} top={location.y} left={location.x} oneUnitLength={size} />
					))}
					{whiteCoins.map((i) => (<Coins
						key={i.key} id={i.key}
						top={i.node.location.y} left={i.node.location.x}
						completed={i.completed}
						oneUnitLength={size} player={'BLACK'}
						disabled={clickNode.node} ></Coins>))}
					{blackCoins.map((i) => (<Coins
						key={i.key} id={i.key}
						top={i.node.location.y} left={i.node.location.x}
						completed={i.completed}
						oneUnitLength={size} player={'WHITE'}
						disabled={clickNode.node} ></Coins>))}
				</>}
			</Box>
		</CenterSquare>
	)
}
