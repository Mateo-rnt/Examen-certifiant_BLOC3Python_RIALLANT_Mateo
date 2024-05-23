"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import jwt_decode from "jwt-decode";

function BuyTicket() {
  const [quantity, setQuantity] = useState(1); 
  const [error, setError] = useState(null);
  const eventId = useParams().eventId;
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("accessToken"); 
  console.log("Token:", token);

  
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  
  const userId = parseJwt(token).user_id;

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/tickets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity, event: eventId, user: userId }), 
      });
      if (!response.ok) {
        throw new Error("N'a pas acheté de billets");
      } else {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'achat des billets :", error);
      setError("L'achat de billets a échoué. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Buy Tickets</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <div className="mt-12 mx-4 px-4 rounded-md border-l-4 border-green-500 bg-green-50 md:max-w-2xl md:mx-auto md:px-8">
          <div className="flex justify-between py-3">
            <div className="flex">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="self-center ml-3">
                <span className="text-green-600 font-semibold">Succè</span>
                <p className="text-green-600 mt-1">Le membre de l'équipe a été ajouté avec succès.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4">
        <label htmlFor="quantity" className="block text-gray-700">
          Quantité:
        </label>
        <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" />
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
        Acheter
      </button>
    </div>
  );
}

export default BuyTicket;
