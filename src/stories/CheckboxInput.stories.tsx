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
  meta: {
    touched: false,
    initialTouched: true,
    error: "There was an error",
    value: false,
  },
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => {},
  fieldInfo: { id: "testinput", label: "Test Input", type: "checkbox" },
  inputProps: {
    name: "testinput",
    onChange: () => {},
    onBlur: () => {},
    value: true,
    disabled: false,
  }
};
