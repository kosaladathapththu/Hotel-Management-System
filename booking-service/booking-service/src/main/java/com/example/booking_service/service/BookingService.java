package com.example.booking_service.service;

import com.example.booking_service.data.Booking;
import com.example.booking_service.data.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private RestTemplate restTemplate;

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // Create Booking - with double booking prevention
    public Booking createBooking(Booking booking) {
        // Step 1: Check if Room exists using Room Service
        String roomUrl = "http://localhost:8086/api/rooms/" + booking.getRoomId();
        try {
            restTemplate.getForObject(roomUrl, Object.class); // Just a check, not storing
        } catch (Exception e) {
            System.out.println("Error fetching room: " + e.getMessage());
            throw new RuntimeException("Room not found in Room Service!");
        }

        // Step 2: Check if room is already booked in given date range
        boolean isAlreadyBooked = isRoomAlreadyBooked(
                booking.getRoomId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate()
        );

        if (isAlreadyBooked) {
            throw new RuntimeException("Room is already booked for selected dates!");
        }

        // Step 3: Set status
        booking.setStatus("CONFIRMED");

        // Step 4: Calculate totalAmount based on days
        long days = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
        if (days <= 0) {
            throw new RuntimeException("Invalid booking dates. Check-in must be before check-out.");
        }

        // You may get room price from room service here (optional enhancement)
        // For now assume totalAmount is already provided

        // Step 5: Save booking
        return bookingRepository.save(booking);
    }

    // Get all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get one booking
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    // Delete booking
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    // Overlap check: Is room booked for selected dates?
    public boolean isRoomAlreadyBooked(Long roomId, LocalDate newCheckIn, LocalDate newCheckOut) {
        List<Booking> bookings = bookingRepository.findAll();

        return bookings.stream().anyMatch(existing ->
                existing.getRoomId().equals(roomId) &&
                        !(newCheckOut.isBefore(existing.getCheckInDate()) || newCheckIn.isAfter(existing.getCheckOutDate()))
        );
    }
}
