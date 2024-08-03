import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useAdminLoginMutation } from "../slices/adminApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("useAdminLoginMutation", useAdminLoginMutation);
  const [login, { isLoading }] = useAdminLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log("Login response:", res);
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      if (err?.data?.message === "Access denied: Not an admin") {
        toast.error("You are not authorized to access this page.");
      } else {
        toast.error(err?.data?.message || err.error || "An error occurred");
      }
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center mb-4">Admin Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button
            disabled={isLoading}
            type="submit"
            variant="primary"
            className="mt-3"
          >
            Sign In
          </Button>
        </div>
      </Form>
      {isLoading && <Loader />}
    </FormContainer>
  );
};

export default LoginScreen;
