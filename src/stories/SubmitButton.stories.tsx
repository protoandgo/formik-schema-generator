import { SubmitButton } from '../components/FormikBuilderComponents/antd/BasicComponents'
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./useAnt.css";

export default {
  // dentro de esta historia podemos crear diferentes botones.
  title: "SubmitButton",
  component: SubmitButton,
  argTypes: {
    text: {undefined},
  },
} as ComponentMeta<typeof SubmitButton>;

const Template: ComponentStory<typeof SubmitButton> = (args) => <SubmitButton {...args}/>


export const SubmitButton1 = Template.bind({}); //new copy of the template function above!
SubmitButton1.args = {
    text: 'Submit a lot!'
};

