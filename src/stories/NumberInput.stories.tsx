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
  field: {
    name: "Number Input",
    onchange: () => {},
    value: 0,
  },
  meta: {
    touched: false,
    error: "false",
    value: "numberinput",
    initialTouched: true,
  },
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => {},
  fieldInfo: { name: "number", label: "number", type: "number" },
};

