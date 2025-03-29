import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        setError("Failed to delete user");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        paddingTop: "20px",
      }}
    >
      {/* Colored Header */}
      <div
        style={{
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "15px 0",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <h2 className="m-0">User List</h2>
        <Button variant="outline-light" onClick={handleLogout} className="px-4">
          Logout
        </Button>
      </div>

      <Container>
        {error && <Alert variant="danger">{error}</Alert>}

        <Row xs={1} md={3} className="g-4">
          {users.map((user) => (
            <Col key={user.id}>
              <Card
                className="h-100"
                style={{
                  boxShadow:
                    "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
                  borderRadius: "10px",
                  transition: "transform 0.3s ease",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Card.Img
                  variant="top"
                  src={user.avatar}
                  alt={`${user.first_name} avatar`}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-3">
                    {user.first_name} {user.last_name}
                  </Card.Title>
                  <Card.Text className="text-muted mb-3">
                    <strong>Email:</strong> {user.email}
                  </Card.Text>
                  <div className="mt-auto d-flex justify-content-between">
                    <Button
                      variant="outline-primary"
                      className="px-4"
                      onClick={() => navigate(`/edit/${user.id}`)}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="px-4"
                      onClick={() => handleDelete(user.id)}
                    >
                      Remove User
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="outline-secondary"
            className="me-2 px-4"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline-secondary"
            className="px-4"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default UserList;
