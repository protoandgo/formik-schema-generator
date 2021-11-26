// IMPORT: Ant Design:
import { Card } from "antd";

// IMPORT: React:
import React from "react";

// IMPORT: Formik Builder:
import FormikBuilder from "../../components/FormikBuilder";
import AddInput from "../../components/FormikBuilder/components/AddInput";
import { FormSchema } from "../../components/FormikBuilder/utils/types";

// Write Form Schema:
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
      visible: "values.firstName !== ''",
    },
    {
      name: "dayy",
      label: "DIA : ",
      type: "date",
    },
    {
      name: "pass",
      type: "passwordconfirm",
      passwordFieldName: "password",
    },
    {
      name: "selecttt",
      label: "SELECIONA: ",
      type: "select",
      options: {
        option1: "OPTION NUMBER 1",
        option2: "OPTION NUMBER two",
        option3: "THIRD OPTION!!!",
      },
    },
    {
      name: "checkboxxxx",
      label: "SI O NO  : ",
      type: "checkbox",
    },
  ],
};

// TODO coger datos iniciales desde el servidor cuando lo tengamos
const exampleData = {
  firstName: "Lamarr",
};

// Functional Component:
const App = () => {
  return (
    <React.Fragment>
      <Card>
        <h1>FORMULARIO</h1>
        <FormikBuilder
          formSchema={exampleSchema}
          initialValues={exampleData}
          onSubmit={(values) => console.log(values)}
        />
      </Card>
      <AddInput/>
    </React.Fragment>
  );
};

// Export:
export default App;
