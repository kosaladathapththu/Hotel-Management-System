package com.example.booking_service.controller;

import com.example.booking_service.data.Booking;
import com.example.booking_service.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api") //
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/bookings")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/bookings/{id}")
    public Optional<Booking> getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @DeleteMapping("/bookings/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }
}
