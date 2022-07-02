import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Flex,
  AspectRatio,
  Container,
} from "native-base";
import Board from "./components/Board";


export default function App() {
  return (<NativeBaseProvider>
    <Board></Board>
  </NativeBaseProvider >);
}
