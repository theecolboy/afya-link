import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response.token) {
        localStorage.setItem("token", response.token);
        const userName = response.user?.name || email.split("@")[0];
        localStorage.setItem("user", JSON.stringify({ name: userName, email }));
        setMessage(`Welcome, ${userName}!`);
        navigate("/");
      } else {
        setMessage(response.message || "Login failed");
      }
    } catch (error) {
      setMessage("Login error. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        {message && (
          <div className={`p-3 mb-4 rounded text-center ${
            message.includes("Welcome") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Login
            </button>
          </form>

      </div>
    </div>
  );
}

export default Login;