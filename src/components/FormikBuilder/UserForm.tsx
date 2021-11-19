import FormikBuilder from ".";

type User = {
  id: string;
  name: string;
  age: number;
  email: string;
}

const UserForm = () => {

  const user: User = {
    id: "",
    name: "",
    age: 0,
    email: ""
  }

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

export default UserForm;