import { DateInput } from "../components/FormikBuilderComponents/antd/DateInput";

export default {
  // dentro de esta historia podemos crear diferentes botones.
  title: "DateInput",
  component: DateInput,
};

const Template = (args) => <DateInput text={""} {...args} />;

export const DateInput1 = Template.bind({}); //new copy of the template function above!
DateInput1.args = {
  text: "Date1",
};

export const DateInput2 = Template.bind({});
DateInput2.args = {
  text: "Date2",
};
