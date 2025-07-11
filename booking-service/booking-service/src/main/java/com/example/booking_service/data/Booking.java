package com.example.booking_service.data;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "check_in_date")
    private LocalDate checkInDate;

    @Column(name = "check_out_date")
    private LocalDate checkOutDate;

    private String status;

    @Column(name = "total_amount")
    private Double totalAmount;

    public Booking() {}

    public Booking(Long userId, Long roomId, LocalDate checkInDate, LocalDate checkOutDate, String status, Double totalAmount) {
        this.userId = userId;
        this.roomId = roomId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.status = status;
        this.totalAmount = totalAmount;
    }

    // Getters and Setters

    public Long getId() {

        return id;
    }

    public void setId(Long id) {

        this.id = id;
    }

    public Long getUserId() {

        return userId;
    }

    public void setUserId(Long userId) {

        this.userId = userId;
    }

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

    public String getStatus() {

        return status;
    }

    public void setStatus(String status) {

        this.status = status;
    }

    public Double getTotalAmount() {

        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {

        this.totalAmount = totalAmount;
    }
}

