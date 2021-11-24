// IMPORT: Ant Design:
import { Card } from "antd";

// IMPORT: React:
import React from "react";
// IMPORT: Formik Builder:
import FormikBuilder from "../../components/FormikBuilder";
import { FormSchema } from "../../components/FormikBuilder/utils/types";

// Write Form Schema:
const formSchema: FormSchema = {
  fields: [
    {
      name: "firstName",
      label: "First Name: ",
      type: "text",
      max: 20,
      required: true,
    },
    {
      name: "age",
      label: "First Name: ",
      type: "number",
      min: 18,
      max: 100,
      required: true,
      visible: "firstName !== ''",
    },
  ],
};

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
      visible: "firstName !== ''",
      // visibleWhen: [
      //   {
      //     field: "firstName",
      //     is: "not empty",
      //   },
      // ],
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
      // options: [
      //   {
      //     title: "EEE",
      //     value: "eee",
      //   },
      //   {
      //     title: "OOO",
      //     value: "ooo",
      //   },
      // ],
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

const App = () => {
  return (
    <React.Fragment>
      <Card>
        <h1>FORMULARIO</h1>
        <FormikBuilder formSchema={exampleSchema} initialValues={exampleData} onSubmit={(values) => console.log(values)} />
      </Card>
    </React.Fragment>
  );
};

export default App;
