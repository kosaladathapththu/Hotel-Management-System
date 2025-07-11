package com.example.room_service.DTO;

import java.time.LocalDate;

public class Booking {
    private Long roomId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String status; // Add this field

    // Getters & Setters
    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public String getStatus() {  // Add getter
        return status;
    }

    public void setStatus(String status) { // Add setter
        this.status = status;
    }
}
