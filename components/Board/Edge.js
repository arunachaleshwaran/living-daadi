import { Box } from 'native-base'
import React from 'react'
import { BoardColor } from '../../theme'
import { MOVE_STATE } from './constant'

export default function Edge({ unit, oneUnitLength, top, left, isHorizontal, active }) {
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
	if (isHorizontal) {
		return (
			<Box position={'absolute'} top={top * oneUnitLength} left={left * oneUnitLength} width={oneUnitLength * unit} height={oneUnitLength * .1} bg={bg}></Box>
		)
	} else {
		return (
			<Box position={'absolute'} top={top * oneUnitLength} left={left * oneUnitLength} width={oneUnitLength * .1} height={oneUnitLength * unit} bg={bg} ></Box>
		)
	}
}
