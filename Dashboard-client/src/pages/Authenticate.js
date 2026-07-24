// Importing necessary modules from react and mdb-react-ui-kit libraries
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBContainer,
  MDBCard,
  MDBTypography,
} from "mdb-react-ui-kit";

// Importing Login and Signup components and useAuthContext hook
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useAuthContext } from "../hooks/useAuthContext";
import { useThemeContext } from "../hooks/useThemeContext";
import LogoLight from "../assets/images/NavBarLogoLight.png";
import LogoDark from "../assets/images/NavBarLogoDark.png";

// Defining the Authenticate component
export default function Authenticate() {
  // Setting up state for active tab and modal visibility
  const [fillActive, setFillActive] = useState("tab1");
  const [showModal, setShowModal] = useState(false);

  // Getting user and navigate function from useAuthContext and react-router-dom respectively
  const { user } = useAuthContext();
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  // Redirecting to home page if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  // Handling click on tab
  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  // Rendering the component
  return (
    <div
      style={{
        backgroundColor: "#000000",
        minHeight: "100vh",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
      }}
    >
      <MDBContainer
        className="container col-xxxl-8 px-1 py-1"
        style={{ marginTop: "5%", marginBottom: "5%" }}
      >
        <MDBContainer className="row align-items-center g-lg-5 p-2 m-0">
          <MDBContainer className="col-lg-7 text-center text-lg-start">
            {theme === "light" ? (
              <img
                src={LogoLight}
                alt="Logo"
                width="80%"
                loading="lazy"
                style={{ backgroundColor: "#000000" }}
              />
            ) : (
              <img
                src={LogoDark}
                alt="Logo"
                width="80%"
                loading="lazy"
                style={{ backgroundColor: "#000000" }}
              />
            )}

            <MDBTypography
              tag="h1"
              style={{ fontFamily: "Monomania", color: "#ffffff" }}
              className="my-3 display-5 fw-bold"
            >
              Catch Every Thought. Crush Every Task.
            </MDBTypography>

            <MDBTypography
              className="col-lg-10 fs-5 text-light opacity-85"
              style={{ lineHeight: "1.6" }}
            >
              Welcome to Catch It All a website where your wild ideas and
              endless to-do lists actually get along. Stop letting good ideas
              slip through the cracks or drowning under sticky notes. Organize
              your chaos, vibe with your daily flow, and make productivity feel
              effortless. Ready to level up? Jump in
            </MDBTypography>
          </MDBContainer>

          <MDBContainer className="col-md-10 mx-auto col-lg-5">
            <MDBCard
              className="p-4"
              shadow="5"
              style={{
                borderRadius: "15px",
                backgroundColor: "#111111",
                color: "#ffffff",
                border: "1px solid #222222",
              }}
            >
              <MDBTabs fill className="m-3">
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleFillClick("tab1")}
                    active={fillActive === "tab1"}
                    style={{
                      color: fillActive === "tab1" ? "#3b82f6" : "#a1a1aa",
                      backgroundColor: "transparent",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleFillClick("tab2")}
                    active={fillActive === "tab2"}
                    style={{
                      color: fillActive === "tab2" ? "#3b82f6" : "#a1a1aa",
                      backgroundColor: "transparent",
                      fontWeight: "bold",
                    }}
                  >
                    Signup
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent className="m-3">
                <MDBTabsPane show={fillActive === "tab1"}>
                  <Login />
                </MDBTabsPane>
                <MDBTabsPane show={fillActive === "tab2"}>
                  <Signup />
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBCard>
          </MDBContainer>
        </MDBContainer>
      </MDBContainer>
    </div>
  );
}
