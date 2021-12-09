import { AddInput } from "../components/FormikBuilderComponents/antd/AddInput";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import './useAnt.css';

export default {
  title: "AddInput",
  component: AddInput,
  argTypes: {
    enabled:{ undefined },
    field: { undefined },
    meta: { undefined },
    setFieldValue: {
      function(field: string, value: any, shouldValidate?: boolean): void {
        throw new Error("Function not implemented.");
      },
    },
    fieldInfo: { undefined },
    
  },
} as ComponentMeta<typeof AddInput>;

const Template: ComponentStory<typeof AddInput> = (args) => (
  <AddInput
    {...args }
  />
);

export const AddInput1 = Template.bind({});
AddInput1.args = {
  meta: {
    touched: false,
    initialTouched: true,
    error: "There was an error",
    value: [],
  },
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => {},
  fieldInfo: { id: "testinput", label: "Test Input", type: "addinput" },
  inputProps: {
    name: "testinput",
    onChange: () => {},
    onBlur: () => {},
    value: true,
    disabled: false,
  }
};
