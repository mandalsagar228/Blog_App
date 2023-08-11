import { Toolbar, AppBar, styled } from "@mui/material";
import { Link } from "react-router-dom";
const Component = styled(AppBar)`
  background-color: white;
  color: black;
`;
const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 10px;
    font-weight: bold;
    font-size: 20px;
    text-decoration: none;
    color: black;
  }
`;
const Header = () => {
  return (
    <Component position="static">
      <Container>
        <Link to="/">Home </Link>
        <Link to="about">About</Link>
        <Link to="contact">Contact</Link>
        <Link to="login">Logout</Link>
      </Container>
    </Component>
  );
};
export default Header;
