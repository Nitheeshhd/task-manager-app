import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useNotification } from "../../context/useNotification";

function Register() {
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      notify({
        type: "error",
        title: "Password mismatch",
        message: "Password and confirm password must be the same.",
      });
      return;
    }

    try {

      setLoading(true);

      await API.post(
        "/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      notify({
        type: "success",
        title: "Account created",
        message: "Your account is ready. Please sign in.",
      });

      navigate("/");

    } catch (error) {

      const apiMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      notify({
        type: "error",
        title: "Registration failed",
        message:
          apiMessage.toLowerCase().includes("already exists")
            ? "User already exists. Please login instead."
            : apiMessage,
      });

    } finally {

      setLoading(false);

    }
  };

  return (
    <main className="auth-page">
      <p className="page-kicker">
        LOGIN / REGISTER PAGE
      </p>

      <section className="auth-card" aria-labelledby="register-title">
        <div className="brand-row">
          <span className="brand-mark">T</span>
          <span className="brand-name">TaskFlow</span>
        </div>

        <div className="auth-heading">
          <h1 id="register-title">
            Create account
          </h1>
          <p>
            Start organizing your tasks today
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <label className="field-group">
            <span>Full name</span>
            <input
              type="text"
              name="name"
              placeholder="Nitheesh Kumar"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </label>

          <label className="field-group">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </label>

          <label className="field-group">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </label>

          <label className="field-group">
            <span>Confirm password</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="primary-button primary-button--full"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link
            to="/"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
