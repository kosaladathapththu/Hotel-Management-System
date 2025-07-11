package com.example.room_service.Service;

import com.example.room_service.DTO.Booking;
import com.example.room_service.Data.Room;
import com.example.room_service.Data.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    private RestTemplate restTemplate;

    // Get All Rooms
    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }



    //  Get Room by ID
    public Optional<Room> getRoomById(int id) {
        return roomRepo.findById(id);
    }

    // Create or Update Room
    public Room createRoom(Room room) {
        return roomRepo.save(room);
    }

    // Delete Room
    public void deleteRoom(int id) {
        roomRepo.deleteById(id);
    }

    public List<Room> getAvailableRooms() {
        List<Room> allRooms = roomRepo.findAll();

        // Get all bookings from Booking Service
        String bookingUrl = "http://localhost:8082/api/bookings";
        Booking[] bookings = new Booking[0]; // Safe default

        try {
            bookings = restTemplate.getForObject(bookingUrl, Booking[].class);
        } catch (Exception e) {
            System.out.println(" Could not fetch bookings: " + e.getMessage());
            return allRooms; // fallback: show all rooms
        }

        //  Today
        LocalDate today = LocalDate.now();

        //  Get booked room IDs (today’s date + CONFIRMED status)
        Set<Long> bookedRoomIds = Arrays.stream(bookings)
                .filter(b ->
                        b.getCheckInDate() != null &&
                                b.getCheckOutDate() != null &&
                                b.getStatus() != null &&
                                b.getStatus().equalsIgnoreCase("CONFIRMED") &&
                                !today.isBefore(b.getCheckInDate()) &&
                                !today.isAfter(b.getCheckOutDate())
                )
                .map(Booking::getRoomId)
                .collect(Collectors.toSet());

        // Return rooms that are NOT booked today
        return allRooms.stream()
                .filter(room -> !bookedRoomIds.contains((long) room.getId()))
                .collect(Collectors.toList());
    }


}
