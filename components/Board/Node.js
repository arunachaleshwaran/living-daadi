import { Circle, ZStack } from 'native-base'
import React from 'react'
import { Pressable } from 'native-base'
import { BoardColor } from '../../theme'
import { MOVE_STATE } from './constant'

export default function Node({ oneUnitLength, top, left, onPress, disabled, active = false }) {
	let bg;
	switch (active) {
		case MOVE_STATE.CAN_MOVE:
			bg = BoardColor.active;
			break;
		case MOVE_STATE.CAN_NOT_MOVE:
			bg = BoardColor.inactive;
			break;
		case MOVE_STATE.DEFAULT:
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
