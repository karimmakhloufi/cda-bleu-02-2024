import { useLoginLazyQuery } from "@/generated/graphql-types";

const Login = () => {
  const [login] = useLoginLazyQuery();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const formJson: any = Object.fromEntries(formData.entries());
        // console.log("formjson", formJson);
        login({
          variables: formJson,
          onCompleted: (data) => {
            localStorage.setItem("token", data.login);
          },
          onError: (err) => {
            console.log("error", err);
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
      <button className="button">Login</button>
    </form>
  );
};

export default Login;
