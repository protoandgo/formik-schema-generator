import { TextInput } from "../components/FormikBuilderComponents/antd/TextInput";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./useAnt.css";

export default {
  // dentro de esta historia podemos crear diferentes botones.
  title: "TextInput",
  component: TextInput,
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
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const TextInput1 = Template.bind({}); //new copy of the template function above!
TextInput1.args = {
  enabled: true,
  field: {
    name: "text",
    onchange: () => {},
    value: "Your text here",
  },
  meta: {
    touched: false,
    error: "false",
    value: "textinput",
    initialTouched: true,
  },
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => {},
  fieldInfo: { name: "text", label: "text", type: "text" },
};

