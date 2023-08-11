import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { API } from "../service/api";
import { dataContext } from "../../Context/dataProvider";
import { useNavigate } from "react-router-dom";
import LoginImage from "../Assets/alternative.jpg";
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px black;
  margin-top: 100px;
`;
const Image = styled("img")`
  width: 100px;
  margin: auto;
  display: flex;
`;
const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  /* margin-left: 10px;
    margin-right: 10px; */
  margin: 10px 10px;

  .txtfield {
    margin-top: 10px;
  }
  .btnL {
    margin-top: 10px;
  }
  .btnC {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .typogarphy {
    text-align: center;
    margin-top: 10px;
  }
  .btnC {
    color: black;
    background: white;
    border-radius: 2px;
    text-transform: none;
    height: 48px;
    box-shadow: 0 2px 4px 0 black;
  }
`;
const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const LoginBtn = styled(Button)`
  color: white;
  background: black;
  border-radius: 2px;
  text-transform: none;
  height: 48px;
`;
const Error = styled(Typography)`
  font-size: 10px;
  color: red;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
const loginInitialValue = {
  username: "",
  password: "",
};

const signupInitailValue = {
  username: "",
  password: "",
  email: "",
};

const Login = ({ isUserAuthenticated }) => {
  // const imageURL =
  //   "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  const [account, toggleAccount] = useState("login");
  const [signup, setsignup] = useState(signupInitailValue);
  const [login, setLogin] = useState(loginInitialValue);
  const [error, setError] = useState("");
  const { setAccount } = useContext(dataContext);
  const navigate = useNavigate();

  const toggleSignUp = () => {
    toggleAccount("signup");
  };

  const toggleLogin = () => {
    toggleAccount("login");
  };
  //    For Capturing the signup input value.
  const onInputValue = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });
    // console.log({ ...signup, [e.target.name]: e.target.value });
  };

  // Creating function for fetching user login data from the form
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  // Making Post api for signup user
  const signupUser = async () => {
    try {
      console.log(signup);

      let response = await API.userSignup(signup);
      console.log(" response successfull from signupUser", response);
      if (response.isSuccess) {
        setError("");
        setsignup(signupInitailValue);
        toggleAccount("login");
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      console.log("this  is error", error);
    }
  };
  // Makinng Post api for login user
  const loginUser = async () => {
    try {
      const response = await API.userLogin(login);
      console.log(" response successfull from loginUser", response);
      if (response.isSuccess) {
        isUserAuthenticated(true);
        setError("");
        navigate("/");
        setAccount(response.data.username, response.data.password);

        sessionStorage.setItem(
          "accessToken",
          `bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          "refreshToken",
          `bearer ${response.data.refreshToken}`
        );
      } else {
        console.log("something error from response");

        setError("Something went wrong,Please try again later.");
      }
    } catch (error) {
      console.log("This is error from login user", error);
      alert("user id doesnt match");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={LoginImage} alt="Login" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              className="txtfield"
              variant="standard"
              label="Enter Username"
              name="username"
              onChange={(e) => onValueChange(e)}
            ></TextField>
            <TextField
              className="txtfield"
              variant="standard"
              name="password"
              label="Enter Password"
              onChange={(e) => onValueChange(e)}
            ></TextField>
            {error && <Error>{error}</Error>}
            <LoginBtn
              className="btnL"
              variant="contained"
              onClick={() => loginUser()}
            >
              Login
            </LoginBtn>

            <Typography className="typogarphy">OR</Typography>
            <Button className="btnC" variant="text" onClick={toggleSignUp}>
              Create Your Account
            </Button>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              className="txtfield"
              onChange={(e) => onInputValue(e)}
              name="username"
              variant="standard"
              label="Enter Username"
            ></TextField>
            <TextField
              className="txtfield"
              onChange={(e) => onInputValue(e)}
              name="password"
              variant="standard"
              label="Enter Password"
            ></TextField>
            <TextField
              className="txtfield"
              onChange={(e) => onInputValue(e)}
              name="email"
              variant="standard"
              label="Enter Email"
            ></TextField>
            <LoginBtn className="btnC" variant="text">
              Login
            </LoginBtn>
            <Typography className="typogarphy">OR</Typography>
            {error && <Error>{error}</Error>}

            <SignupButton onClick={signupUser}>Signup</SignupButton>

            <Button className="btnL" variant="contained" onClick={toggleLogin}>
              Already Have an Account
            </Button>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
