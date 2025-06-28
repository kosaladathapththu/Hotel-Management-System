package com.example.user_service.Controller;

import com.example.user_service.Data.User;
import com.example.user_service.Data.BookingRequest;
import com.example.user_service.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RestTemplate restTemplate;

    // ✅ Register with error handling
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // ✅ Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // ✅ Get user by ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // ✅ Login with error handling
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        try {
            User loggedInUser = userService.login(loginUser.getEmail(), loginUser.getPassword());
            return ResponseEntity.ok(loggedInUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    // ✅ Book room (booking logic already working)
    @PostMapping("/book-room")
    public ResponseEntity<String> bookRoom(@RequestBody BookingRequest request) {
        String bookingServiceUrl = "http://localhost:8082/api/bookings";

        try {
            // 🔐 Step 1: Check if user exists
            Optional<User> user = userService.getUserById(request.getUserId());

            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("❌ Booking failed: User not found. Please login or register.");
            }

            // ✅ Step 2: Send booking request
            ResponseEntity<String> response = restTemplate.postForEntity(
                    bookingServiceUrl,
                    request,
                    String.class
            );

            return ResponseEntity.ok("✅ Booking Confirmed: " + response.getBody());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Booking Failed: " + e.getMessage());
        }
    }

}