import styled from "styled-components";
import {
  useActionData,
  useNavigate,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Spinner from "../components/Spinner";
import useAuth from "../custom-hooks/useAuth";
import LoginForm from "../components/LoginForm";
import axios from "../utils/axios";

const LoginContainer = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

function Login() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const action = useActionData();
  const { setUser, setAccessToken } = useAuth();
  const [fromPath, setFromPath] = useState("/");

  const user = action?.user;
  const accessToken = action?.accessToken;

  useEffect(() => {
    if (user && accessToken) {
      setUser(user);
      setAccessToken(accessToken);
      navigate(fromPath, { replace: true });
    }
  }, [user, accessToken, fromPath]);

  const { pathname } = location;
  useEffect(() => {
    setFromPath(location.state?.from?.pathname || "/");
  }, [pathname]);

  return (
    <LoginContainer>
      {navigation.state !== "idle" ? <Spinner /> : <LoginForm />}
    </LoginContainer>
  );
}

export default Login;

export const action = async function ({ request }) {
  const formData = await request.formData();

  try {
    const response = await axios({
      url: "/user/login",
      method: "POST",
      data: formData,
    });
    return { user: response.data.data, accessToken: response.data.jwt };
  } catch (error) {
    throw new Error(error);
  }
};
