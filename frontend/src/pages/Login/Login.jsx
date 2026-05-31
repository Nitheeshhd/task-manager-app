import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useNotification } from "../../context/useNotification";

function Login() {
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      notify({
        type: "error",
        title: "Missing details",
        message: "Please enter your email address and password.",
      });
      return;
    }

    try {

      setLoading(true);

      const response = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      const user = response.data.user;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      notify({
        type: "success",
        title: "Login successful",
        message: `Welcome back, ${user?.name || "there"}.`,
      });

      navigate("/dashboard");

    } catch (error) {

      notify({
        type: "error",
        title: "Login failed",
        message:
          error.response?.data?.message ||
          "Please check your email and password.",
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

      <section className="auth-card" aria-labelledby="login-title">
        <div className="brand-row">
          <span className="brand-mark">T</span>
          <span className="brand-name">TaskFlow</span>
        </div>

        <div className="auth-heading">
          <h1 id="login-title">
            Welcome back
          </h1>
          <p>
            Sign in to your account to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="primary-button primary-button--full"
          >
            {loading
              ? "Signing in..."
              : "Sign in"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link
            to="/register"
          >
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
