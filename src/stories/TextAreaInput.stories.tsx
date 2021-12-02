import { TextAreaInput } from "../components/FormikBuilderComponents/antd/TextAreaInput";

export default {
  // dentro de esta historia podemos crear diferentes botones.
  title: "TextAreaInput",
  component: TextAreaInput,
};

const Template = (args) => <TextAreaInput text={""} {...args} />;

export const TextAreaInput1 = Template.bind({}); //new copy of the template function above!
TextAreaInput1.args = {
  text: "Textarea1",
};

export const TextAreaInput2 = Template.bind({});
TextAreaInput2.args = {
  text: "Textarea2",
};
