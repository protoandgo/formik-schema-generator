import { SubmitButtonProps } from '../components/FormikBuilder2/utils/types';
import { SubmitButton } from '../components/FormikBuilderComponents/antd/BasicComponents'
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default { // dentro de esta historia podemos crear diferentes botones.
    title: 'SubmitButton',
    component: SubmitButton
};

const Template = (args) => <SubmitButton {...args}/>


export const SubmitButton1 = Template.bind({}); //new copy of the template function above!
SubmitButton1.args = {
    text: 'Submit a lot!'
};

export const SubmitButton2 = Template.bind({});
SubmitButton2.args = {
    text: 'Submit even more!'
};
