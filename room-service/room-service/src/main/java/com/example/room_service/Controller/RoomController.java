package com.example.room_service.Controller;

import com.example.room_service.Data.Room;
import com.example.room_service.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin("*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // ✅ Public - View All Rooms
    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    // ✅ Public - Get Room by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getRoomById(@PathVariable int id) {
        Optional<Room> room = roomService.getRoomById(id);
        if (room.isPresent()) {
            return ResponseEntity.ok(room.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Room not found with ID: " + id);
        }
    }

    // 🔒 ADMIN ONLY - Create New Room
    @PostMapping("/admin/add")
    public Room createRoom(@RequestBody Room room) {
        return roomService.createRoom(room);
    }


    // 🔒 ADMIN ONLY - Update Room
    @PutMapping("/admin/update/{id}")
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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Room not found");
        }
    }

    // 🔒 ADMIN ONLY - Delete Room
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable int id) {
        if (roomService.getRoomById(id).isPresent()) {
            roomService.deleteRoom(id);
            return ResponseEntity.ok("✅ Room deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Room not found");
        }
    }
}
