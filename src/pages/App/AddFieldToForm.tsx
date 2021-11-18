import { useState } from "react";
import FormikBuilder, {
  Field,
  FieldType,
} from "../../components/FormikBuilder";

type AddFieldToFormProps = {
  onSubmit: (field: Field) => void;
};
const AddFieldToForm = (props: AddFieldToFormProps) => {
  const { onSubmit } = props;
  const handleSubmit = (values: []) => {
    const field: Field = {
      label: "",//values.label,
      name: "",
      type: "number",
    };
  };
  const [typeSelected, setTypeSelected] = useState<FieldType>("text");
  const [formFields, setFormFields] = useState<Field[]>([]);
  return (
    <>
      <span>Añade un campo al formulario:</span>
      <select onChange={(e) => setTypeSelected(e.target.value as FieldType)}>
        <option value="text">Text</option>
        <option value="select">Select</option>
        <option value="checkbox">Checkbox</option>
      </select>
      {/* <button onClick={() => onSubmit()}>AÑADIR</button> */}
      <FormikBuilder
        fields={[
          {
            label: "Name of variable:",
            name: "name",
            type: "text",
          },
          {
            label: "Type of variable:",
            name: "name",
            type: "select",
            options: [
              { value: "text", title: "Text" },
              { value: "select", title: "Select" },
              { value: "checkbox", title: "Checkbox" },
            ],
          },
        ]}
        initialValues={{}}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddFieldToForm;
