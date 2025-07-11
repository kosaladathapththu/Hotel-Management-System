package com.example.user_service.Controller;

import com.example.user_service.Data.User;
import com.example.user_service.Data.BookingRequest;
import com.example.user_service.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RestTemplate restTemplate;

    // Registerion for new user
    @PostMapping("/users/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // 🔐 User Login only (no rooms fetching)
    @PostMapping("/users/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        try {
            // ✅ Authenticate user
            User loggedInUser = userService.login(loginUser.getEmail(), loginUser.getPassword());

            // 👤 Return only user data
            return ResponseEntity.ok(loggedInUser);

        } catch (RuntimeException e) {
            // ❌ If login fails
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    // ✅ Update user profile
    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        try {
            User user = userService.updateUser(id, updatedUser);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


    // Get all users (see for admin)
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID(for admin)
    @GetMapping("/users/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    //Book a room (calls Booking Microservice) - User
//    @PostMapping("/users/book-room")
//    public ResponseEntity<String> bookRoom(@RequestBody BookingRequest request) {
//        String bookingServiceUrl = "http://localhost:8082/api/bookings"; // call to booking service to get deatails....
//
//        try {
//            // Step 1: Check user exists
//            Optional<User> user = userService.getUserById(request.getUserId());
//
//            if (user.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                        .body("Booking failed: User not found. Please login or register.");
//            }
//
//            // Step 2: Send booking request to Booking Service
//            ResponseEntity<String> response = restTemplate.postForEntity(
//                    bookingServiceUrl,
//                    request,
//                    String.class
//            );
//
//            return ResponseEntity.ok("Booking Confirmed: " + response.getBody());
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Booking Failed: " + e.getMessage());
//        }
//    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
