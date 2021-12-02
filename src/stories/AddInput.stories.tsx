import { AddInput } from "../components/FormikBuilderComponents/antd/AddInput";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { boolean } from "yup/lib/locale";
import './useAnt.css';

export default {
  title: "AddInput",
  component: AddInput,
  argTypes: {
    enabled: { control: boolean },
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
  enabled: true,
  field: { undefined },
  fieldInfo: undefined ,
  
};
