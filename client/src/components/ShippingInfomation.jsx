import { Box, Heading, VStack, FormControl, Flex, Stack, Text, Radio, RadioGroup, Tooltip } from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import { useDispatch, useSelector } from "react-redux";
import { setExpress } from "../redux/actions/cartActions";
import { useState } from "react";
import { setShippingAddress, setShippingAddressError } from "../redux/actions/orderActions";

const ShippingInfomation = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { expressShipping } = cart;
  const [formStateChanged, setFormStateChanged] = useState(false);

  const setErrorState = (input, data) => {
    if (!input) {
      dispatch(setShippingAddress(data));
    }
    if ((!formStateChanged && !input) || (formStateChanged && input)) {
      return;
    } else {
      setFormStateChanged(input);
      dispatch(setShippingAddressError(input));
    }
  };

  return (
    <Formik
      initialValues={{ address: "", postalCode: "", city: "", country: "" }}
      validationSchema={Yup.object({
        address: Yup.string().required("This field is required").min(2, "This address is too short"),
        postalCode: Yup.string().required("This field is required").min(2, "This postal code is too short"),
        city: Yup.string().required("This field is required").min(2, "This city is too short"),
        country: Yup.string().required("This field is required").min(2, "This country is too short"),
      })}
    >
      {(formik) => (
        <VStack as="form">
          <FormControl
            onChange={() =>
              Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length >= 2
                ? setErrorState(false, formik.values)
                : setErrorState(true)
            }
          >
            <TextField name="address" label="Street Address" placeholder="Street Address" />
            <Flex>
              <Box flex="1" mr="10">
                <TextField name="postalCode" label="Postal Code" placeholder="Postal Code" type="number" />
              </Box>
              <Box flex="2">
                <TextField name="city" label="City" placeholder="City" />
              </Box>
            </Flex>
            <TextField name="country" label="Country" placeholder="Country" />
          </FormControl>
          <Box w="100%" h="100px" or="5">
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shipping Method
            </Heading>
            <RadioGroup
              defaultValue={`${expressShipping}`}
              onChange={(e) => {
                dispatch(setExpress(e));
              }}
            >
              <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "flex-start" }}>
                <Stack pr="10" spacing={{ base: "8", md: "10" }} flex="1.5">
                  <Box>
                    <Radio value="true">
                      <Text fontWeight="bold">Express 14.99</Text>
                      <Text>Dispatched in 24 hours.</Text>
                    </Radio>
                  </Box>
                  <Stack spacing="6">Express</Stack>
                </Stack>
                <Radio value="false">
                  <Tooltip label="Free shipping for orders of $1000 or more!">
                    <Box>
                      <Text fontWeight="bold">Standard $4.99</Text>
                      <Text>Dispatched in 2 - 3 days.</Text>
                    </Box>
                  </Tooltip>
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </VStack>
      )}
    </Formik>
  );
};

export default ShippingInfomation;
