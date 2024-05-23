"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import BuyTicket from "../../components/partials/BuyTicket";

function EventDetails() {
  const [isshowBuyTicket, setShowBuyTicket] = useState(false);
  const [event, setEvent] = useState(null);
  const eventId = useParams().eventId;
  console.log(eventId);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/events/${eventId}/`);
      if (!response.ok) {
        throw new Error("Échec de l'extraction des détails de l'événement");
      }
      const eventData = await response.json();
      setEvent(eventData);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(event);

  function showBuyTicket() {
    setShowBuyTicket(true);
  }

  if (!event) {
    return <div>Chargement...</div>;
  }

  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">{event.name}</h1>
      </div>
      <div className="mt-8 max-w-2xl mx-auto">
        <img src={event.image} alt={event.name} className="w-full rounded-lg" />
        <div className="mt-6 text-gray-600">
          <p className="mb-4">{event.description}</p>
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Price:</strong> ${event.price.toFixed(2)}
          </p>
          <p>
            <strong>Capacity:</strong> {event.capacity}
          </p>
          {/* `/event/${event.id}/buy` */}
          {isshowBuyTicket && <BuyTicket eventId={eventId} price={event.price.toFixed(2)} />}
          <button onClick={showBuyTicket} className={!isshowBuyTicket ? `bg-blue-500 text-white px-4 py-2 rounded-md mt-4 inline-block` : `hidden`}>
            Acheter un ticket
          </button>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
