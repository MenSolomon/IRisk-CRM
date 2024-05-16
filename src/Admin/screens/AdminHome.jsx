import {
  Button,
  Card,
  TextField,
  InputAdornment,
  Avatar,
  IconButton,
} from "@mui/material";
import imageLogo from "../../../public/irisk logo 1.png";
import {
  Add,
  ChatBubbleOutlineOutlined,
  CurrencyExchange,
  Dashboard,
  DoorBackOutlined,
  Help,
  HelpOutlineOutlined,
  LocalMall,
  Paid,
  Payments,
  PaymentsOutlined,
  PeopleOutlineOutlined,
  Redeem,
  RedeemOutlined,
  RequestQuote,
  RequestQuoteOutlined,
  Search,
  Speed,
  WorkHistoryOutlined,
} from "@mui/icons-material";
import abstractImage from "../../assets/abstract.jpg";

import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdminLoginUserDetails,
  setAdminLoginStatus,
  setAdminLoginUserDetails,
} from "../../statemanager/slices/AdminLoginUserSlice";

const AdminHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [doubleLinkStatus, setDoubleLinkStatus] = useState(false);

  const AdminLoginDetails = useSelector(selectAdminLoginUserDetails);

  const { FirstName, LastName } = AdminLoginDetails || {};

  useEffect(() => {
    if (
      location.pathname.includes("/Admin-Panel/clients") ||
      location.pathname.startsWith("/Admin-Panel/clients-details")
    ) {
      setDoubleLinkStatus(true);
    } else {
      setDoubleLinkStatus(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(setAdminLoginStatus(false));
    dispatch(setAdminLoginUserDetails({}));
    navigate("/Admin_login");
  };

  return (
    <div
      style={{
        // background: "red",
        width: "100%",
        height: "100vh",
        display: "flex",
        padding: "4vh 3vw",
        background: "#FAFBFF",
        gap: "3vw",
      }}
    >
      <div
        style={{
          flex: ".23",
          background: "white",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "2vw",
          borderRadius: "1vw",
        }}
      >
        <div style={{ flex: ".15", display: "flex", gap: "1.5vw" }}>
          <img src={imageLogo} style={{ height: "40px" }} /> <h2>Dashboard</h2>
        </div>
        <div
          style={{
            flex: ".55",
            display: "flex",
            flexDirection: "column",
            gap: "1.5vh",
          }}
        >
          <NavLink to="/Admin-Panel/dashboard">
            <Button
              color="primary"
              className="NavBarBtns"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",

                // color: "#9FA4BC",

                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "7vw",
              }}
              startIcon={<Speed />}
            >
              Dashboard
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/clients">
            <Button
              color="primary"
              className={`NavBarBtns`}
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "9vw",

                backgroundColor: doubleLinkStatus == true ? "#5932ea" : "",
                color: doubleLinkStatus == true ? "white" : "",
              }}
              startIcon={<PeopleOutlineOutlined />}
            >
              Clients
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/insurance_products">
            <Button
              color="primary"
              className="NavBarBtns"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "3vw",
              }}
              startIcon={<RedeemOutlined />}
            >
              Insurance Products
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/upcoming_renewals">
            <Button
              className="NavBarBtns"
              color="primary"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "2.5vw",
              }}
              startIcon={<RequestQuoteOutlined />}
            >
              Upcoming Renewals
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/claims_history">
            <Button
              color="primary"
              className="NavBarBtns"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "5.5vw",
              }}
              startIcon={<PaymentsOutlined />}
            >
              Claims history
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/premiums_history">
            <Button
              color="primary"
              className="NavBarBtns"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "3.8vw",
              }}
              startIcon={<WorkHistoryOutlined />}
            >
              Premiums History
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/messages">
            <Button
              color="primary"
              className="NavBarBtns"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "7.5vw",
              }}
              startIcon={<ChatBubbleOutlineOutlined />}
            >
              Messages
            </Button>
          </NavLink>

          <NavLink to="/Admin-Panel/help">
            <Button
              className="NavBarBtns"
              color="primary"
              style={{
                textTransform: "none",
                borderRadius: ".5vw",
                width: "17.4vw",
                height: "6.5vh",
                paddingRight: "10vw",
              }}
              startIcon={<HelpOutlineOutlined />}
            >
              Help
            </Button>
          </NavLink>

          <Button
            onClick={handleLogout}
            className="NavBarBtns"
            color="primary"
            style={{
              textTransform: "none",
              borderRadius: ".5vw",
              width: "17.4vw",
              height: "6.5vh",
              paddingRight: "9vw",
            }}
            startIcon={<DoorBackOutlined />}
          >
            Logout
          </Button>
        </div>
        <div style={{ flex: ".3" }}>
          {/* <Card
            // onClick={() => {

            // }}
            sx={{
              width: 210,
              height: 100,
              // marginLeft: "4.6vw",
              paddingTop: "1vh",
              paddingLeft: ".6vw",
              paddingRight: ".6vw",
              display: "flex",
              flexDirection: "column",
              borderRadius: "1.5vw",
              // background:
              //   "linear-gradient(59deg, rgba(7,127,141,1) 0%, rgba(37,142,154,1) 19%, rgba(54,164,176,1) 37%, rgba(13,129,142,1) 55%, rgba(35,141,153,1) 73%, rgba(66,157,167,1) 100%)",
              backgroundImage:
                "linear-gradient(90deg, rgba(232,169,240,1) 0%, rgba(218,158,239,1) 19%, rgba(185,131,238,1) 33%, rgba(148,99,236,1) 48%, rgba(124,80,235,1) 63%, rgba(89,50,234,1) 81%)",
              // background: "#1B1E2B",
              color: "white",
              cursor: "pointer",
              justifyContent: "center",
              alignItems: "center",
              gap: "2vh",
            }}
          >
            <h4>Connect with us</h4>

            <Button
              sx={{
                background: "white",
                borderRadius: "3vw",
                width: "10vw",
                height: "4.5vh",
                textTransform: "none",
                fontWeight: "bolder",
                color: "#765BEF",
              }}
            >
              {" "}
              Live chat{" "}
            </Button>
          </Card> */}
        </div>
      </div>

      <div style={{ display: "flex", flex: ".77", flexDirection: "column" }}>
        <div style={{ flex: ".1" }}>
          <div
            style={{
              display: "flex",
              gap: "1vw",
              float: "left",
              alignItems: "center",
            }}
          >
            {" "}
            <Avatar src="" />{" "}
            <span>
              Hello {AdminLoginDetails?.FirstName}
              {LastName} (Admin) 👋 ,
            </span>{" "}
          </div>
          <TextField
            sx={{ float: "right" }}
            id="outlined-basic"
            variant="outlined"
            size="small"
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            startIcon={<Search />}
          ></TextField>
        </div>

        <div
          style={{
            flex: ".9",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
