// https://codesandbox.io/s/github/tchaumeny/formik-schema/tree/master/demo?file=/src/forms.jsx:1798-1804
// https://github.com/tchaumeny/formik-schema

import { useState } from "react";
import FormikBuilder, { Field, FieldType } from "../../components/FormikBuilder";
import AddFieldToForm from "./AddFieldToForm";

const App = () => {
  const [typeSelected, setTypeSelected] = useState<FieldType>('text');
  const [formFields, setFormFields] = useState<Field[]>([]);
  return (<>
      <AddFieldToForm onSubmit={(field) => setFormFields([...formFields, field])} />
      <FormikBuilder
        fields={formFields}
        initialValues={{
          nameee: "Lamarr"
        }}
        onSubmit={(values) => console.log(values)}
      />
    </>
  );
};

export default App;
