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
  field: {
    name: "dateinput",
    onchange: () => {},
    value: moment(),
  },
  meta: {
    touched: false,
    error: "false",
    value: "moment().toISOString()",
    initialTouched: true,
  },
  //setFieldValue: (field: string, value: any, shouldValidate?: boolean) => {},
  fieldInfo: { name: "date", label: "date", type: "date" },
};

