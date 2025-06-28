package com.example.booking_service.service;

import com.example.booking_service.data.Booking;
import com.example.booking_service.data.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

    public Booking createBooking(Booking booking) {
        // ✅ Step 1: Check room availability from Room Service
        String roomUrl = "http://localhost:8086/api/rooms/" + booking.getRoomId();
        try {
            restTemplate.getForObject(roomUrl, Object.class); // ✅ Just check if exists
        } catch (Exception e) {
            throw new RuntimeException("❌ Room not found in Room Service!");
        }

        // ✅ Step 2: Check room already booked (date overlap)
        if (isRoomBooked(booking.getRoomId(), booking.getCheckInDate(), booking.getCheckOutDate())) {
            throw new RuntimeException("❌ Room already booked for selected dates!");
        }

        // ✅ Step 3: Auto-status
        booking.setStatus("CONFIRMED");

        // ❗ You can calculate total amount manually in frontend (if no price per day here)
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    // 🧠 Check overlapping booking dates
    public boolean isRoomBooked(Long roomId, java.time.LocalDate checkIn, java.time.LocalDate checkOut) {
        List<Booking> bookings = bookingRepository.findAll();

        return bookings.stream().anyMatch(b ->
                b.getRoomId().equals(roomId) &&
                        !(checkOut.isBefore(b.getCheckInDate()) || checkIn.isAfter(b.getCheckOutDate()))
        );
    }
}
