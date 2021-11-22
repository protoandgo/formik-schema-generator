// Formik & Yup:
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { BooleanSchema, DateSchema, NumberSchema } from "yup";
import StringSchema from "yup/lib/string";

// Component for different types of fields:
import { Checkbox, DateInput, Select, TextInput } from "./components";

// Types:
import {
  Field,
  Field_VisibilityFilter_FieldComparisonOtherField,
  Field_VisibilityFilter_FieldComparisonValue,
  Field_VisibilityFilter_FieldEmpty,
  FormSchema,
} from "./types";

// Functional Component:
type FormikBuilderProps = {
  schema: FormSchema;
  errorMessageRequired: string;
  initialValues?: {};
  onSubmit: (values: {}) => void;
};

const FormikBuilder = (props: FormikBuilderProps) => {
  // =========================== Build Initial Values by Field =========================== //

  const BuildInitValues = (
    fields: Field[],
    initialValues: {} | undefined
  ): {} => {
    let obj: { [x: string]: string | number | boolean } = {};
    fields.forEach((x) => {
      switch (x.type) {
        case "checkbox":
          obj[x.name] = x.startChecked === true;
          break;
        case "date":
          break; // TODO
        case "email":
          obj[x.name] = "";
          break;
        case "number":
          obj[x.name] = 0;
          break;
        case "select":
          obj[x.name] = "";
          break;
        case "text":
          obj[x.name] = "";
          break;
      }
    });
    if (initialValues) {
      Object.assign(obj, initialValues); //obj = {...obj, ...initialValues};
    }
    return obj;
  };

  // =========================== Build Component by Field =========================== //

  const ref = useRef<any>(); // any ?

  const ShouldBeVisible = (field: Field): boolean => {
    const formValues = ref?.current?.values || initialValues;
    if (formValues) {
      // console.log("Checking form values");
      field.visibility?.forEach((x) => {
        if (x.hasOwnProperty("field")) {
          if (x.hasOwnProperty("otherField")) {
            const xAs = x as Field_VisibilityFilter_FieldComparisonOtherField;
            switch (xAs.is) {
              case "less than":
                return formValues[xAs.field] < formValues[xAs.otherField];
              case "equal":
                return formValues[xAs.field] === formValues[xAs.otherField];
              case "more than":
                return formValues[xAs.field] > formValues[xAs.otherField];
            }
          } else if (x.hasOwnProperty("value")) {
            const xAs = x as Field_VisibilityFilter_FieldComparisonValue;
            switch (xAs.is) {
              case "less than":
                return formValues[xAs.field] < xAs.value;
              case "equal":
                return formValues[xAs.field] === xAs.value;
              case "more than":
                return formValues[xAs.field] > xAs.value;
            }
          } else {
            const xAs = x as Field_VisibilityFilter_FieldEmpty;
            console.log(xAs);
            switch (xAs.is) {
              case "empty":
                console.log(xAs.field + " is empty?");
                return formValues[xAs.field].toString() === "";
              case "not empty":
                console.log(
                  xAs.field +
                    " is not empty? " +
                    (formValues[xAs.field].toString() !== "")
                );
                return formValues[xAs.field].toString() !== "";
            }
          }
        }
      });
    }
    return true;
  };

  const [fieldsVisible, setFieldsVisible] = useState<{
    [x: string]: boolean;
  }>({});
  const BuildFields = (fields: Field[]): React.ReactNode => {
    // Generate onChange functions
    // por cada field,
    //   por cada visibility,
    //     si depende de otro field,
    //       apartar ese visibility a una lista para ese field concreto (si ya existe, push)
    // por cada field de esa lista,
    //   generar un onBlur basado en esas visibilities
    const onBlurFunctions: { [x: string]: () => void } = {};
    fields.forEach((field) => {
      // const formValues = ref?.current?.values || initialValues;
      field.visibility?.forEach((x) => {
        if (x.hasOwnProperty("field")) {
          if (x.hasOwnProperty("otherField")) {
            const xAs = x as Field_VisibilityFilter_FieldComparisonOtherField;
            switch (xAs.is) {
              case "less than":
                // return formValues[xAs.field] < formValues[xAs.otherField];
                onBlurFunctions[field.name] = () => {
                  const formValues = ref?.current?.values || initialValues;
                  setFieldsVisible({
                    ...fieldsVisible,
                    [xAs.field]:
                      (formValues || initialValues)[xAs.field] <
                      (formValues || initialValues)[xAs.otherField],
                  });
                };
                break;
              case "equal":
                // return formValues[xAs.field] === formValues[xAs.otherField];
                onBlurFunctions[field.name] = () => {
                  const formValues = ref?.current?.values || initialValues;
                  setFieldsVisible({
                    ...fieldsVisible,
                    [xAs.field]:
                      (formValues || initialValues)[xAs.field] ===
                      (formValues || initialValues)[xAs.otherField],
                  });
                };
                break;
              case "more than":
                // return formValues[xAs.field] > formValues[xAs.otherField];
                onBlurFunctions[field.name] = () => {
                  const formValues = ref?.current?.values || initialValues;
                  setFieldsVisible({
                    ...fieldsVisible,
                    [xAs.field]:
                      (formValues || initialValues)[xAs.field] >
                      (formValues || initialValues)[xAs.otherField],
                  });
                };
                break;
            }
          } else if (x.hasOwnProperty("value")) {
            const xAs = x as Field_VisibilityFilter_FieldComparisonValue;
            switch (xAs.is) {
              case "less than":
                // return formValues[xAs.field] < xAs.value;
                onBlurFunctions[field.name] = () => {
                  const formValues = ref?.current?.values || initialValues;
                  setFieldsVisible({
                    ...fieldsVisible,
                    [xAs.field]:
                      (formValues || initialValues)[xAs.field] < xAs.value,
                  });
                };
                break;
              case "equal":
                // return formValues[xAs.field] === xAs.value;
                onBlurFunctions[field.name] = () => {
                  const formValues = ref?.current?.values || initialValues;
                  setFieldsVisible({
                    ...fieldsVisible,
                    [xAs.field]:
                      (formValues || initialValues)[xAs.field] === xAs.value,
                  });
                };
                break;
              case "more than":
                // return formValues[xAs.field] > xAs.value;
                onBlurFunctions[field.name] = () => {
                  const formValues = ref?.current?.values || initialValues;
                  setFieldsVisible({
                    ...fieldsVisible,
                    [xAs.field]:
                      (formValues || initialValues)[xAs.field] > xAs.value,
                  });
                };
                break;
            }
          } else {
            const xAs = x as Field_VisibilityFilter_FieldEmpty;
            console.log(xAs);
            switch (xAs.is) {
              case "empty":
                // console.log(xAs.field + " is empty?");
                // return formValues[xAs.field].toString() === "";
                onBlurFunctions[field.name] = () => {
                  const formValues = ref?.current?.values || initialValues;
                  setFieldsVisible({
                    ...fieldsVisible,
                    [xAs.field]:
                      (formValues || initialValues)[xAs.field] === "",
                  });
                };
                break;
              case "not empty":
                // console.log( xAs.field + " is not empty? " + (formValues[xAs.field].toString() !== ""));
                // return formValues[xAs.field].toString() !== "";
                onBlurFunctions[field.name] = () => {
                  const formValues = ref?.current?.values || initialValues;
                  setFieldsVisible({
                    ...fieldsVisible,
                    [xAs.field]:
                      (formValues || initialValues)[xAs.field] !== "",
                  });
                };
                break;
            }
          }
        }
      });

      // onBlurFunctions[field.name] = () => {
      //   // if (ref?.current?.values) console.log(ref.current.values);
      //   // console.log(field.visibility);
      //   // field?.visibility?.map(x => {
      //   //   x.
      //   // });
      //   return ShouldBeVisible(field);
      // };
    });
    // R
    return fields.map((x) => {
      // if (ShouldBeVisible(x)) {
      // console.log(x.name + " should be visible");
      // console.log(x.name + " --- " + fieldsVisible[x.name]);
      console.log(fieldsVisible);
      const additionalProps = {
        // visible: ShouldBeVisible(x),
        visible: fieldsVisible[x.name],
        key: x.name,
        onBlur: onBlurFunctions[x.name],
      };
      switch (x.type) {
        case "text":
          return <TextInput {...additionalProps} {...x} />;
        // case "textArea":
        //   return <TextAreaInput key={x.name} {...x} />;
        case "select":
          return <Select {...additionalProps} {...x} />;
        case "checkbox":
          return <Checkbox {...additionalProps} {...x} />;
        case "date":
          return <DateInput {...additionalProps} {...x} />;
        default:
          return <></>;
      }
      // } else return <></>;
    });
  };

  // =========================== Build Validation by Field =========================== //

  type YupSchema = BooleanSchema | StringSchema | NumberSchema | DateSchema;
  const BuildYup = (fields: Field[], errorMessageRequired: string) => {
    let obj: { [x: string]: YupSchema } = {};
    fields.forEach((x) => {
      let prop: YupSchema = Yup.string();
      switch (x.type) {
        case "checkbox":
          prop = Yup.boolean();
          break;
        case "date":
          break; // TODO
        case "email":
          prop = Yup.string().email("Invalid email addresss`");
          break;
        case "number":
          prop = Yup.number();
          break;
        case "select":
          prop = Yup.string();
          break;
        case "text":
          prop = Yup.string().max(15, "Must be 15 characters or less");
          break;
      }
      if (x.required) prop = prop.required(errorMessageRequired);
      obj[x.name] = prop;
    });
    return Yup.object(obj);
    // TODO mas personalización & mostrar o no mostrar ciertos campos según lo que haya en otros
  };

  // =========================== Functional Component =========================== //

  const { errorMessageRequired, initialValues, onSubmit } = props;
  const fields = props.schema.fields;

  const handleSubmit = (values: {}) => {
    // TODO si no se ha podido enviar al servidor, mostrar ese error al usuario
    onSubmit(values);
  };

  return (
    <Formik
      innerRef={ref}
      initialValues={BuildInitValues(fields, initialValues)}
      validationSchema={BuildYup(fields, errorMessageRequired)}
      onSubmit={async (values, { setSubmitting }) => {
        await new Promise((r) => setTimeout(r, 500));
        setSubmitting(false);
        handleSubmit(values);
      }}
    >
      <Form>
        {BuildFields(fields)}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FormikBuilder;
