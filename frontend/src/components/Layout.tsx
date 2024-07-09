import { ReactNode } from "react";
import Header from "./Header";
import { useWhoAmIQuery } from "@/generated/graphql-types";
import { createContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  email: "",
  role: "",
  refetch: () => {},
});

const Layout = ({ children }: { children: ReactNode }) => {
  const { data, error, loading, refetch } = useWhoAmIQuery();
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }
  if (data) {
    return (
      <UserContext.Provider
        value={{
          isLoggedIn: data.whoAmI.isLoggedIn,
          email: data.whoAmI.email ?? "",
          role: data.whoAmI.role ?? "",
          refetch: refetch,
        }}
      >
        <>
          <Header />
          <main className="main-content">{children}</main>
        </>
      </UserContext.Provider>
    );
  }
};

export default Layout;
