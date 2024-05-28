import { useCreateNewUserMutation } from "@/generated/graphql-types";

const Register = () => {
  const [createUser] = useCreateNewUserMutation();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const formJson: any = Object.fromEntries(formData.entries());
        // console.log("formjson", formJson);
        createUser({
          variables: formJson,
          onCompleted: () => {
            console.log("completed");
          },
          onError: (err) => {
            console.log("error ", err);
          },
        });
      }}
    >
      <label>
        email:
        <input className="text-field" name="email" />
      </label>
      <br />
      <label>
        password:
        <input type="password" className="text-field" name="password" />
      </label>
      <br />
      <button className="button">Register</button>
    </form>
  );
};

export default Register;
