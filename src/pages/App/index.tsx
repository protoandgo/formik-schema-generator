// https://codesandbox.io/s/github/tchaumeny/formik-schema/tree/master/demo?file=/src/forms.jsx:1798-1804
// https://github.com/tchaumeny/formik-schema

import FormikBuilder from "../../components/FormikBuilder";

  // TODO coger datos iniciales desde el servidor cuando lo tengamos
  const initialValues = {
    firstName: "Lamarr"
  }

const App = () => {
  return (<>
    <h1>FORMULARIO</h1>
    <FormikBuilder
      fields={[
        {
          name: 'firstName',
          label: 'First Name: ',
          type: 'text',
          required: true,
        },
        {
          name: 'secondName',
          label: 'Second Name: ',
          type: 'text',
          required: false,
        }
      ]}
      errorMessageRequired="Required"
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    />
  </>
);
}

export default App;
