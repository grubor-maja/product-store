import React, { useState } from 'react';
import {
  Box, HStack, IconButton, Image, Heading, Text, useToast, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, VStack, useDisclosure, ModalFooter, Button, Input
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';

function ProductCard({ product }) {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();

    const handleDelete = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            });
        }
    };

    const handleUpdate = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            });
        } else {
            toast({
                title: "Success",
                description: "Product updated successfully",
                status: "success",
                isClosable: true
            });
            onClose();
        }
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight='bold' fontSize='xl' color='gray.700' mb={4}>
                    ${product.price}
                </Text>

                <HStack>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='purple' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(product._id)} colorScheme='red' />
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder='Product Price'
                                name='price'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='purple' mr={3} onClick={() => handleUpdate(product._id, updatedProduct)}>
                            Update
                        </Button>
                        <Button colorScheme='purple' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ProductCard;
