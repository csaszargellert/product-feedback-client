import styled from "styled-components";
import { useSubmit, useLocation, useActionData } from "react-router-dom";
import { useState, useEffect } from "react";

import { USERS } from "../constants/dropdown";
import { PASSWORD } from "../constants/password";
import useDropdown from "../custom-hooks/useDropdown";
import DropdownElement from "./DropdownElement";
import Input from "./Input";
import Button from "./Button";
import ErrorModal from "./ErrorModal";

const Label = styled.p``;

const Form = styled.form`
  border-radius: var(--border-radius);
  background: var(--dark-greyish-blue);
  color: var(--white);

  padding: 3.2rem;
  width: 40rem;

  h1 {
    font-size: 3.2rem;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: -0.3px;
    margin-bottom: 4rem;
  }

  ${Label} {
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: -0.2px;
    text-transform: capitalize;
    margin-bottom: 1.2rem;
  }

  .input-controller {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }
`;

function LoginForm() {
  const submit = useSubmit();
  const error = useActionData();
  const [user, setUser] = useDropdown(USERS[0].category);
  const [loginError, setLoginError] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = location.state?.from?.pathname || params.get("from") || "/";

  useEffect(() => {
    if (error) {
      setLoginError(error);
    }
  }, [error]);

  const handleSubmit = function (event) {
    event.preventDefault();
    const loginObj = {
      username: user,
      password: PASSWORD,
      redirectTo: from,
    };

    submit(loginObj, { method: "POST" });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input type="hidden" name="redirectTo" value={from} />
      <h1>login</h1>
      {loginError && <ErrorModal errorList={[loginError]} />}
      <div className="input-controller">
        <div>
          <Label>username:</Label>
          <DropdownElement
            type="button"
            list={USERS}
            onHandleCategory={setUser}
            categoryValue={user}
          />
        </div>
        <Input
          type="password"
          name="password"
          id="password"
          value={PASSWORD}
          label="password:"
          login={true}
        />
      </div>
      <Button
        bg="violet"
        hover="#C75AF6"
        type="submit"
        definedClass="w-full text-size-md"
      >
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;
