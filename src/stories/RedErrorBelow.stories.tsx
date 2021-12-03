import { RedErrorBelow } from "../components/FormikBuilderComponents/antd/BasicComponents";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./useAnt.css";

export default {
  title: "RedErrorBelow",
  component: RedErrorBelow,
  argTypes: {
    error: {undefined},
    value: {undefined},
    touched: {undefined},
    initialTouched: {undefined},
  },
} as ComponentMeta<typeof RedErrorBelow>;

const Template: ComponentStory<typeof RedErrorBelow> = (args) => <RedErrorBelow {...args} />;

export const RedErrorBelow1 = Template.bind({});
RedErrorBelow1.args = {
  
  meta: {
    error: 'You have an error!',
    value: "rederror",
    touched: true,
    initialTouched: true,
  },

};
