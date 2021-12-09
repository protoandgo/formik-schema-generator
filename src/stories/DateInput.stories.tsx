import { DateInput } from "../components/FormikBuilderComponents/antd/DateInput";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./useAnt.css";
import moment from "moment";

export default {
  title: "DateInput",
  component: DateInput,
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
} as ComponentMeta<typeof DateInput>;

const Template: ComponentStory<typeof DateInput> = (args) => <DateInput {...args} />;

export const DateInput1 = Template.bind({}); //new copy of the template function above!
DateInput1.args = {
  meta: {
    touched: false,
    initialTouched: true,
    error: "There was an error",
    value: moment(),
  },
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => {},
  fieldInfo: { id: "testinput", label: "Test Input", type: "date" },
  inputProps: {
    name: "testinput",
    onChange: () => {},
    onBlur: () => {},
    value: true,
    disabled: false,
  }
};

