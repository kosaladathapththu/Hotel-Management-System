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

    // Register new user and duplicate email check
    public User registerUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already registered!");
        }
        return userRepository.save(user);
    }

    // ✏️ Update user info
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setFullName(updatedUser.getFullName());
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setPhone(updatedUser.getPhone());
                    existingUser.setNic(updatedUser.getNic());
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get one user
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Login with proper error handling
    public User login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("No user found with this email.");
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Incorrect password.");
        }

        return user;
    }

    public void deleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("User not found with ID " + id);
        }
    }

}
