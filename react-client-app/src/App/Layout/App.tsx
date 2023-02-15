import Navbar from "./NavBar";
// import me the styles from the styles.css file (same directory)
import "./styles.css";
import { Container } from "@mui/system";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../Feature/home/HomePage";

function App() {
  // this will give us the path of what's inside the url
  const location = useLocation();
  
  return (
    <div className="App">
      {location.pathname === "/" ? <HomePage /> : (
        <>
          <Navbar />
          <Container maxWidth="xl">
            {/* render the component that matches the current URL and pass any parameters */}
            <Outlet />
          </Container>
        </>
      )}
    </div>
  );
}

export default observer(App);
