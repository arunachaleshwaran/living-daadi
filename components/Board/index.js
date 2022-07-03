import Node from './Node'
import Edge from './Edge'
import { Box, Flex, Pressable, Text } from 'native-base'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CenterSquare from '../CenterSquare'
import Coins from './Coins'

const edges = [
	{ key: '0003', units: 3, isHorizontal: true, location: { x: 0, y: 0 } },
	{ key: '0306', units: 3, isHorizontal: true, location: { x: 3, y: 0 } },
	{ key: '6063', units: 3, isHorizontal: true, location: { x: 0, y: 6 } },
	{ key: '6366', units: 3, isHorizontal: true, location: { x: 3, y: 6 } },
	{ key: '1113', units: 2, isHorizontal: true, location: { x: 1, y: 1 } },
	{ key: '1315', units: 2, isHorizontal: true, location: { x: 3, y: 1 } },
	{ key: '5153', units: 2, isHorizontal: true, location: { x: 1, y: 5 } },
	{ key: '5355', units: 2, isHorizontal: true, location: { x: 3, y: 5 } },
	{ key: '2223', units: 1, isHorizontal: true, location: { x: 2, y: 2 } },
	{ key: '2324', units: 1, isHorizontal: true, location: { x: 3, y: 2 } },
	{ key: '4243', units: 1, isHorizontal: true, location: { x: 2, y: 4 } },
	{ key: '4345', units: 1, isHorizontal: true, location: { x: 3, y: 4 } },
	{ key: '3031', units: 1, isHorizontal: true, location: { x: 0, y: 3 } },
	{ key: '3132', units: 1, isHorizontal: true, location: { x: 1, y: 3 } },
	{ key: '3435', units: 1, isHorizontal: true, location: { x: 4, y: 3 } },
	{ key: '3536', units: 1, isHorizontal: true, location: { x: 5, y: 3 } },

	{ key: '0636', units: 3, isHorizontal: false, location: { x: 6, y: 0 } },
	{ key: '3666', units: 3, isHorizontal: false, location: { x: 6, y: 3 } },
	{ key: '0030', units: 3, isHorizontal: false, location: { x: 0, y: 0 } },
	{ key: '3060', units: 3, isHorizontal: false, location: { x: 0, y: 3 } },
	{ key: '1535', units: 2, isHorizontal: false, location: { x: 5, y: 1 } },
	{ key: '3555', units: 2, isHorizontal: false, location: { x: 5, y: 3 } },
	{ key: '1131', units: 2, isHorizontal: false, location: { x: 1, y: 1 } },
	{ key: '3151', units: 2, isHorizontal: false, location: { x: 1, y: 3 } },
	{ key: '2434', units: 1, isHorizontal: false, location: { x: 4, y: 2 } },
	{ key: '3445', units: 1, isHorizontal: false, location: { x: 4, y: 3 } },
	{ key: '2232', units: 1, isHorizontal: false, location: { x: 2, y: 2 } },
	{ key: '3242', units: 1, isHorizontal: false, location: { x: 2, y: 3 } },
	{ key: '0313', units: 1, isHorizontal: false, location: { x: 3, y: 0 } },
	{ key: '1323', units: 1, isHorizontal: false, location: { x: 3, y: 1 } },
	{ key: '4353', units: 1, isHorizontal: false, location: { x: 3, y: 4 } },
	{ key: '5363', units: 1, isHorizontal: false, location: { x: 3, y: 5 } },
]
const node = [
	{ key: '00', location: { x: 0, y: 0 } },
	{ key: '03', location: { x: 3, y: 0 } },
	{ key: '06', location: { x: 6, y: 0 } },
	{ key: '11', location: { x: 1, y: 1 } },
	{ key: '13', location: { x: 3, y: 1 } },
	{ key: '15', location: { x: 5, y: 1 } },
	{ key: '22', location: { x: 2, y: 2 } },
	{ key: '23', location: { x: 3, y: 2 } },
	{ key: '24', location: { x: 4, y: 2 } },
	{ key: '30', location: { x: 0, y: 3 } },
	{ key: '31', location: { x: 1, y: 3 } },
	{ key: '32', location: { x: 2, y: 3 } },
	{ key: '34', location: { x: 4, y: 3 } },
	{ key: '35', location: { x: 5, y: 3 } },
	{ key: '36', location: { x: 6, y: 3 } },
	{ key: '42', location: { x: 2, y: 4 } },
	{ key: '43', location: { x: 3, y: 4 } },
	{ key: '44', location: { x: 4, y: 4 } },
	{ key: '51', location: { x: 1, y: 5 } },
	{ key: '53', location: { x: 3, y: 5 } },
	{ key: '55', location: { x: 5, y: 5 } },
	{ key: '60', location: { x: 0, y: 6 } },
	{ key: '63', location: { x: 3, y: 6 } },
	{ key: '66', location: { x: 6, y: 6 } },
]
const whiteCoins = [
	{
		key: 0, location: { x: 0, y: 0 },
		key: 1, location: { x: 1, y: 0 },
		key: 2, location: { x: 0, y: 0 },
		key: 3, location: { x: 1, y: 0 },
		key: 4, location: { x: 0, y: 0 },
		key: 5, location: { x: 1, y: 0 },
		key: 6, location: { x: 0, y: 0 },
		key: 7, location: { x: 1, y: 0 },
		key: 8, location: { x: 0, y: 0 },

	},
]
export default function Board() {
	const board = useRef({ current: null })
	const [size, setSize] = useState(0)
	let locations = [
		{ y: 0, x: 1 },
		{ y: 0, x: 0 },
		{ y: 0, x: 1 },
		{ y: 0, x: 0 },
		{ y: 0, x: 1 },
		{ y: 0, x: 0 },
		{ y: 0, x: 1 },
		{ y: 0, x: 0 },
		{ y: 0, x: 1 },

	];
	const [input, setInput] = useState(0)
	useEffect(() => {
		setSize(() => board.current.clientWidth / 6)
	}, [board.current.clientHeight])
	const clickAction = () => {
		setInput(() => input + 1)
	}
	return (
		<CenterSquare>
			<Box position={'relative'} justifyContent={'center'} alignItems={'center'} m={'10%'} ref={board}>
				{size && <>
					{edges.map(({ units, isHorizontal, location, key }) =>
						<Edge
							key={key}
							unit={units}
							oneUnitLength={size}
							isHorizontal={isHorizontal}
							top={location.y}
							left={location.x} />)}
					{node.map(({ key, location }) => (
						<Node key={key} top={location.y} left={location.x} oneUnitLength={size} />
					))}
					{/* {whiteCoins.map(({ key, location }) => <Coins key={key} top={locations[input].y} left={locations[input].x} oneUnitLength={size} player={'BLACK'}></Coins>)} */}
					<Coins top={locations[input].y} left={locations[input].x} oneUnitLength={size} player={'BLACK'}></Coins>
				</>}
				<Pressable onPress={clickAction}>
					<Text>Press me</Text>
				</Pressable>
			</Box>
		</CenterSquare>
	)
}
