package com.example.user_service.Service;

import com.example.user_service.Data.User;
import com.example.user_service.Data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ✅ Register new user with duplicate email check
    public User registerUser(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            throw new RuntimeException("🚫 Email already registered!");
        }
        return userRepository.save(user);
    }

    // ✅ Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Get one user
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // ✅ Login with error handling
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("❌ No user found with this email.");
        }
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("❌ Incorrect password.");
        }
        return user;
    }
}
