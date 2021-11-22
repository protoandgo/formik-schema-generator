// https://codesandbox.io/s/github/tchaumeny/formik-schema/tree/master/demo?file=/src/forms.jsx:1798-1804
// https://github.com/tchaumeny/formik-schema

import FormikBuilder from "../../components/FormikBuilder";
import { FormSchema } from "../../components/FormikBuilder/types";

// Form Schemas will be stored in a separate file
const exampleSchema: FormSchema = {
  fields: [
    {
      name: "firstName",
      label: "First Name: ",
      type: "text",
      required: true,
    },
    {
      name: "secondName",
      label: "Second Name: ",
      type: "text",
      required: false,
      visibility: [
        {
          field: 'firstName',
          is: 'not empty'
        },
      ],
    },
  ],
};

// TODO coger datos iniciales desde el servidor cuando lo tengamos
const exampleData = {
  firstName: "Lamarr",
};

// TODO intl ?
const errorMessageRequired = "Required";

const App = () => {
  return (
    <>
      <h1>FORMULARIO</h1>
      <FormikBuilder
        schema={exampleSchema}
        errorMessageRequired={errorMessageRequired}
        initialValues={exampleData}
        onSubmit={(values) => console.log(values)}
      />
    </>
  );
};

export default App;
