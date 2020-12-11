import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../Context/AuthContext";
import { ColorSet } from "../../global/ColorSet";

export const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };
  return (
    <Wrapper>
      <FormContainer>
        <Title>Reset</Title>
        <Title>Password</Title>
        <Form onSubmit={handleSubmit}>
          {message && <MessageContainer>{message}</MessageContainer>}
          {error && <ErrorContainer>{error}</ErrorContainer>}
          <Label>Email</Label>
          <Inputs type="email" ref={emailRef} />
          <Button disabled={loading} type="submit">
            Reset Password
          </Button>
        </Form>
        <OtherOptionsContainer>
          <StyledLink to="/login">Log In</StyledLink>
        </OtherOptionsContainer>
        <StyledLink to="/signup">Sign Up</StyledLink>
      </FormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${ColorSet.primaryLight};
    height: 85vh;
  }
`;

const FormContainer = styled.div`
  box-shadow: 5px 5px 15px 5px #a5a5a5;
  border-radius: 15px;
  @media (max-width: 500px) {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75%;
    margin: auto;
    height: 550px;
  }
`;

const Form = styled.form`
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    margin-top: 0px;
    width: 80%;
    border-bottom: 1px solid ${ColorSet.dark};
  }
`;

const Title = styled.p`
  color: ${ColorSet.primary};
  font-weight: bold;
  font-style: italic;
  @media (max-width: 500px) {
    font-size: 3rem;
    margin-top: 20px;
  }
`;

const Label = styled.label`
  color: ${ColorSet.dark};
  font-weight: bold;
  @media (max-width: 500px) {
    font-size: 1.5rem;
    margin-top: 40px;
  }
`;

const Inputs = styled.input`
  background-color: ${ColorSet.primaryLight};
  border-radius: 10px;
  border: none;
  height: 30px;
  padding-left: 15px;
  &:focus {
    outline: none;
  }
  @media (max-width: 500px) {
    margin-top: 10px;
  }
`;

const Button = styled.button`
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
  background: linear-gradient(225deg, #8bc450, #75a544);

  @media (max-width: 500px) {
    font-weight: bold;
    font-size: 1.1rem;
    border-radius: 10px;
    border: none;
    height: 35px;
    width: 100%;
    margin-left: 15px;
    color: white;
    background-color: ${ColorSet.primary};
    align-self: center;
    margin: 50px auto 20px auto;
  }
`;

const OtherOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 500px) {
    margin-top: 30px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${ColorSet.primary};
  &:hover {
    border-bottom: 1px solid ${ColorSet.primary};
  }
  @media (max-width: 500px) {
    font-size: 1.2rem;
    margin-top: 10px;
  }
`;

const MessageContainer = styled.div`
  background-color: ${ColorSet.primaryLight};
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    width: 100%;
    font-size: 1.2rem;
    margin-top: 20px;
    height: 30px;
    border-radius: 10px;
  }
`;
const ErrorContainer = styled(MessageContainer)`
  background-color: ${ColorSet.red};
`;
