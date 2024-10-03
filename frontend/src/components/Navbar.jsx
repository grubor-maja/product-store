import React from 'react';
import { Button, Container, Flex, Text, HStack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaOpencart, FaPlus } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { MdOutlineWbSunny } from "react-icons/md";
import { useProductStore } from '../store/product';

function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                gap={10}
                padding={10}
                alignItems={"center"}
                justifyContent={"space-between"}
                bg = {useColorModeValue("gray.100", "gray.900")}
            >
                <Link to={"/"}>
                    <HStack spacing={2} alignItems="center">
                        <Text
                            fontSize={{ base: "22", sm: "28" }}
                            fontWeight={"bold"}
                            bgGradient='linear(to-l, #7928CA, #FF0080)'
                            bgClip='text'
                            textAlign={"center"}
                            textTransform={"uppercase"}
                        >
                            Product Store
                        </Text>
                        <FaOpencart style={{ fontSize: "28px" }} />
                    </HStack>
                </Link>

                <HStack spacing={4} alignItems="center">
                    <Link to={"/create"}>
                        <Button colorScheme="purple">
                            <FaPlus />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <MdOutlineWbSunny /> : <FaRegMoon />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
}

export default Navbar;
