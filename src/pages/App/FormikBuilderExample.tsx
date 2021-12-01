// Types
import FormikBuilder from "../../components/FormikBuilder2";
import { ArrayInput, TextInput, FormTitle, SubmitButton, NumberInput, CheckboxInput, DateInput, SelectInput, TextAreaInput, AddInput } from "../../components/FormikBuilderComponents/antd";
import { schema } from "../../components/FormikBuilder2/utils/types";

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
      
          // by type
          text: TextInput,
          email: TextInput,
          phone: TextInput,
          number: NumberInput,
          checkbox: CheckboxInput,
          date: DateInput,
          select: SelectInput,
          textarea: TextAreaInput,
          addinput: AddInput,
          // TextInput: TextInput,
        }}
      />
    );
  };

  export default FormikBuilderExample;