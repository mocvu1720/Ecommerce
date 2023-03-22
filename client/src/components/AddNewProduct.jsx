import {
  Td,
  Text,
  Tooltip,
  Tr,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Badge,
  Switch,
  Button,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { uploadProduct } from "../redux/actions/adminActions";

const AddNewProduct = () => {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [productIsNew, setProductIsNew] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const createNewProduct = () => {
    dispatch(uploadProduct({ brand, name, category, stock, price, image, productIsNew, description }));
  };
  return (
    <Tr>
      <Td>
        <Text fontSize="sm">Image File Name</Text>
        <Tooltip label={`Set the name of your image e.g. Iphone.jpg`} fontSize="sm">
          <Input size="sm" value={image} onChange={(e) => setImage(e.target.value)} placeholder="e.g Iphone.jpg" />
        </Tooltip>
      </Td>
      <Td>
        <Text fontSize="sm">Description</Text>
        <Textarea
          w="270px"
          h="120px"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="sm"
          placeholder="Description"
        />
      </Td>
      <Td>
        <Text fontSize="sm">Brand</Text>
        <Input size="sm" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Apple or Samsung" />
        <Text fontSize="sm">Name</Text>
        <Input size="sm" value={name} onChange={(e) => setName(e.target.value)} placeholder="Iphone 14" />
      </Td>
      <Td>
        <Text fontSize="sm">Category</Text>
        <Input size="sm" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Electronics" />
        <Text fontSize="sm">Price</Text>
        <Input size="sm" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      </Td>
      <Td>
        <Text fontSize="sm">Stock</Text>
        <Input size="sm" value={stock} onChange={(e) => setStock(e.target.value)} />
        <Text fontSize="sm">New badge show on Product Card</Text>
        <FormControl display="flex" flexDirection="row" alignItems="center">
          <FormLabel htmlFor="productIsNewFlag" mb="0" fontSize="sm">
            Enable
            <Badge rounded="full" px="1" mx="1" fontSize="0.8em" colorScheme="green">
              New
            </Badge>
            badge ?
          </FormLabel>
          <Switch id="productIsNewFlag" onChange={() => setProductIsNew(!productIsNew)} isChecked={productIsNew} />
        </FormControl>
      </Td>
      <Td>
        <VStack>
          <Button colorScheme="orange" w="160px" variant="outline" onClick={() => createNewProduct()}>
            <MdDriveFolderUpload />
            <Text ml="2">Save Product</Text>
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};

export default AddNewProduct;
