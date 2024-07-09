import { useRouter } from "next/router";
import { UserContext } from "../components/Layout";
import { useCreateNewUserMutation } from "../generated/graphql-types";
import { useContext } from "react";

const Register = () => {
  const [createUser] = useCreateNewUserMutation();
  const userInfo = useContext(UserContext);
  const router = useRouter();
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
          onCompleted: (data) => {
            console.log("completed");
            localStorage.setItem("token", data.createUser);
            userInfo.refetch();
            router.push("/");
          },
          onError: (err) => {
            console.log("error ", err);
          },
        });
      }}
    >
      <label>
        email:
        <input
          className="text-field"
          name="email"
          defaultValue={"alice@gmail.com"}
        />
      </label>
      <br />
      <label>
        password:
        <input
          type="password"
          className="text-field"
          name="password"
          defaultValue={"test"}
        />
      </label>
      <br />
      <button className="button">Register</button>
    </form>
  );
};

export default Register;
