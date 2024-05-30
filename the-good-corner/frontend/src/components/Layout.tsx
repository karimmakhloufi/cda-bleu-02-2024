import { ReactNode } from "react";
import Header from "./Header";
import { useWhoAmIQuery } from "@/generated/graphql-types";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data, error, loading } = useWhoAmIQuery();
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }
  if (data) {
    return (
      <>
        <Header
          email={data.whoAmI.email}
          isLoggedIn={data.whoAmI.isLoggedIn}
          role={data.whoAmI.role}
        />
        <main className="main-content">{children}</main>
      </>
    );
  }
};

export default Layout;
