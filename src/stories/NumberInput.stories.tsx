import { NumberInput } from "../components/FormikBuilderComponents/antd/NumberInput";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./useAnt.css";

export default {
  // dentro de esta historia podemos crear diferentes botones.
  title: "NumberInput",
  component: NumberInput,
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
} as ComponentMeta<typeof NumberInput>;

const Template: ComponentStory<typeof NumberInput> = (args) => <NumberInput {...args} />;

export const NumberInput1 = Template.bind({}); //new copy of the template function above!
NumberInput1.args = {
  meta: {
    touched: false,
    initialTouched: true,
    error: "There was an error",
    value: 0,
  },
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => {},
  fieldInfo: { id: "testinput", label: "Test Input", type: "number" },
  inputProps: {
    name: "testinput",
    onChange: () => {},
    onBlur: () => {},
    value: true,
    disabled: false,
  }
};

