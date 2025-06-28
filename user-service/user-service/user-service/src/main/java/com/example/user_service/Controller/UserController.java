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

    // ✅ Register a new user
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // ✅ Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // ✅ Get single user by ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // ✅ Login user
    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {
        return userService.login(loginUser.getEmail(), loginUser.getPassword());
    }

    // ✅ Book room by calling Booking Service
    @PostMapping("/book-room")
    public ResponseEntity<String> bookRoom(@RequestBody BookingRequest request) {
        String bookingServiceUrl = "http://localhost:8082/api/bookings";

        try {
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
