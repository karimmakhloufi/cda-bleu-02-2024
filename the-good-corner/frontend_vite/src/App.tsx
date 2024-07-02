import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { useWhoAmIQuery } from "./generated/graphql-types";
import { createContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  email: "",
  role: "",
  refetch: () => {},
});

function App() {
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
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
