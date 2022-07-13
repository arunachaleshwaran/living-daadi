import { Circle, ZStack } from 'native-base'
import React from 'react'
import { Pressable } from 'native-base'
import { BoardColor } from '../../theme'
import { CAN_MOVE, CAN_NOT_MOVE, NOT_ACTIVE } from './constant'

export default function Node({ oneUnitLength, top, left, onPress, disabled, active = false }) {
	let bg;
	switch (active) {
		case CAN_MOVE:
			bg = BoardColor.active;
			break;
		case CAN_NOT_MOVE:
			bg = BoardColor.inactive;
			break;
		case NOT_ACTIVE:
			bg = BoardColor.bg;
			break;
		default:
			throw new Error('unknown active state');
	}
	return <ZStack position={'absolute'} top={top * oneUnitLength} left={left * oneUnitLength} alignItems={'center'} justifyContent={'center'} >
		<Pressable onPress={() => onPress()} disabled={disabled}>
			<Circle w={oneUnitLength / 2} h={oneUnitLength / 2} bg={bg} ></Circle >
		</Pressable >
		<Pressable onPress={() => onPress()} disabled={disabled}>
			<Circle w={oneUnitLength / 4} h={oneUnitLength / 4} bg={BoardColor.boardColor} ></Circle >
		</Pressable>
	</ZStack>
}
