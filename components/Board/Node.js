import { Circle, ZStack } from 'native-base'
import React from 'react'
import BoardColor from '../../theme/board'
export default function Node({ oneUnitLength, top, left }) {
	return (<ZStack position={'absolute'} top={top * oneUnitLength} left={left * oneUnitLength} alignItems={'center'} justifyContent={'center'} >
		<Circle w={oneUnitLength / 2} h={oneUnitLength / 2} bg={BoardColor.bg} ></Circle >
		<Circle w={oneUnitLength / 4} h={oneUnitLength / 4} bg={BoardColor.boardColor} ></Circle >
	</ZStack>
	)
}
