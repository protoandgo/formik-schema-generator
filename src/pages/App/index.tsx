import { Card, Row } from "antd";
import React from "react";

// Examples:
import { FormikBuilderExample } from "../../components/FormikBuilder2";

// Functional Component:
const App = () => {
  return (
    <React.Fragment>
      <Row justify="center" align="middle" style={{ height: "100vh", width: "100vw" }}>
        <Card style={{ margin: "30px", marginBottom: "120px", width: "500px" }}>
          <FormikBuilderExample />
        </Card>
      </Row>
    </React.Fragment>
  );
};

// Export:
export default App;