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
  field: {
    name: "TextArea Input",
    onchange: () => {},
    value: "Insert any text...",
  },
  meta: {
    touched: false,
    error: "false",
    value: "textareainput",
    initialTouched: true,
  },
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => {},
  fieldInfo: { name: "textarea", label: "textarea", type: "textarea", rows: 3 },
};

