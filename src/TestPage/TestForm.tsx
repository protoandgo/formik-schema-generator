import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, SelectInput, CheckboxInput } from "../components/FormikBuilder/components";

export const TestForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        acceptedTerms: false,
        jobType: ""
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
        lastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
        email: Yup.string().email("Invalid email addresss`").required("Required"),
        acceptedTerms: Yup.boolean().required("Required").oneOf([true], "You must accept the terms and conditions."),
        jobType: Yup.string().oneOf(["designer", "development", "product", "other"],"Invalid Job Type").required("Required")
      })}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        await new Promise((r) => setTimeout(r, 500));
        setSubmitting(false);
      }}
    >
      <Form>
        <TextInput
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Jane"
        />
        <TextInput
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Doe"
        />
        <TextInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="jane@formik.com"
        />
        {/* <SelectInput label="Job Type" name="jobType">
          <option value="">Select a job type</option>
          <option value="designer">Designer</option>
          <option value="development">Developer</option>
          <option value="product">Product Manager</option>
          <option value="other">Other</option>
        </SelectInput>
        <CheckboxInput name="acceptedTerms">
          I accept the terms and conditions
        </CheckboxInput> */}

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default TestForm;