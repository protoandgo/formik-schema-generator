// Types
import FormikBuilder from ".";
import { ArrayInput, FormTitle, SubmitButton, RedErrorBelow, TextInput } from "../FormikBuilderComponents/antd";
import { schema } from "./utils/types";

const FormikBuilderExample = () => {
    const schema: schema = {
      title: "Invite Friends",
      submitButtonText: "Invite",
      fields: [
        {
          name: "dias",
          type: "number",
        },
        {
          label: "Your phone",
          name: "phone",
          type: "phone",
          enabled: "values.yourname === 'keyy'"
        },
        {
          name: "yourname",
          label: "Your Name",
          type: "text",
          required: true,
          min: 4,
        },
        {
          name: "friends",
          label: "Friends",
          type: "array",
          fields: [
            {
              name: "name",
              label: "Name",
              type: "text",
            },
            {
              name: "email",
              label: "Email",
              type: "email",
            },
          ],
        },
      ],
    };
    return (
      <FormikBuilder
        schema={schema}
        initialValues={{
          yourname: "ha",
          // friends: [
          //   {
          //     name: "Hola",
          //     email: ""
          //   }
          // ]
        }}
        // ui="antd"
        components={{
          // basic
          ArrayInput: ArrayInput,
          FormTitle: FormTitle,
          SubmitButton: SubmitButton,
          RedErrorBelow: RedErrorBelow,
      
          // by type
          text: TextInput,
          email: TextInput,
          phone: TextInput,
          // TextInput: TextInput,
        }}
      />
    );
  };

  export default FormikBuilderExample;