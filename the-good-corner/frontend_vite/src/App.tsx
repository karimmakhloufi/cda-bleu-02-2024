import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { useWhoAmIQuery } from "./generated/graphql-types";
import { createContext } from "react";
import HomePage from "./pages/Home";
import NewAd from "./pages/NewAd";

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
            <Route index element={<HomePage />} />
            <Route path="new" element={<NewAd />} />
            <Route path="about" element={<About />} />
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
            <Link to="/new">New Ad</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About Page</h2>
      <p>Made with ❤️ with React </p>
    </div>
  );
}

export default App;
