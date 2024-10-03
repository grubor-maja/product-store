import React, { useEffect } from 'react';
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

function HomePage() {
    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    textAlign={"center"}
                    textTransform={"uppercase"}
                >
                    Current Products
                </Text>

                {products.length > 0 ? (
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 3
                        }}
                        spacing={10}
                        w={"full"}
                    >
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </SimpleGrid>
                ) : (
                    <>
                        <Text
                            fontSize={{ base: "22", sm: "28" }}
                            fontWeight={"bold"}
                            color='purple'
                            textAlign={"center"}
                        >
                            No Products Found
                        </Text>
                        <Link to={"/create"}>
                            <Text as='span' color='purple' _hover={{ textDecoration: "underline" }}>
                                Create a product
                            </Text>
                        </Link>
                    </>
                )}
            </VStack>
        </Container>
    );
}

export default HomePage;
