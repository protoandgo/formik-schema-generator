import { render } from "react-dom";
import { Formik, Form, FieldArray, Field } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  users: Yup.array().of(
    Yup.object().shape({
      userName: Yup.string().required("Required"),
      hobbies: Yup.array().of(Yup.object().shape({ hobby: Yup.string().required("Required") })),
    })
  ),
});
const TestPage = () => (
  <div>
    <h1>Users</h1>
    <Formik
      initialValues={{ users: [{ userName: "", hobbies: [{ hobby: "" }] }] }}
      onSubmit={(values) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
      validationSchema={schema}
      render={({ values, errors }) => (
        <Form>
          <FieldArray
            name="users"
            render={(usersArrayHelper) => (
              <div>
                {values.users && values.users.length <= 0
                  ? null
                  : values.users.map((user, userIndex) => (
                      <div key={userIndex}>
                        <label htmlFor={values.users[userIndex].userName}>User Name</label>
                        <Field name={`users.${userIndex}.userName`} />
                        <FieldArray
                          name={`users.${userIndex}.hobbies`}
                          render={(hobbiesArrayHelper) => (
                            <div>
                              {values.users[userIndex].hobbies && values.users[userIndex].hobbies.length > 0 ? (
                                <div style={{ marginLeft: 10, marginTop: 10 }}>
                                  <label>Hobby</label>
                                  {values.users[userIndex].hobbies.map((hobby, hobbyIndex) => {
                                    return (
                                      <div>
                                        <Field
                                          id={`users.${userIndex}.hobbies.${hobbyIndex}.hobby`}
                                          name={`users.${userIndex}.hobbies.${hobbyIndex}.hobby`}
                                        />
                                        <button type="button" onClick={() => hobbiesArrayHelper.remove(hobbyIndex)}>
                                          -
                                        </button>
                                        <button type="button" onClick={() => hobbiesArrayHelper.push({})}>
                                          +
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <button type="button" onClick={() => hobbiesArrayHelper.push({})}>
                                  Add new hobby
                                </button>
                              )}
                            </div>
                          )}
                        />
                      </div>
                    ))}
                <div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          />
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Form>
      )}
    />
  </div>
);

export default TestPage;
