import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../../api/axios";
const LOGIN_URL = "/auth";

const index = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg;
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("UnAuthorized");
      } else {
        setErrMsg("Login Faild");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <label htmlFor="username">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="off"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign in</button>
      </form>
      <p>
        Need an Account? <br />
        <span className="line">
          <a href="#">Sign Up</a>
        </span>
      </p>
    </section>
  );
};

export default index;
