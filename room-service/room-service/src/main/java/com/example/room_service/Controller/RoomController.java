package com.example.room_service.Controller;

import com.example.room_service.Data.Room;
import com.example.room_service.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // AVAILABLE ROOMS
    @GetMapping("/rooms/available")
    public ResponseEntity<?> getAvailableRooms() {
        try {
            List<Room> availableRooms = roomService.getAvailableRooms();
            return ResponseEntity.ok(availableRooms);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(" Error fetching available rooms: " + e.getMessage());
        }
    }

    // Public - Get Room by ID
    @GetMapping("/rooms/{id}")
    public ResponseEntity<?> getRoomById(@PathVariable int id) {
        Optional<Room> room = roomService.getRoomById(id);
        if (room.isPresent()) {
            return ResponseEntity.ok(room.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Room not found with ID: " + id);
        }
    }

    // ADMIN ONLY - Create New Room
    @PostMapping("/rooms/admin")
    public Room createRoom(@RequestBody Room room) {

        return roomService.createRoom(room);
    }

    // ADMIN ONLY - Update Room
    @PutMapping("/rooms/admin/{id}")
    public ResponseEntity<?> updateRoom(@PathVariable int id, @RequestBody Room updatedRoom) {
        Optional<Room> existingRoom = roomService.getRoomById(id);

        if (existingRoom.isPresent()) {
            Room room = existingRoom.get();
            room.setName(updatedRoom.getName());
            room.setType(updatedRoom.getType());
            room.setDescription(updatedRoom.getDescription());
            room.setPricePerDay(updatedRoom.getPricePerDay());
            room.setCapacity(updatedRoom.getCapacity());

            Room savedRoom = roomService.createRoom(room);
            return ResponseEntity.ok(savedRoom);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" Room not found");
        }
    }

    // ADMIN ONLY - Delete Room
    @DeleteMapping("/rooms/admin/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable int id) {
        if (roomService.getRoomById(id).isPresent()) {
            roomService.deleteRoom(id);
            return ResponseEntity.ok("Room deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" Room not found");
        }
    }
}
