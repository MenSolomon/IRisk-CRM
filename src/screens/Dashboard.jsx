import {
  Button,
  Card,
  TextField,
  InputAdornment,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Add,
  CurrencyExchange,
  // Dashboard,
  Help,
  LocalMall,
  Paid,
  Search,
  Speed,
} from "@mui/icons-material";
import abstractImage from "../assets/abstract.jpg";

import { Outlet } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../statemanager/slices/DatabaseSlice";
import moment from "moment/moment";
import { db } from "../Firebase/Firebase";
import { selectLoginUserDetails } from "../statemanager/slices/LoginUserSlice";

const Dashboard = () => {
  const [AllPremiums, setAllPremiums] = useState([]);
  const [AllClaims, setAllClaims] = useState([]);
  const [allPolicies, setAllPolicies] = useState([]);
  const [filteredPolicyBasedOnExpiryDate, setFilteredPolicyBasedOnExpiryDate] =
    useState([]);

  const LoginDetails = useSelector(selectLoginUserDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const policies = [];
        const querySnapshot = await getDocs(
          collection(db, `users_db/${LoginDetails?.AccountId}/Policy`)
        );
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          policies.push(doc.data());
        });

        setAllPolicies(policies);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchData();
  }, [LoginDetails]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const premiums = [];
        const querySnapshot = await getDocs(
          collection(db, `users_db/${LoginDetails?.AccountId}/Premiums`)
        );
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          premiums.push(doc.data());
        });

        setAllPremiums(premiums);
      } catch (error) {
        console.error("Error fetching permiums:", error);
      }
    };

    fetchData();
  }, [LoginDetails]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const claims = [];
        const querySnapshot = await getDocs(
          collection(db, `users_db/${LoginDetails?.AccountId}/Claims`)
        );
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          claims.push(doc.data());
        });

        setAllClaims(claims);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchData();
  }, [LoginDetails]);

  useEffect(() => {
    const today = moment(); // Current date
    const twoWeeksFromNow = moment().add(20000, "weeks");

    const filteredDate = allPolicies.filter((item) => {
      // Parse 'dateExpiring' using Moment.js
      const dateExpiring = moment(item.ExpirationDate, "MMMM DD, YYYY");

      // Check if 'dateExpiring' falls within the next two weeks
      return dateExpiring.isBetween(today, twoWeeksFromNow);
    });

    setFilteredPolicyBasedOnExpiryDate(filteredDate);
  }, [allPolicies]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // background: "#FAFBFF",
        display: "flex",
        flexDirection: "column",
        gap: "1vh",
      }}
    >
      <div style={{ flex: ".2" }}>
        <Card
          sx={{
            width: "100%",
            height: 100,
            // background: "red",
            display: "flex",
            padding: "3vh",
            gap: "9vw",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: ".25",
              display: "flex",
              paddingLeft: "1vw",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              <IconButton style={{ background: "#DBFFEC" }}>
                <CurrencyExchange sx={{ color: "#1CB663" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              <h6>No of policies</h6> <h2>{allPolicies.length}</h2>{" "}
            </div>
          </div>
          <div
            style={{
              flex: ".25",

              display: "flex",
              paddingLeft: "1vw",

              borderLeft: "1px solid #F4F4F4",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              {/* <Avatar src={} />{" "} */}
              <IconButton style={{ background: "#CBF2FF" }}>
                <Paid style={{ color: "#327BCD" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              {" "}
              <h6>Claims</h6>{" "}
              <h2>
                {
                  AllClaims.filter(
                    (data) => data.PaymentStatus === "Outstanding"
                  ).length
                }
              </h2>{" "}
            </div>
          </div>

          <div
            style={{
              flex: ".28",

              display: "flex",
              paddingLeft: "1vw",

              borderLeft: "1px solid #F4F4F4",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              <IconButton style={{ background: "#FFBAE0" }}>
                <LocalMall style={{ color: "#DA001A" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              <h6>Outstanding Premium</h6>{" "}
              <h2>
                {
                  AllPremiums.filter(
                    (data) => data.PaymentStatus === "Outstanding"
                  ).length
                }
              </h2>{" "}
            </div>
          </div>
        </Card>
      </div>

      <div style={{ flex: ".2" }}>
        <Card
          sx={{
            width: "100%",
            height: 100,
            // background: "red",
            display: "flex",
            padding: "3vh",
            gap: "9vw",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: ".25",
              display: "flex",
              paddingLeft: "1vw",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              <IconButton style={{ background: "#DBFFEC" }}>
                <CurrencyExchange sx={{ color: "#1CB663" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              {" "}
              <h6>Upcoming Renewals</h6>{" "}
              <h2>{filteredPolicyBasedOnExpiryDate.length}</h2>{" "}
            </div>
          </div>
          <div
            style={{
              flex: ".25",

              display: "flex",
              paddingLeft: "1vw",

              borderLeft: "1px solid #F4F4F4",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              {/* <Avatar src={} />{" "} */}
              <IconButton style={{ background: "#FFBAE0" }}>
                <LocalMall style={{ color: "#DA001A" }} />{" "}
              </IconButton>
            </div>
            <div style={{ flex: ".7" }}>
              {" "}
              <h6>Outstanding </h6> <h2>13</h2>{" "}
            </div>
          </div>

          <div
            style={{
              flex: ".28",
              display: "flex",
              paddingLeft: "1vw",

              borderLeft: "1px solid #F4F4F4",
            }}
          >
            <div style={{ flex: ".3" }}>
              {" "}
              {/* <IconButton>
              <Speed />{" "}
            </IconButton> */}
            </div>
            <div style={{ flex: ".7" }}>
              {" "}
              {/* <h6>No of policies</h6> <h2>13</h2>{" "} */}
            </div>
          </div>
        </Card>
      </div>
      <div style={{ flex: ".6", display: "flex", gap: "1vw" }}>
        <Card
          style={{
            flex: ".5",
            display: "flex",
            flexDirection: "column",
            padding: "1vw",
          }}
        >
          <div style={{ flex: ".2" }}>
            <div
              style={{
                display: "flex",
                gap: "1vw",
                float: "left",
                alignItems: "center",
              }}
            >
              {" "}
              <h3>Upcoming Renewals</h3>
            </div>
            <TextField
              sx={{ float: "right", width: 200 }}
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

          {/* /// conent taqble */}

          <div style={{ flex: ".8" }}>
            <table>
              <thead>
                {" "}
                <th align="left" style={{ width: "17.4vw" }}>
                  Product Name
                </th>{" "}
                <th align="left" style={{ width: "10vw" }}>
                  Description
                </th>{" "}
                <th>Premium </th>{" "}
              </thead>
              <tbody style={{ fontSize: ".9em", gap: "2vh" }}>
                <tr
                // style={{ paddingTop: "4vh" }}
                >
                  {" "}
                  <td style={{ width: "17.4vw", display: "flex", gap: ".5vw" }}>
                    <div
                      style={{
                        flex: ".6",
                        background: `url(${abstractImage})`,
                        backgroundSize: "cover",
                        borderRadius: ".4vw",
                      }}
                    >
                      {/* <Avatar /> */}
                    </div>
                    <div>
                      <p style={{ margin: 0 }}> Motor Insurance</p>
                      <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                    </div>
                  </td>{" "}
                  <td>
                    {" "}
                    <p style={{ margin: 0 }}> Motor Insurance</p>
                    <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                  </td>
                  <td>1,299</td>
                </tr>
                <tr
                // style={{ paddingTop: "1vh" }}
                >
                  {" "}
                  <td style={{ width: "17.4vw", display: "flex", gap: ".5vw" }}>
                    <div
                      style={{
                        flex: ".6",
                        background: `url(${abstractImage})`,
                        backgroundSize: "cover",
                        borderRadius: ".4vw",
                      }}
                    >
                      {/* <Avatar /> */}
                    </div>
                    <div>
                      <p style={{ margin: 0 }}> Motor Insurance</p>
                      <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                    </div>
                  </td>{" "}
                  <td>
                    {" "}
                    <p style={{ margin: 0 }}> Motor Insurance</p>
                    <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                  </td>
                  <td>1,299</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card
          style={{
            flex: ".5",
            display: "flex",
            flexDirection: "column",
            padding: "1vw",
          }}
        >
          <div style={{ flex: ".2" }}>
            <div
              style={{
                display: "flex",
                gap: "1vw",
                float: "left",
                alignItems: "center",
              }}
            >
              {" "}
              <h3>Claims history</h3>
            </div>
            <TextField
              sx={{ float: "right", width: 200 }}
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

          {/* /// conent taqble */}

          <div style={{ flex: ".8" }}>
            <table>
              <thead>
                {" "}
                <th align="left" style={{ width: "17.4vw" }}>
                  Product Name
                </th>{" "}
                <th align="left" style={{ width: "10vw" }}>
                  Description
                </th>{" "}
                <th>Premium </th>{" "}
              </thead>
              <tbody style={{ fontSize: ".9em", gap: "2vh" }}>
                <tr style={{ paddingBottom: "4vh" }}>
                  {" "}
                  <td style={{ width: "17.4vw", display: "flex", gap: ".5vw" }}>
                    <div
                      style={{
                        flex: ".6",
                        background: `url(${abstractImage})`,
                        backgroundSize: "cover",
                        borderRadius: ".4vw",
                      }}
                    >
                      {/* <Avatar /> */}
                    </div>
                    <div>
                      <p style={{ margin: 0 }}> Motor Insurance</p>
                      <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                    </div>
                  </td>{" "}
                  <td>
                    {" "}
                    <p style={{ margin: 0 }}> Motor Insurance</p>
                    <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                  </td>
                  <td>1,299</td>
                </tr>
                <tr
                // style={{ paddingTop: "1vh" }}
                >
                  {" "}
                  <td style={{ width: "17.4vw", display: "flex", gap: ".5vw" }}>
                    <div
                      style={{
                        flex: ".6",
                        background: `url(${abstractImage})`,
                        backgroundSize: "cover",
                        borderRadius: ".4vw",
                      }}
                    >
                      {/* <Avatar /> */}
                    </div>
                    <div>
                      <p style={{ margin: 0 }}> Motor Insurance</p>
                      <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                    </div>
                  </td>{" "}
                  <td>
                    {" "}
                    <p style={{ margin: 0 }}> Motor Insurance</p>
                    <span style={{ fontSize: ".8em" }}>totyota elantra</span>
                  </td>
                  <td>1,299</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
