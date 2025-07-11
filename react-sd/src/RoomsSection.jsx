import React from "react";
import deluxeDouble from "./assets/deluxe-double.jpg";
import deluxeTwin from "./assets/deluxe-twin.jpg";
import deluxeSuite from "./assets/deluxe-suite.jpg";

const RoomsSection = () => {
  const rooms = [
    {
      title: "Deluxe Double",
      img: deluxeDouble,
      features: ["Attached Bathroom", "Free Wi-Fi"],
    },
    {
      title: "Deluxe Twin",
      img: deluxeTwin,
      features: ["Attached Bathroom", "Free Wi-Fi", "Free Meals"],
    },
    {
      title: "Deluxe Suite",
      img: deluxeSuite,
      features: [
        "Attached Bathroom",
        "Free Wi-Fi",
        "Private Pool",
        "Free Meals",
      ],
    },
  ];

  return (
    <section id="rooms" className="rooms-section">
      <h4>Find Your Perfect Stay</h4>
      <h2>Discover Our Diverse Room Types</h2>
      <div className="cards-container">
        {rooms.map((room, index) => (
          <div className="room-card" key={index}>
            <img src={room.img} alt={room.title} />
            <h3>{room.title}</h3>
            <ul>
              {room.features.map((feature, idx) => (
                <li key={idx}>✓ {feature}</li>
              ))}
            </ul>
            <div className="RoomBtn">
<button>Book Room</button>
            </div>
            
          </div>
          
        ))}
      </div>
    </section>
  );
};

export default RoomsSection;
