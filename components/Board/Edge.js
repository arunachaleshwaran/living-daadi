import { Box } from 'native-base'
import React from 'react'
import { BoardColor } from '../../theme'
export default function Edge({ unit, oneUnitLength, top, left, isHorizontal }) {
	if (isHorizontal) {
		return (
			<Box position={'absolute'} top={top * oneUnitLength} left={left * oneUnitLength} width={oneUnitLength * unit} height={oneUnitLength * .1} bg={BoardColor.bg}></Box>
		)
	} else {
		return (
			<Box position={'absolute'} top={top * oneUnitLength} left={left * oneUnitLength} width={oneUnitLength * .1} height={oneUnitLength * unit} bg={BoardColor.bg}></Box>
		)
	}
}
