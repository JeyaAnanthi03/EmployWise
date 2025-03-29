import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`);
      const data = await response.json();

      if (response.ok) {
        setUser({
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          email: data.data.email,
        });
      } else {
        setError("Failed to fetch user details");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("User updated successfully");
        setTimeout(() => navigate("/users"), 2000);
      } else {
        setError(data.error || "Failed to update user");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Edit User</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate("/users")}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update User
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default EditUser;
