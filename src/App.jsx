import { useRoutes, Link } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import AddCreator from "./pages/AddCreator";

const NavBar = () => {
  return (
    <nav className="container-fluid" style={{ backgroundColor: "#f8f9fa" }}>
      <ul>
        <li>
          <Link to="/" className="contrast">
            <strong>Creatorverse</strong>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: (
        <>
          <section
            className="container"
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: "1rem"
            }}
          >
            <h1>Welcome to Creatorverse</h1>
            <div className="grid" style={{ maxWidth: "400px" }}>
              <a href="#creators" role="button" className="primary">
                Browse Creators ↓
              </a>
              <Link to="/add" role="button" className="secondary">
                Add Creator
              </Link>
            </div>
          </section>

          <section id="creators" className="container">
            <ShowCreators />
          </section>
        </>
      )
    },
    {path: "/showcreators", element: <ShowCreators /> },
    { path: "/creators/:id", element: <ViewCreator /> },
    { path: "/edit/:id", element: <EditCreator /> },
    { path: "/add", element: <AddCreator /> },
    { path: "*", element: <h1>404 Not Found</h1> }
  ]);

  return (
    <>
      <NavBar />
      <main>{element}</main>
    </>
  );
}

export default App;
