import { SelectInput } from "../components/FormikBuilderComponents/antd/SelectInput";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./useAnt.css";

export default {
  // dentro de esta historia podemos crear diferentes botones.
  title: "SelectInput",
  component: SelectInput,
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
} as ComponentMeta<typeof SelectInput>;

const Template: ComponentStory<typeof SelectInput> = (args) => <SelectInput {...args} />;

export const SelectInput1 = Template.bind({}); //new copy of the template function above!
SelectInput1.args = {
  meta: {
    touched: false,
    initialTouched: true,
    error: "There was an error",
    value: false,
  },
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => {},
  fieldInfo: {
    id: "testinput",
    label: "Test Input",
    type: "select",
    options: { value1: 'string', value2: 'string2' }
  },
  inputProps: {
    name: "testinput",
    onChange: () => {},
    onBlur: () => {},
    value: true,
    disabled: false,
  }
};


