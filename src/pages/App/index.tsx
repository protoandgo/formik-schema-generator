/* eslint-disable @typescript-eslint/no-unused-vars */
// IMPORT: Ant Design:
import { Card, Row } from "antd";

// IMPORT: React:
import React from "react";

// IMPORT: Formik Builder:
import { FormSchema } from "../../components/FormikBuilder/utils/types";
import FormikBuilderExample from "../../components/FormikBuilder2";

// Write Form Schema:
const exampleSchema: FormSchema = {
  fields: [
    {
      name: "user",
      label: "USUARIO",
      type: "box",
      fields: [
        {
          name: "firstName",
          label: "First Name: ",
          type: "text",
          // required: true,
        },
        {
          name: "secondName",
          label: "Second Name: ",
          type: "text",
          required: true,
          visible: "values.firstName !== ''",
        },
      ],
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
      <Row justify="center" align="middle" style={{ height: "100vh", width: "100vw" }}>
        <Card style={{ margin: "30px", marginBottom: "120px", width: "500px" }}>
          {/* <FormikBuilder
            title={"FORMULARIO"}
            formSchema={exampleSchema}
            initialValues={exampleData}
            onSubmit={(values) => console.log(values)}
          /> */}
          {/* <TestPage/> */}
          {/* <TestPage2 /> */}
          <FormikBuilderExample />
        </Card>
      </Row>
    </React.Fragment>
  );
};

// Export:
export default App;
