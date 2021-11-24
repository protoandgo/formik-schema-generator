import { useField, FormikTouched, useFormikContext } from "formik";
import { useState, useEffect } from "react";
import {
  TextInput,
  SelectInput,
  CheckboxInput,
  DateInput,
} from "../components";
import UploadInput from "../components/UploadInput";
import {
  Field,
  Field_VisibilityFilter,
  Field_VisibilityFilter_FieldComparisonOtherField,
  Field_VisibilityFilter_FieldComparisonValue,
  Field_VisibilityFilter_FieldEmpty,
} from "./types";

const FilterPasses = (filter: Field_VisibilityFilter, deps: any) => {
  if (filter.hasOwnProperty("field")) {
    if (filter.hasOwnProperty("otherField")) {
      const xAs = filter as Field_VisibilityFilter_FieldComparisonOtherField;
      switch (xAs.is) {
        case "less than":
          return deps[xAs.field] < deps[xAs.otherField];
        case "equal":
          return deps[xAs.field] === deps[xAs.otherField];
        case "more than":
          return deps[xAs.field] > deps[xAs.otherField];
      }
    } else if (filter.hasOwnProperty("value")) {
      const xAs = filter as Field_VisibilityFilter_FieldComparisonValue;
      switch (xAs.is) {
        case "less than":
          return deps[xAs.field] < xAs.value;
        case "equal":
          return deps[xAs.field] === xAs.value;
        case "more than":
          return deps[xAs.field] > xAs.value;
      }
    } else {
      const xAs = filter as Field_VisibilityFilter_FieldEmpty;
      console.log(xAs);
      switch (xAs.is) {
        case "empty":
          console.log(xAs.field + " is empty?");
          return deps[xAs.field] === "";
        case "not empty":
          console.log(
            xAs.field + " is not empty? " + (deps[xAs.field] !== "")
          );
          return deps[xAs.field] !== "";
      }
    }
  }
  return false;
};

const FieldWrapper = (props: {
  fieldParams: Field;
  deps: (boolean | FormikTouched<any> | FormikTouched<any>[] | undefined)[];
}) => {
  const { fieldParams, deps } = props;

  // Component is part of a Formik form
  const [field, meta] = useField({ name: fieldParams.name });

  // TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
  const { values, touched } = useFormikContext();
  // TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT

  // Component visibility
  const [visible, setVisible] = useState(true);

  // Change visibility when specific fields change
  useEffect(() => {
    let v = true;
    if (fieldParams.visibility) {
      console.log(fieldParams.name + "---TIENE!!!!!---");
      console.log("DEPS -----------");
      console.log(deps);
      console.log("----------- DEPS");
      for (let filter of fieldParams.visibility) {
        // if (!FilterPasses(filter, deps)) {
        if (!FilterPasses(filter, values)) {
          v = false;
          break;
        }
      }
    }
    else console.log("-no tiene...");
    setVisible(v);
  // }, [deps, fieldParams.name, fieldParams.visibility]);
  }, [deps, fieldParams.name, fieldParams.visibility, values]);

  // Component by type will need to know that it is in a Formik form
  const additionalProps = {
    field: field,
    meta: meta,
  };

  // Get Component by type
  const componentByType = () => {
    switch (fieldParams.type) {
      case "text":
        return <TextInput {...additionalProps} {...fieldParams} />;
      // case "textArea":
      //   return <TextAreaInput key={x.name} {...fieldParams} />;
      case "select":
        return <SelectInput {...additionalProps} {...fieldParams} />;
      case "checkbox":
        return <CheckboxInput {...additionalProps} {...fieldParams} />;
      case "date":
        return <DateInput {...additionalProps} {...fieldParams} />;
      case "upload":
        return <UploadInput {...additionalProps} {...fieldParams} />
      default:
        return <></>;
    }
  };

  // Return the Component by type with key and visibility
  return (
    <div key={fieldParams.name} hidden={!visible}>
      {componentByType()}
    </div>
  );
};

export default FieldWrapper;