package com.example.room_service.Data;


import jakarta.persistence.*;

@Entity
@Table(name = "room")
public class Room {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "description")
    private String description;

//    @Column(name = "is_available")
//    private String isAvailable;

    @Column(name = "price_per_day")
    private double pricePerDay;

    @Column(name = "capacity")
    private int capacity;
    public Room() {
    }

    public int getId() {
        return id;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

//    public String isAvailable() {
//        return isAvailable;
//    }

//    public void setAvailable(String available) {
//        isAvailable = available;
//    }

    public double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public Room(int id, int capacity, double pricePerDay, String description, String name, String type) {
        this.id = id;
        this.capacity = capacity;
        this.pricePerDay = pricePerDay;
//        this.isAvailable = isAvailable;
        this.description = description;
        this.name = name;
        this.type = type;
    }
}
