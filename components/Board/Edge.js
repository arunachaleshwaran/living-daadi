import { Box } from 'native-base'
import React from 'react'
import { BoardColor } from '../../theme'
export default function Edge({ unit, oneUnitLength, top, left, isHorizontal, active = false }) {
	let bg = active ? BoardColor.active : BoardColor.bg
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
