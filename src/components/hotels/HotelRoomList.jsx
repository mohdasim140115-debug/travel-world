"use client";

import { useState } from "react";
import RoomCard from "./RoomCard";
import HotelBookingModal from "./HotelBookingModal";

export default function HotelRoomList({ hotelName, hotelImage, rooms }) {
  const [booking, setBooking] = useState(null);

  return (
    <>
      <div className="space-y-4">
        {rooms.map((room) => (
          <RoomCard
            key={room.type}
            room={room}
            hotelImage={hotelImage}
            onBookNow={(selectedRoom) => setBooking({ hotelName, room: selectedRoom })}
          />
        ))}
      </div>

      <HotelBookingModal booking={booking} onClose={() => setBooking(null)} />
    </>
  );
}
