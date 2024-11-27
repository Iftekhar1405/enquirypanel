import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SiGooglegemini } from "react-icons/si";
import Select from "react-select";

const states = [
  { state: "Rajasthan", district: ["Jaipur", "Kota", "Ajmer"] },
  { state: "Chhattisgarh", district: ["Raipur", "Bilaspur", "Ambikapur"] },
];
const country = [
  "China",
  "India",
  "USA",
  "Indonesia",
  "Brazil",
  "Russia",
  "Japan",
  "Mexico",
  "Nigeria",
  "Pakistan",
  "Germany",
  "Philippines",
  "Vietnam",
  "Turkey",
  "United Kingdom",
  "Egypt",
  "France",
  "Thailand",
  "Italy",
  "South Korea",
];

const EnquiryForm = () => {
  const { handleSubmit, register, control, reset, setValue } = useForm();
  const toast = useToast();
  const [selectedState, setSelectedState] = useState("");
  const [selectedDist, setSelectedDist] = useState("");
  const [textArea, setTextArea] = useState("");
  const [aiRes, setAIRes] = useState("");
  const [showAIRes, setShowAIRes] = useState(false);

  useEffect(() => {
    setValue("description", showAIRes ? aiRes : textArea);
  }, [aiRes, textArea, showAIRes, setValue]);

  const onSubmit = async (data) => {
    const finalDescription = showAIRes ? aiRes : textArea;
    data.description = finalDescription;
    // console.log(data);
    try {
      const res = await axios.post("http://localhost:5000/enquiry", data);

      toast({
        title: "Enquiry Submitted",
        description: "Form data has been submitted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      reset();
      setAIRes("");
      setTextArea("");
    } catch (error) {
      toast({
        title: "Enquiry not submitted",
        description: "Form data has not been submitted successfully.",
        status: "error",
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

  const genAI = new GoogleGenerativeAI(
    "AIzaSyCV5D1rcZ3EN9sa0l7elScHMnawyAmEiUM"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  async function genRes() {
    const res =
      await model.generateContent(`hey i am the parent of a child and i want to write an enquirt
      description for a school(in their website) i want my child to get admitted in i wrote a raw description here, please enhance it
      but dont add any water mark or formality text, i want to directly paste it, here is my desc: ${textArea}.
      dont give any input fields with [] brackets, make it general, i am showing this response directly on the website `);
    console.log(res.response.text());
    setAIRes(res.response.text());
    setShowAIRes(true);
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      bg="gray.800"
      rounded="md"
      w="full"
      color="white"
      boxShadow="lg"
      m="auto"
    >
      <button onClick={genRes}> get res</button>.
      <Text>
        <span style={{ color: "red" }}>*</span> means the field are required
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={5}>
        <GridItem colSpan={1} border="1px solid white" p={10} rounded={"md"}>
          <Text fontSize="xl" fontWeight="bold" mb={10}>
            Guardian's Details
          </Text>
          <FormControl mb={6}>
            <FormLabel htmlFor="guardianName">
              Guardian's Name <span style={{ color: "red" }}>*</span>
            </FormLabel>
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
            <FormLabel htmlFor="phone">
              Phone <span style={{ color: "red" }}>*</span>
            </FormLabel>
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
        <GridItem colSpan={1} border="1px solid white" p={10} rounded={"md"}>
          <Text fontSize="xl" fontWeight="bold" mb={10}>
            Student's Details
          </Text>
          <FormControl mb={6}>
            <FormLabel htmlFor="studentFirstName">
              Student's First Name <span style={{ color: "red" }}>*</span>
            </FormLabel>
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
            <FormLabel htmlFor="studentLastName">
              Student's Last Name <span style={{ color: "red" }}>*</span>
            </FormLabel>
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
            <FormLabel htmlFor="gender">
              Gender <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <RadioGroup defaultValue="female" defaultChecked="female">
              <Stack direction={"column"}>
                <Radio
                  {...register("gender", { required: true })}
                  value="male"
                  colorScheme="red"
                >
                  Male
                </Radio>
                <Radio
                  {...register("gender", { required: true })}
                  value="female"
                  colorScheme="red"
                >
                  Female
                </Radio>
                <Radio
                  {...register("gender", { required: true })}
                  value="other"
                  colorScheme="red"
                >
                  Other
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl mb={6}>
            <FormLabel htmlFor="grade">
              Grade Applying For <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Controller
              name="grade"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={gradeOptions}
                  placeholder="Select a grade"
                  value={
                    field.value
                      ? gradeOptions.find(
                          (option) => option.value === field.value
                        )
                      : null
                  } // Only set value if field.value is truthy
                  onChange={(option) =>
                    field.onChange(option ? option.value : null)
                  } // Ensure value is null if no option selected
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
                      "&:hover": {
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
            <FormLabel htmlFor="dob">
              Date of Birth <span style={{ color: "red" }}>*</span>
            </FormLabel>
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
            <FormLabel htmlFor="hostel">
              Do you want to enroll for our Hostel{" "}
              <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <RadioGroup defaultValue="true" defaultChecked="true">
              <Stack direction={"row"}>
                <Radio
                  {...register("hostel", { required: true })}
                  value="true"
                  colorScheme="red"
                >
                  Yes
                </Radio>
                <Radio
                  {...register("hostel", { required: true })}
                  value="false"
                  colorScheme="red"
                >
                  No
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1} border="1px solid white" p={10} rounded={"md"}>
          <Text fontSize="xl" fontWeight="bold" mb={10}>
            Address
          </Text>
          <FormControl mb={6}>
            <FormLabel htmlFor="country">Countries</FormLabel>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="filled"
                    bg="gray.700"
                    _hover={{ bg: "gray.600" }}
                  >
                    {field.value || "Select Country"}
                  </MenuButton>
                  <MenuList bg="#2d3748">
                    {country.map((option) => (
                      <MenuItem
                        key={option}
                        onClick={() => {
                          field.onChange(option);
                        }}
                        bg="#2d3748"
                        color="white"
                        _hover={{ backgroundColor: "#4a5568" }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel htmlFor="state">State</FormLabel>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="filled"
                    bg="gray.700"
                    _hover={{ bg: "gray.600" }}
                  >
                    {field.value || "Select State"}
                  </MenuButton>
                  <MenuList bg="#2d3748">
                    {states.map((option) => (
                      <MenuItem
                        key={option.state}
                        onClick={() => {
                          setSelectedState(option.state);
                          field.onChange(option.state);
                        }}
                        bg="#2d3748"
                        color="white"
                        _hover={{ backgroundColor: "#4a5568" }}
                      >
                        {option.state}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )}
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel htmlFor="city">City</FormLabel>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="filled"
                    bg="gray.700"
                    _hover={{ bg: "gray.600" }}
                  >
                    {field.value || "Select District"}
                  </MenuButton>
                  <MenuList bg="#2d3748">
                    {states
                      .find((state) => state.state === selectedState)
                      ?.district.map((dist) => (
                        <MenuItem
                          key={dist}
                          onClick={() => {
                            setSelectedDist(dist);
                            field.onChange(dist);
                          }}
                          bg="#2d3748"
                          color="white"
                          _hover={{ backgroundColor: "#4a5568" }}
                        >
                          {dist}
                        </MenuItem>
                      ))}
                  </MenuList>
                </Menu>
              )}
            />
          </FormControl>

          <FormLabel htmlFor="street">
            street <span style={{ color: "red" }}>*</span>
          </FormLabel>
          <Input
            id="street"
            {...register("street", { required: true })}
            variant="filled"
            focusBorderColor="red.400"
            bg="gray.700"
            _hover={{ bg: "gray.600" }}
          />
          {/* <FormLabel htmlFor="city">city</FormLabel>
            <Input
              id="city"
              {...register("city", { required: true })}
              variant="filled"
              focusBorderColor="red.400"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
            /> */}
          {/* <FormLabel htmlFor="state">state</FormLabel>
            <Input
              id="state"
              {...register("state", { required: true })}
              variant="filled"
              focusBorderColor="red.400"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
            /> */}
          <FormLabel htmlFor="zip">
            zip <span style={{ color: "red" }}>*</span>
          </FormLabel>
          <Input
            id="zip"
            {...register("zip", { required: true })}
            variant="filled"
            focusBorderColor="red.400"
            bg="gray.700"
            _hover={{ bg: "gray.600" }}
          />
          {/* <FormLabel htmlFor="country">country</FormLabel>
            <Input
              id="country"
              {...register("country", { required: true })}
              variant="filled"
              focusBorderColor="red.400"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
            /> */}

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
            <FormLabel htmlFor="description">Description of Enquiry</FormLabel>
            {showAIRes ? (
              <>
                <Textarea
                  id="description"
                  {...register("description")}
                  bg="gray.700"
                  _hover={{ bg: "gray.600" }}
                  resize="none"
                  setV
                  value={aiRes}
                  onChange={(e) => setAIRes(e.target.value)}
                />
                <Button onClick={() => setShowAIRes(false)} mt={4}>
                  Switch to my Description
                </Button>
              </>
            ) : (
              <>
                <Textarea
                  id="description"
                  {...register("description")}
                  bg="gray.700"
                  _hover={{ bg: "gray.600" }}
                  resize="none"
                  value={textArea}
                  onChange={(e) => setTextArea(e.target.value)}
                />
                <Button onClick={genRes} mt={4}>
                  Enhance with AI <SiGooglegemini />
                </Button>
              </>
            )}
          </FormControl>
        </GridItem>
      </Grid>
      <Button type="submit" colorScheme="teal" variant="solid" w="full" mt={6}>
        Submit Enquiry
      </Button>
    </Box>
  );
};

export default EnquiryForm;
