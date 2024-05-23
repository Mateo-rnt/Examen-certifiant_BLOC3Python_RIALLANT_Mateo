"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Link } from "next/link";

function EventDetails() {
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
        throw new Error("Échec de la récupération des détails de l'événement");
      }
      const eventData = await response.json();
      setEvent(eventData);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(event);

  if (!event) {
    return <div>Loading...</div>;
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
            <strong>Lieu:</strong> {event.location}
          </p>
          <p>
            <strong>Prix:</strong> ${event.price.toFixed(2)}
          </p>
          <p>
            <strong>Quantité:</strong> {event.capacity}
          </p>
          <Link to={`/events/${event.id}/buy`} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 inline-block">
            Acheter ticket
          </Link>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
