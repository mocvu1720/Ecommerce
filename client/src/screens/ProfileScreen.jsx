import {
  Box,
  Button,
  Heading,
  Flex,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  useToast,
  FormControl,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
} from "@chakra-ui/react";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, resetUpdateSuccess } from "../redux/actions/userActions";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, loading, error, updateSuccess } = user;
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (updateSuccess) {
      toast({ description: "Profile updated successfully", status: "success", isClosable: true });
    }
  }, [toast, updateSuccess]);

  return userInfo ? (
    <Formik
      initialValues={{ email: userInfo.email, password: "", name: userInfo.name, confirmPassword: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email address").required("Email address is required"),
        password: Yup.string()
          .min(6, "Password is too short - must contain at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .min(6, "Password is too short - must contain at least 6 characters")
          .required("Password is required")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
      })}
      onSubmit={(values) => {
        dispatch(resetUpdateSuccess());
        dispatch(updateProfile(userInfo._id, values.name, values.email, values.password));
      }}
    >
      {(formik) => (
        <Box
          minH="100vh"
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack direction={{ base: "column", lg: "row" }} spacing="10" align={{ lg: "flex-start" }}>
            <Stack flex="1.5" mb={{ base: "2xl", md: "none" }}>
              <Heading fontSize="2xl" fontWeight="extrabold">
                Profile
              </Heading>
              <Stack spacing="6">
                <Stack spacing="6" as="form" onSubmit={formik.handleSubmit}>
                  {error && (
                    <Alert
                      status="error"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <AlertIcon />
                      <AlertTitle>We are sorry</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Stack spacing="5">
                    <FormControl>
                      <TextField type="text" name="name" label="Full Name" placeholder="Your name" />
                      <TextField type="email" name="email" label="Email" placeholder="Your email" />
                      <PasswordTextField type="password" name="password" label="Password" placeholder="Your password" />
                      <PasswordTextField
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                      />
                    </FormControl>
                  </Stack>
                  <Stack spacing="6">
                    <Button color="orange" size="lg" fontSize="md" isLoading={loading} type="submit">
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Flex direction="column" flex="1" _dark={{ bg: "gray.900" }}>
              <Card>
                <CardHeader>
                  <Heading size="md">User Report</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing={4}>
                    <Box pt="2" fontSize="sm">
                      Regisered on {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Navigate to="/login" replace="true" state={{ from: location }} />
  );
};

export default ProfileScreen;
