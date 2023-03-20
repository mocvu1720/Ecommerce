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
} from "@chakra-ui/react";
import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser, resetErrorAndRemoval } from "../redux/actions/adminActions";
import ConfirmRemoveAlert from "./ConfirmRemoveAlert";

const UsersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [userToDelete, setUserToDelete] = useState("");
  const dispatch = useDispatch();
  const adminInfo = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);
  const { error, loading, userRemoval, userList } = adminInfo;
  const { userInfo } = user;
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(resetErrorAndRemoval());
    if (userRemoval) {
      toast({
        description: "User has been deleted successfully",
        status: "success",
        isClosable: true,
      });
    }
  }, [userRemoval, dispatch, toast]);

  const openDeleteConfirmBox = (user) => {
    setUserToDelete(user);
    onOpen();
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
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Registered</Th>
                  <Th>Admin</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userList &&
                  userList.map((user) => (
                    <Tr key={user._id}>
                      <Td>
                        {user.name} {user._id === userInfo._id ? "(You)" : ""}
                      </Td>
                      <Td>{user.email}</Td>
                      <Td>{new Date(user.createdAt).toLocaleString()}</Td>
                      <Td>{user.isAdmin === "true" ? <CheckCircleIcon color="green.500" /> : ""}</Td>
                      <Td>
                        <Button isDisabled={user._id === userInfo._id} onClick={() => openDeleteConfirmBox(user)}>
                          <DeleteIcon mr="5px" />
                          Remove User
                        </Button>
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
            itemToDelete={userToDelete}
            deleteAction={deleteUser}
          />
        </Box>
      )}
    </Box>
  );
};

export default UsersTab;
