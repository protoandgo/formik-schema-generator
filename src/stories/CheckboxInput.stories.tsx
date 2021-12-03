import { CheckboxInput } from "../components/FormikBuilderComponents/antd/CheckboxInput";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./useAnt.css";

export default {
  title: "CheckboxInput",
  component: CheckboxInput,
  argTypes: { 
    field: { undefined },
    meta: { undefined },
    setFieldValue: {
      function(field: string, value: any, shouldValidate?: boolean): void {
        throw new Error("Function not implemented.");
      },
    },
    fieldInfo: { undefined },
    
  },
} as ComponentMeta<typeof CheckboxInput>;

const Template: ComponentStory<typeof CheckboxInput> = (args) => (
  <CheckboxInput {...args} />
);

export const CheckboxInput1 = Template.bind({});
CheckboxInput1.args = {
  field: {
    name: "checkbox",
    onchange: () => {},
    value: true,
  },
  meta: {
    touched: false,
    error: "false",
    value: "Value",
    initialTouched: true,
  },
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => {},
  fieldInfo: { name: "value", label: "Value", type: "addinput"},
};
