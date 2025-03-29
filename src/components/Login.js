import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check for specific user credentials
    if (email !== "eve.holt@reqres.in" || password !== "cityslicka") {
      setError("Invalid UserName or Password.");
      return;
    }

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        navigate("/users");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container style={{ maxWidth: "450px" }}>
        <Card className="shadow-lg border-0" style={{ borderRadius: "15px" }}>
          <Card.Body className="p-5">
            <h4 className="text-center text-primary mb-4">Login</h4>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleLogin} autoComplete="off">
              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="py-2"
                  autoComplete="new-email"
                  name="new-email"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="text-muted">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="py-2"
                  autoComplete="new-password"
                  name="new-password"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 py-2">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <p className="text-center text-muted mt-3">
          © 2025 EmployWise. All rights reserved.
        </p>
      </Container>
    </div>
  );
}

export default Login;
