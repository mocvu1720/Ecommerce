import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  Spinner,
  Wrap,
  useToast,
  Td,
  Text,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import { TbTruckDelivery } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, deleteOrder, setDelivered, resetErrorAndRemoval } from "../redux/actions/adminActions";
import ConfirmRemoveAlert from "./ConfirmRemoveAlert";

const OrdersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [orderToDelete, setOrderToDelete] = useState("");
  const dispatch = useDispatch();
  const adminInfo = useSelector((state) => state.admin);
  const { error, loading, orders, deliveredFlag, orderRemoval } = adminInfo;
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(resetErrorAndRemoval());
    if (orderRemoval) {
      toast({
        description: "Order has been deleted successfully",
        status: "success",
        isClosable: true,
      });
    }

    if (deliveredFlag) {
      toast({
        description: "Order has been set to delivered",
        status: "success",
        isClosable: true,
      });
    }
  }, [orderRemoval, dispatch, toast, deliveredFlag]);

  const openDeleteConfirmBox = (order) => {
    setOrderToDelete(order);
    onOpen();
  };

  const onSetToDelivered = (order) => {
    dispatch(resetErrorAndRemoval());
    dispatch(setDelivered(order._id));
  };

  return (
    <Box>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Opps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify="center">
          <Stack direction="row" spacing="4">
            <Spinner mt="20" thickness="2px" speed="0.65s" emptyColor="gray.200" color="orange.500" size="xl" />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Data</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Shipping Info</Th>
                  <Th>Items Ordered</Th>
                  <Th>Payment Method</Th>
                  <Th>Shipping Price</Th>
                  <Th>Total</Th>
                  <Th>Delivered</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders &&
                  orders.map((order) => (
                    <Tr key={order._id}>
                      <Td>{new Date(order.createdAt).toLocaleString()}</Td>
                      <Td>{order.username}</Td>
                      <Td>{order.email}</Td>
                      <Td>
                        <Text>
                          <i>Address: </i> {order.shippingAddress.address}
                        </Text>
                        <Text>
                          <i>City: </i> {order.shippingAddress.postalCode} {order.shippingAddress.city}
                        </Text>
                        <Text>
                          <i>Country:</i> {order.shippingAddress.country}
                        </Text>
                      </Td>
                      <Td>
                        {order.orderItems.map((item) => (
                          <Text key={item._id}>
                            {item.qty} x {item.name}
                          </Text>
                        ))}
                      </Td>
                      <Td>{order.paymentMethod}</Td>
                      <Td>${order.shippingPrice}</Td>
                      <Td>{order.totalPrice}</Td>
                      <Td>{order.isDelivered ? <CheckCircleIcon /> : "Pending"}</Td>
                      <Td>
                        <Flex direction="column">
                          <Button variant="outline" onClick={() => openDeleteConfirmBox(order)}>
                            <DeleteIcon mr="5px" />
                            Remove Order
                          </Button>
                          {!order.isDelivered && (
                            <Button mt="4px" variant="outline" onClick={() => onSetToDelivered(order)}>
                              <TbTruckDelivery />
                              <Text ml="5px">Delivered</Text>
                            </Button>
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ConfirmRemoveAlert
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            itemToDelete={orderToDelete}
            deleteAction={deleteOrder}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersTab;
