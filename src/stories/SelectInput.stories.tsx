import { SelectInput } from "../components/FormikBuilderComponents/antd/SelectInput";

export default {
  // dentro de esta historia podemos crear diferentes botones.
  title: "SelectInput",
  component: SelectInput,
};

const Template = (args) => <SelectInput text={""} {...args} />;

export const SelectInput1 = Template.bind({}); //new copy of the template function above!
SelectInput1.args = {
  text: "Select1",
};

export const SelectInput2 = Template.bind({});
SelectInput2.args = {
  text: "Select2",
};
