import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../data";
import { useNavigate } from "react-router";
import { userLoginStatus } from "../data";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link2 = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error2, setError] = useState(false);
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  var ERRORMSG = true;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    // login(dispatch, { username, password });
    var sessionUsername = sessionStorage.getItem("username");
    var sessionPassword = sessionStorage.getItem("password");

    for (let i = 0; i < users.length; i++) {
      if (users[i].username == username && users[i].password == password) {
        // console.log(true);
        setError((error2) => (error2 = false));
        navigate("/e-commerce-app", {
          state: {
            id: users[i].id,
            username: users[i].username,
            password: users[i].password,
          },
        });
      } else if (sessionUsername == username && sessionPassword == password) {
        setError((error2) => (error2 = false));
        navigate("/e-commerce-app", {
          state: {
            id: 1,
            username: sessionUsername,
            password: sessionPassword,
          },
        });
      } else {
        // console.log(false);
        ERRORMSG = true;
        setError((error2) => (error2 = true));
      }
    }
  };

  // console.log(error2);
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error2 && <Error>Something went wrong...</Error>}
          <Link2>DO NOT YOU REMEMBER THE PASSWORD?</Link2>
          <Link2>
            <Link className="link" to="/register">
              CREATE A NEW ACCOUNT
            </Link>
          </Link2>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
