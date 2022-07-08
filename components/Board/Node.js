import { Circle, ZStack } from 'native-base'
import React from 'react'
import { Pressable } from 'native-base'
import { BoardColor } from '../../theme'
export default function Node({ oneUnitLength, top, left, onPress, disabled }) {
	return <ZStack position={'absolute'} top={top * oneUnitLength} left={left * oneUnitLength} alignItems={'center'} justifyContent={'center'} >
		<Pressable onPress={() => onPress()} disabled={disabled}>
			<Circle w={oneUnitLength / 2} h={oneUnitLength / 2} bg={BoardColor.bg} ></Circle >
		</Pressable >
		<Pressable onPress={() => onPress()} disabled={disabled}>
		<Circle w={oneUnitLength / 4} h={oneUnitLength / 4} bg={BoardColor.boardColor} ></Circle >
		</Pressable>
	</ZStack>
}
