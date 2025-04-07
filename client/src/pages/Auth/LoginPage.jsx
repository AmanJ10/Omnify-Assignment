import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/Button";

const LoginPage = ({ onSuccess, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await login(email, password);
      console.log("Login success:", response);
      onSuccess();
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <div className="flex items-center justify-center text-2xl font-bold gap-2">
          <span>Welcome to</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-6 h-6 text-blue-500"
          >
            <path d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144L0 368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144l-16 0 0 96 16 0c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48l0-224z" />
          </svg>
        </div>
        <div className="font-light text-neutral-500 mt-2">
          Log into your account!
        </div>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition
              disabled:opacity-70 disabled:cursor-not-allowed"
            type="email"
            placeholder=" "
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-4 text-md duration-150 transform -translate-y-3 origin-[0]
              peer-placeholder-shown:scale-100 
              peer-placeholder-shown:translate-y-0
              peer-focus:scale-75
              peer-focus:-translate-y-4"
          >
            Enter Email
          </label>
        </div>
        <div className="relative">
          <input
            className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition
              disabled:opacity-70 disabled:cursor-not-allowed"
            type="password"
            placeholder=" "
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="password"
            className="absolute left-4 top-4 text-md duration-150 transform -translate-y-3 origin-[0]
              peer-placeholder-shown:scale-100 
              peer-placeholder-shown:translate-y-0
              peer-focus:scale-75
              peer-focus:-translate-y-4"
          >
            Enter Password
          </label>
        </div>
        <div className="flex flex-col items-center space-y-4 w-full">
          <div className="flex justify-center w-full">
            <Button
              type="submit"
              label="Login"
              className="bg-black text-white hover:bg-gray-800 w-3/4 md:w-1/2 lg:w-1/3 py-3 text-center"
            />
          </div>
        </div>
      </form>

      <div className="text-center py-2">
        Don&apos;t have an account yet?
        <div
          className="underline text-black cursor-pointer inline ml-1"
          onClick={switchToSignup}
        >
          Register Now
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
