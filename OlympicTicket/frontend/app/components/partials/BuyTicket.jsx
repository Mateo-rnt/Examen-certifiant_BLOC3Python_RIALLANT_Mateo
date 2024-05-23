"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import jwt_decode from "jwt-decode";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";

import Payment from "./Payment";

function BuyTicket({ eventId, price }) {
  const [quantity, setQuantity] = useState(1); // Quantité par défaut
  const [error, setError] = useState(null);
  // const eventId = useParams().eventId;
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  const token = localStorage.getItem("accessToken"); // Récupérer le token JWT depuis le localStorage
  console.log("Token:", token);

  // Décoder le token pour obtenir l'ID utilisateur
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

  // console.log("Decoded token:", parseJwt(token).user_id);
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
        body: JSON.stringify({ quantity, event: eventId, user: userId }), // Envoyer la quantité et l'ID de l'événement dans le corps de la requête
      });
      if (!response.ok) {
        throw new Error("Échec de l'achat des billets");
      } else {
        setSuccess(true);
      }
      // Optionnellement, vous pouvez naviguer vers une page de succès ou afficher un message de succès
    } catch (error) {
      console.error("Erreur lors de l'achat des billets:", error);
      setError("Échec de l'achat des billets. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Acheter des billets</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <>
          <Dialog.Root className="fixed inset-0 z-10 overflow-y-auto">
            <div className="mt-12 mx-4 px-4 rounded-md border-l-4 border-green-500 bg-green-50 md:max-w-2xl md:mx-auto md:px-8">
              <div className="flex justify-between py-3">
                <div className="flex">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="self-center ml-3">
                    <span className="text-green-600 font-semibold">Succès</span>
                    <p className="text-green-600 mt-1">
                      Le billet a été acheté avec succès. Veuillez{" "}
                      <b>
                        <u>
                          <Dialog.Trigger>Payer</Dialog.Trigger>
                        </u>
                      </b>{" "}
                      le montant dû pour confirmer l'achat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Dialog.Portal>
              <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 w-full h-full bg-black opacity-40" />
              <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                <div className="bg-white rounded-md shadow-lg px-4 py-6">
                  <div className="flex items-center justify-end">
                    <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Dialog.Close>
                  </div>
                  <div className="max-w-sm mx-auto space-y-3 text-center ">
                    <Dialog.Title className="text-lg font-medium text-gray-800 ">
                      Payer <b>${quantity * price}</b> Maintenant !
                    </Dialog.Title>

                    <Dialog.Description className=" text-sm text-gray-600">
                      <p>Entrez les détails de votre carte de crédit pour payer</p>
                    </Dialog.Description>

                    <fieldset className="Fieldset relative">
                      <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                      </svg>

                      <input className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" placeholder="Détails de la carte" />
                    </fieldset>
                    <Dialog.Close asChild>
                      <button className=" w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2">Payer</button>
                    </Dialog.Close>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </>
      )}

      <div className="mt-4">
        <label htmlFor="quantity" className="block text-gray-700">
          Quantité
        </label>
        <div className="flex space-x-4 mt-2">
          <button onClick={() => setQuantity(1)} className={`rounded-md px-4 py-2 ${quantity === 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            Solo
          </button>
          <button onClick={() => setQuantity(2)} className={`rounded-md px-4 py-2 ${quantity === 2 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            Pack Duo
          </button>
          <button onClick={() => setQuantity(4)} className={`rounded-md px-4 py-2 ${quantity === 4 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            Pack Famille
          </button>

          <input min={1} max={5} type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" />
        </div>
      </div>
      <p className="mt-2">
        Total: <strong>${(quantity * price).toFixed(2)}</strong>
      </p>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
        Acheter
      </button>
    </div>
  );
}

export default BuyTicket;
