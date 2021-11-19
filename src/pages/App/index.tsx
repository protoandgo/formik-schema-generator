// https://codesandbox.io/s/github/tchaumeny/formik-schema/tree/master/demo?file=/src/forms.jsx:1798-1804
// https://github.com/tchaumeny/formik-schema

import FormikBuilder, {  } from "../../components/FormikBuilder";

const App = () => {
  return (<>
      <h1>FORMULARIO</h1>
      <FormikBuilder
        fields={[
          {
            name: 'aa',
            label: 'eee',
            type: 'text',
          }
        ]}
        initialValues={{
          nameee: "Lamarr"
        }}
        onSubmit={(values) => console.log(values)}
      />
    </>
  );
};

export default App;
