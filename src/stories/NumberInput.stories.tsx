import { NumberInput } from "../components/FormikBuilderComponents/antd/NumberInput";

export default {
  // dentro de esta historia podemos crear diferentes botones.
  title: "NumberInput",
  component: NumberInput,
};

const Template = (args) => <NumberInput text={""} {...args} />;

export const NumberInput1 = Template.bind({}); //new copy of the template function above!
NumberInput1.args = {
  text: "Number1",
};

export const NumberInput2 = Template.bind({});
NumberInput2.args = {
  text: "Number2",
};
