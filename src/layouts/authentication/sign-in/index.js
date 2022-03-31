

import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "axios";
import BASE_URL from "utils/baseUrl";
import { setIsAuthenticated } from "slices/persSlice";
import { useNavigate } from "react-router-dom";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log('email =', email)


  const doLogin = async () => {
   const response = await axios.post(`${BASE_URL}users/login/`, {
      "email": email, 
      "password": password
    }).then(res => {
      console.log('res.data Login = ', res.data)
      localStorage.setItem("token", res.data.token)
      dispatch(setIsAuthenticated(true))
      navigate("/");
    }).catch(err => {

        console.log(`Login actions err ==`, err)
    })
  }


  

  return (
    <BasicLayout image={bgImage}>
      <Card>
        
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput 
                type="email" 
                label="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth 
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                type="password" 
                label="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth 
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              {/* <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography> */}
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={() => doLogin()} fullWidth>
                sign in
              </MDButton> 
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
