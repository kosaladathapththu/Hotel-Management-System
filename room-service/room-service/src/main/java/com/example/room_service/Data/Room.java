// ✅ Room.java (Update with Status Field)
package com.example.room_service.Data;

import jakarta.persistence.*;

@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "description")
    private String description;

    @Column(name = "price_per_day")
    private double pricePerDay;

    @Column(name = "capacity")
    private int capacity;

    @Column(name = "status")
    private String status = "Available";

    public Room() {}

    public Room(int id, String name, String type, String description, double pricePerDay, int capacity, String status) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.pricePerDay = pricePerDay;
        this.capacity = capacity;
        this.status = status;
    }

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(double pricePerDay) { this.pricePerDay = pricePerDay; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
