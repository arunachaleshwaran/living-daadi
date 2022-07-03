import React, { useEffect, useState } from 'react'
import { PresenceTransition, ZStack } from 'native-base';
import { Circle } from 'native-base'
import { CoinColor } from '../../theme'
import { Pressable } from 'react-native';
export default function Coins({ oneUnitLength, top, left, player, completed, id, disabled, onPress }) {
	if (completed) return <></>
	const [visible, setVisible] = useState(false)
	const [translation, setTranslation] = useState({ x: 3, y: 3 })
	let trans = { x: left - translation.x, y: top - translation.y };
	useEffect(() => {
		setVisible(true);
	}, [top, left])
	let complete = (a) => {
		if (a === 'entered') {
			setVisible(() => false);
			setTranslation(() => ({ x: left, y: top }))
		}
	}
	return (<ZStack position={'absolute'} top={translation.y * oneUnitLength} left={translation.x * oneUnitLength} alignItems={'center'} justifyContent={'center'} >
		{visible ? <PresenceTransition visible={visible}
			onTransitionComplete={complete}
			initial={{
				translateX: 0,
				translateY: 0,
			}}
			animate={{
				translateX: trans.x * oneUnitLength,
				translateY: trans.y * oneUnitLength,
				transition: { duration: 500 }
			}}>
			<Circle w={oneUnitLength / 2} h={oneUnitLength / 2} bg={CoinColor[player].bg} ></Circle >
		</PresenceTransition> : <Pressable disabled={disabled} onPress={onPress}>
			<Circle w={oneUnitLength / 2} h={oneUnitLength / 2} bg={CoinColor[player].bg} ></Circle >
		</Pressable>}
	</ZStack >)
}
