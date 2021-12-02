import { FormTitle } from "../components/FormikBuilderComponents/antd/BasicComponents";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
    title: "FormTitle",
    component: FormTitle,
    argTypes: {
        text: { control: "text" },
  },
} as ComponentMeta<typeof FormTitle>;

const Template:ComponentStory<typeof FormTitle> = (args) => <FormTitle {...args} />;

export const FormTitle1 = Template.bind({});
FormTitle1.args = {
    text: 'This is  A TITLE'
};
