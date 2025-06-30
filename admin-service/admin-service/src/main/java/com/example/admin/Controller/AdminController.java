package com.example.admin.Controller;

import com.example.admin.Data.Admin;
import com.example.admin.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/admin-service")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private RestTemplate restTemplate;

    // 1. Manage Admins - Get all
    @GetMapping("/admins")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    // 2. Manage Admins - Create new admin
    @PostMapping("/admins")
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.createAdmin(admin);
    }

    // 3. View all bookings from booking-service
    @GetMapping("/bookings")
    public ResponseEntity<?> getAllBookingsFromBookingService() {
        String bookingServiceUrl = "http://localhost:8082/api/bookings";
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(bookingServiceUrl, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body("Booking service unavailable: " + e.getMessage());
        }
    }

    // 4. View all rooms from room-service
    @GetMapping("/rooms")
    public ResponseEntity<?> getAllRoomsFromRoomService() {
        String roomServiceUrl = "http://localhost:8086/api/rooms";
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(roomServiceUrl, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body("Room service unavailable: " + e.getMessage());
        }
    }

    // 5. Delete booking by ID (booking-service)
    @DeleteMapping("/bookings/delete/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        String deleteUrl = "http://localhost:8082/api/bookings/" + id;
        try {
            restTemplate.delete(deleteUrl);
            return ResponseEntity.ok("✅ Booking deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body("Failed to delete booking: " + e.getMessage());
        }
    }

    // 6. Delete room by ID (room-service)
    @DeleteMapping("/rooms/delete/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable int id) {
        String deleteUrl = "http://localhost:8086/api/rooms/admin/delete/" + id;
        try {
            restTemplate.delete(deleteUrl);
            return ResponseEntity.ok("✅ Room deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body("Failed to delete room: " + e.getMessage());
        }
    }

    // 7. Update room by ID (room-service)
    @PutMapping("/rooms/update/{id}")
    public ResponseEntity<?> updateRoom(@PathVariable int id, @RequestBody String updatedRoomJson) {
        String updateUrl = "http://localhost:8086/api/rooms/admin/update/" + id;
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> requestEntity = new HttpEntity<>(updatedRoomJson, headers);

            ResponseEntity<String> response = restTemplate.exchange(updateUrl, HttpMethod.PUT, requestEntity, String.class);

            return ResponseEntity.ok("✅ Room updated successfully: " + response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body("Failed to update room: " + e.getMessage());
        }
    }
}
