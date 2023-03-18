import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as ReactLink } from "react-router-dom";

import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { register } from "../redux/actions/userActions";

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = "/products";
  const toast = useToast();

  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;

  const headingBR = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({ description: "Account created successfully", status: "success" });
    }
  }, [userInfo, redirect, navigate, toast]);

  return (
    <Formik
      initialValues={{ email: "", password: "", name: "" }}
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
        dispatch(register(values.name, values.email, values.password));
      }}
    >
      {(formik) => (
        <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", md: "8" }} minH="4xl">
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading size={headingBR}>Create an account</Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Already a user? </Text>
                  <Button as={ReactLink} to="/registration" variant="link" colorScheme="orange">
                    Sign in
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: "0", md: "8" }}
              px={{ base: "4", md: "10" }}
              bg={{ boxBR }}
              boxShadow={{ base: "none", md: "xl" }}
            >
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
                    <TextField type="text" name="name" label="Full Name" placeholder="Enter your name" />
                    <TextField type="email" name="email" label="Email" placeholder="Enter your email" />
                    <PasswordTextField
                      type="password"
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                    />
                    <PasswordTextField
                      type="password"
                      name="confirmPassword"
                      label="Confirm your password"
                      placeholder="Confirm your password"
                    />
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button colorScheme="orange" size="lg" fontSize="md" isLoading={loading} type="submit">
                    Sign Up
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default RegistrationScreen;
