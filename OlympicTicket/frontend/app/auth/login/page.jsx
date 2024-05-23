"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SigninForm() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    loginUser(user)
      .then(() => {
        setLoading(false);
        router.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setError("Échec de la connexion. Veuillez vérifier vos informations d'identification et réessayer.");
        console.error("Signin failed", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <form onSubmit={onLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl font-bold mb-4">Connexion</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-3 rounded relative" role="alert">
            <strong className="font-bold">Erreur:</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Nom d'utilisateur
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nom d'utilisateur" name="username" value={user.username} onChange={handleChange} required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Mot de passe
          </label>
          <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Mot de passe" name="password" value={user.password} onChange={handleChange} required />
        </div>
        <div className="flex items-center justify-between">
          <button className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? "opacity-50 cursor-not-allowed" : ""}`} type="submit" disabled={loading}>
            Connexion
          </button>
          <Link href="registration" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Créer un compte
          </Link>
        </div>
      </form>
    </div>
  );
}

function loginUser(user) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to sign in");
        }
        return response.json();
      })
      .then((data) => {
        const accessToken = data.access;
        localStorage.setItem("accessToken", accessToken);
        resolve();
      })
      .catch(reject);
  });
}

export default SigninForm;
