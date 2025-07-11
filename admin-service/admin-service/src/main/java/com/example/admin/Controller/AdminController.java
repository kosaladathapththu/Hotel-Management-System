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
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private RestTemplate restTemplate;

    // private final String INVENTORY_BASE_URL = "http://localhost:8081/api/inventory"; //onnam aapahu comment eka ayin karanna

    // Admin Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin loginData) {
        try {
            Admin loggedInAdmin = adminService.login(loginData.getEmail(), loginData.getPassword());
            return ResponseEntity.ok(loggedInAdmin);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: " + e.getMessage());
        }
    }

    // 2. Create Admin
    @PostMapping("/admins")
    public Admin createAdmin(@RequestBody Admin admin) {

        return adminService.createAdmin(admin);
    }

    // Update Admin
    @PutMapping("/admins/update/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin updatedAdmin) {
        try {
            Admin admin = adminService.updateAdmin(id, updatedAdmin);
            return ResponseEntity.ok(admin); // Return updated Admin object
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); //  Return 400 without body
        }
    }


//    // ✅ 1. Get All Admins
//    @GetMapping("/admins")
//    public List<Admin> getAllAdmins() {
//        return adminService.getAllAdmins();
//    }


//    // 3. View All Bookings
//    @GetMapping("/bookings")
//    public ResponseEntity<?> getAllBookingsFromBookingService() {
//        String bookingServiceUrl = "http://localhost:8082/api/bookings";  //inter conections
//        try {
//            ResponseEntity<String> response = restTemplate.getForEntity(bookingServiceUrl, String.class);
//            return ResponseEntity.ok(response.getBody());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
//                    .body("Booking service unavailable: " + e.getMessage());
//        }
//    }

//    //4. View All Rooms
//    @GetMapping("/rooms")
//    public ResponseEntity<?> getAllRoomsFromRoomService() {
//        String roomServiceUrl = "http://localhost:8086/api/rooms";
//        try {
//            ResponseEntity<String> response = restTemplate.getForEntity(roomServiceUrl, String.class);
//            return ResponseEntity.ok(response.getBody());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
//                    .body("Room service unavailable: " + e.getMessage());
//        }
//    }

    // 5. Delete Booking
//    @DeleteMapping("/bookings/delete/{id}")
//    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
//        String deleteUrl = "http://localhost:8082/api/bookings/" + id;  //this is like admin calls to booking-service "mcn,booking service....,mn ubawa delete karanna yanne..."
//        try {
//            restTemplate.delete(deleteUrl);
//            return ResponseEntity.ok("✅ Booking deleted successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
//                    .body("Failed to delete booking: " + e.getMessage());
//        }
//    }

//    // Add Room
//    @PostMapping("/rooms/add")
//    public ResponseEntity<?> addRoom(@RequestBody String roomJson) {
//        String addRoomUrl = "http://localhost:8086/api/rooms/admin/add"; // 🎯 Room microservice endpoint
//
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//            HttpEntity<String> request = new HttpEntity<>(roomJson, headers);
//
//            ResponseEntity<String> response = restTemplate.postForEntity(addRoomUrl, request, String.class);
//
//            return ResponseEntity.ok("✅ Room added: " + response.getBody());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body("❌ Failed to add room: " + e.getMessage());
//        }
//    }


//    // 6. Delete Room
//    @DeleteMapping("/rooms/delete/{id}")
//    public ResponseEntity<String> deleteRoom(@PathVariable int id) {
//        String deleteUrl = "http://localhost:8086/api/rooms/admin/delete/" + id;
//        try {
//            restTemplate.delete(deleteUrl);
//            return ResponseEntity.ok("Room deleted successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
//                    .body("Failed to delete room: " + e.getMessage());
//        }
//    }

    // 7. Update Room
//    @PutMapping("/rooms/update/{id}")
//    public ResponseEntity<?> updateRoom(@PathVariable int id, @RequestBody String updatedRoomJson) {
//        String updateUrl = "http://localhost:8086/api/rooms/admin/update/" + id;
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//            HttpEntity<String> requestEntity = new HttpEntity<>(updatedRoomJson, headers);
//            ResponseEntity<String> response = restTemplate.exchange(updateUrl, HttpMethod.PUT, requestEntity, String.class);
//            return ResponseEntity.ok("✅ Room updated: " + response.getBody());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
//                    .body("Failed to update room: " + e.getMessage());
//        }
//    }

    //  8. Get All Inventory
//    @GetMapping("/inventory")
//    public ResponseEntity<?> getAllInventory() {
//        try {
//            ResponseEntity<String> response = restTemplate.getForEntity(INVENTORY_BASE_URL, String.class);
//            return ResponseEntity.ok(response.getBody());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
//                    .body("Inventory service unavailable: " + e.getMessage());
//        }
//    }

    // 9. Get Inventory by ID
//    @GetMapping("/inventory/{id}")
//    public ResponseEntity<?> getInventoryById(@PathVariable Long id) {
//        try {
//            ResponseEntity<String> response = restTemplate.getForEntity(INVENTORY_BASE_URL + "/" + id, String.class);
//            return ResponseEntity.ok(response.getBody());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body("Inventory not found: " + e.getMessage());
//        }
//    }

    // 10. Add Inventory
//    @PostMapping("/inventory")
//    public ResponseEntity<?> addInventory(@RequestBody String inventoryJson) {
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//            HttpEntity<String> request = new HttpEntity<>(inventoryJson, headers);
//            ResponseEntity<String> response = restTemplate.postForEntity(INVENTORY_BASE_URL, request, String.class);
//            return ResponseEntity.ok("✅ Inventory added: " + response.getBody());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add inventory: " + e.getMessage());
//        }
//    }

    // 11. Update Inventory
//    @PutMapping("/inventory/{id}")
//    public ResponseEntity<?> updateInventory(@PathVariable Long id, @RequestBody String updatedInventoryJson) {
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//            HttpEntity<String> request = new HttpEntity<>(updatedInventoryJson, headers);
//            ResponseEntity<String> response = restTemplate.exchange(INVENTORY_BASE_URL + "/" + id, HttpMethod.PUT, request, String.class);
//            return ResponseEntity.ok("✅ Inventory updated: " + response.getBody());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update inventory: " + e.getMessage());
//        }
//    }

    // 12. Delete Inventory
//    @DeleteMapping("/inventory/{id}")
//    public ResponseEntity<?> deleteInventory(@PathVariable Long id) {
//        try {
//            restTemplate.delete(INVENTORY_BASE_URL + "/" + id);
//            return ResponseEntity.ok("✅ Inventory deleted successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete inventory: " + e.getMessage());
//        }
//    }

    // 13. Search Inventory
//    @GetMapping("/inventory/search")
//    public ResponseEntity<?> searchInventory(
//            @RequestParam(required = false) String itemName,
//            @RequestParam(required = false) String status) {
//
//        String url = INVENTORY_BASE_URL + "/search";
//        if (itemName != null) url += "?itemName=" + itemName;
//        if (itemName != null && status != null) url += "&status=" + status;
//        else if (status != null) url += "?status=" + status;
//
//        try {
//            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
//            return ResponseEntity.ok(response.getBody());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Search failed: " + e.getMessage());
//        }
//    }



}
