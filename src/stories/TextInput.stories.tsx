import { TextInput } from "../components/FormikBuilderComponents/antd/TextInput";
//import TextInputProps from "../components/FormikBuilderComponents/ant"

export default {
  // dentro de esta historia podemos crear diferentes botones.
  title: "TextInput",
  component: TextInput,
};

const Template = (args) => <TextInput text={""} {...args} />;

export const TextInput1 = Template.bind({}); //new copy of the template function above!
TextInput1.args = {
  text: "TextInput1",
};

export const TextInput2 = Template.bind({});
TextInput2.args = {
  text: "TextInput2",
};
