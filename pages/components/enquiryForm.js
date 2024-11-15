import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Grid,
  GridItem,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

const EnquiryForm = () => {
  const { handleSubmit, register, control, reset } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post('http://localhost:5000/enquiry', data);
  
      toast({
        title: "Enquiry Submitted",
        description: "Form data has been logged successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      reset(); // Reset the form after submission
    } catch (error) {
      toast({
        title: "Enquiry not submitted",
        description: "Form data has not been logged successfully.",
        status: "error",  // Set to 'error' to match error state
        duration: 3000,
        isClosable: true,
      });
      console.error("Submission Error:", error.response || error.message);
    }
  };
  

  const gradeOptions = [
    { value: "LKG", label: "LKG" },
    { value: "UKG", label: "UKG" },
    { value: "1", label: "Grade 1" },
    { value: "2", label: "Grade 2" },
    { value: "3", label: "Grade 3" },
    { value: "4", label: "Grade 4" },
    { value: "5", label: "Grade 5" },
    { value: "6", label: "Grade 6" },
    { value: "7", label: "Grade 7" },
    { value: "8", label: "Grade 8" },
    { value: "9", label: "Grade 9" },
    { value: "10", label: "Grade 10" },
    { value: "11", label: "Grade 11" },
    { value: "12", label: "Grade 12" },
  ];

  const enquirySourceOptions = [
    { value: "referral", label: "Referral" },
    { value: "website", label: "Website" },
    { value: "school fair", label: "School Fair" },
  ];

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      bg="gray.800"
      p={8}
      rounded="md"
      w="full"
      color="white"
      boxShadow="lg"
      maxW="container.md"
      m="auto"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {/* Left Column: Guardian's Info */}
        <GridItem colSpan={1}>
          <FormControl mb={6}>
            <FormLabel htmlFor="guardianName">Guardian's Name</FormLabel>
            <Input
              id="guardianName"
              {...register("guardianName", { required: true })}
              variant="filled"
              focusBorderColor="red.400"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input
              id="phone"
              {...register("phone", { required: true })}
              type="tel"
              variant="filled"
              focusBorderColor="red.400"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel htmlFor="mobile">Mobile</FormLabel>
            <Input
              id="mobile"
              {...register("mobile")}
              type="tel"
              variant="filled"
              focusBorderColor="red.400"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              {...register("email")}
              type="email"
              variant="filled"
              focusBorderColor="red.400"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel htmlFor="twitter">Twitter Handle</FormLabel>
            <Input
              id="twitter"
              {...register("twitter")}
              variant="filled"
              focusBorderColor="red.400"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel htmlFor="enquirySource">Enquiry Source</FormLabel>
            <Controller
              name="enquirySource"
              control={control}
              render={({ field }) => (
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="filled"
                    bg="gray.700"
                    _hover={{ bg: "gray.600" }}
                  >
                    {field.value || "Select Enquiry Source"}
                  </MenuButton>
                  <MenuList bg="#2d3748">
                    {enquirySourceOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        onClick={() => field.onChange(option.value)}
                        bg="#2d3748"
                        color="white"
                        _hover={{ backgroundColor: "#4a5568" }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )}
            />
          </FormControl>
        </GridItem>

        {/* Right Column: Student & Address Info */}
        <GridItem colSpan={1}>
          <FormControl mb={6}>
            <FormLabel htmlFor="studentFirstName">Student's First Name</FormLabel>
            <Input
              id="studentFirstName"
              {...register("studentFirstName", { required: true })}
              variant="filled"
              focusBorderColor="red.400"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel htmlFor="studentLastName">Student's Last Name</FormLabel>
            <Input
              id="studentLastName"
              {...register("studentLastName", { required: true })}
              variant="filled"
              focusBorderColor="red.400"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
            />
          </FormControl>

          <FormControl mb={6}>
  <FormLabel htmlFor="grade">Grade Applying For</FormLabel>
  <Controller
    name="grade"
    control={control}
    render={({ field }) => (
      <Select
        {...field}
        options={gradeOptions}
        placeholder="Select Grade"
        value={gradeOptions.find((option) => option.value === field.value)} // Display selected value
        onChange={(option) => field.onChange(option.value)} // Store only the value in form state
        styles={{
          control: (styles) => ({
            ...styles,
            backgroundColor: "#2d3748",
          }),
          option: (styles, { isSelected, isFocused }) => ({
            ...styles,
            backgroundColor: isSelected
              ? "#4a5568"
              : isFocused
              ? "#4a5568"
              : "#2d3748",
            color: "white",
            '&:hover': {
              backgroundColor: "#4a5568",
            },
          }),
          singleValue: (styles) => ({ ...styles, color: "white" }),
        }}
      />
    )}
  />
</FormControl>

          <FormControl mb={6}>
            <FormLabel htmlFor="dob">Date of Birth</FormLabel>
            <Input
              id="dob"
              {...register("dob", { required: true })}
              type="date"
              variant="filled"
              focusBorderColor="red.400"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel htmlFor="currentSchool">Current School</FormLabel>
            <Input
              id="currentSchool"
              {...register("currentSchool", { required: true })}
              variant="filled"
              focusBorderColor="red.400"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel htmlFor="description">Additional Information</FormLabel>
            <Textarea
              id="description"
              {...register("description")}
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
              resize="none"
            />
          </FormControl>
        </GridItem>
      </Grid>

      <Button type="submit" colorScheme="purple" variant="solid" w="full" mt={6}>
        Submit Enquiry
      </Button>
    </Box>
  );
};

export default EnquiryForm;
