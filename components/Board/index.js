import Node from './Node'
import Edge from './Edge'
import { Box, Flex, Pressable, Text } from 'native-base'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CenterSquare from '../CenterSquare'
import Coins from './Coins'
import nodes from './Node.model'
import edges from './Edge.model'
import { arrangeRandomCoins } from './actions'

export default function Board() {
	const [whiteCoins, setWhiteCoins] = useState([]);
	const [blackCoins, setBlackCoins] = useState([]);
	useEffect(() => {
		arrangeRandomCoins(setBlackCoins, setWhiteCoins);
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
