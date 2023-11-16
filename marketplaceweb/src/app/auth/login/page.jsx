"use client";

function LoginPage() {
  const handleLogin = async () => {
    // const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    // const password = document.getElementById("password").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <div className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>

        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          Username:
        </label>
        <input
          id="username"
          type="text"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="username"
        />

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password:
        </label>
        <input
          id="password"
          type="password"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="******"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
