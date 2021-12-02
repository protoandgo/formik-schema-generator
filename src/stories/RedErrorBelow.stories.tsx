import { RedErrorBelow } from "../components/FormikBuilderComponents/antd/BasicComponents";

export default {
  title: "RedErrorBelow",
  component: RedErrorBelow,
};

const Template = (args) => <RedErrorBelow {...args} />;

export const RedErrorBelow1 = Template.bind({});
RedErrorBelow1.args = {
  value: undefined,
  touched: true,
  initialTouched: false,
  error: "error",
};
