import styled from "styled-components";
import { json, redirect } from "react-router-dom";
import AuthProvider from "../utils/auth";

import LoginForm from "../components/LoginForm";

const LoginContainer = styled.main`
  padding: 9.6rem 0;
  display: flex;
  justify-content: center;
`;

function Login() {
  return (
    <LoginContainer>
      <LoginForm />
    </LoginContainer>
  );
}

export default Login;

export const action = async function ({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    await AuthProvider.signin(username, password);
  } catch (error) {
    if (error.response.status === 400) {
      return error.response.data.error;
    }
    throw json(
      {
        error: error.response.data.error,
      },
      {
        status: error.response.status,
      }
    );
  }

  const from = formData.get("redirectTo") || "/";
  return redirect(from);
};
