import React, { useEffect, useState } from 'react'
import { PresenceTransition, ZStack } from 'native-base';
import { Circle } from 'native-base'
import { CoinColor } from '../../theme'
export default function Coins({ oneUnitLength, top, left, player }) {
	const [visible, setVisible] = useState(false)
	const [translation, setTranslation] = useState({
		initialTranslation: { x: left * oneUnitLength, y: top * oneUnitLength },
		currentTranslation: { x: undefined, y: undefined },
	})
	useEffect(() => {
		let clone = { ...translation };
		if (visible) {
			clone.initialTranslation = { x: left * oneUnitLength, y: top * oneUnitLength };
		} else {
			clone.currentTranslation = { x: left * oneUnitLength, y: top * oneUnitLength };
		}
		setTranslation(clone);
	}, [top, left])
	useEffect(() => {
		setVisible(!visible)
	}, [translation])
	return (<ZStack position={'absolute'} top={0 * oneUnitLength} left={0 * oneUnitLength} alignItems={'center'} justifyContent={'center'} >
		{/* translate location */}
		<PresenceTransition visible={visible} initial={{
			translateX: translation.initialTranslation.x,
			translateY: translation.initialTranslation.y,
		}}
			animate={{ translateX: translation.currentTranslation.x, translateY: translation.currentTranslation.y, transition: { duration: 500 } }}
			exit={{ translateX: translation.initialTranslation.x, translateY: translation.initialTranslation.y, transition: { duration: 500 } }}>
			<Circle w={oneUnitLength / 2} h={oneUnitLength / 2} bg={CoinColor[player].bg} ></Circle >
		</PresenceTransition>
	</ZStack >)
}
