import { TextAreaInput } from "../components/FormikBuilderComponents/antd/TextAreaInput";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./useAnt.css";

export default {
  // dentro de esta historia podemos crear diferentes botones.
  title: "TextAreaInput",
  component: TextAreaInput,
  argTypes: {
    enabled: { undefined },
    field: { undefined },
    meta: { undefined },
    setFieldValue: {
      function(field: string, value: any, shouldValidate?: boolean): void {
        throw new Error("Function not implemented.");
      },
    },
    fieldInfo: { undefined },
  },
} as ComponentMeta<typeof TextAreaInput>;

const Template: ComponentStory<typeof TextAreaInput> = (args) => <TextAreaInput {...args} />;

export const TextAreaInput1 = Template.bind({}); //new copy of the template function above!
TextAreaInput1.args = {
  meta: {
    touched: false,
    initialTouched: true,
    error: "There was an error",
    value: "",
  },
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => {},
  fieldInfo: { id: "testinput", label: "Test Input", type: "textarea", rows: 3 },
  inputProps: {
    name: "testinput",
    onChange: () => {},
    onBlur: () => {},
    value: true,
    disabled: false,
  }
};

