import { AspectRatio, Box, Container, Flex } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native';

export default function CenterSquare({ children }) {
	const { width, height } = useWindowDimensions();
	return (
		<Flex height={'full'} width={'full'} direction={'row'} grow={1} shrink={1} justifyContent={'center'} alignItems={'center'}>
			{height > width ? <AspectRatio width={'full'} ratio={{ base: 1 / 1 }} bg={'amber.700'}>
				{children}
			</AspectRatio> : <AspectRatio height={'full'} ratio={{ base: 1 / 1 }} bg={'amber.700'}>{children}</AspectRatio>}
		</Flex>
	)
}
