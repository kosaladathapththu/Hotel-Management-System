package com.example.admin.Service;

import com.example.admin.Data.Admin;
import com.example.admin.Data.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepo;

    public Admin login(String email, String password) {
        Optional<Admin> adminOpt = adminRepo.findByEmail(email); // ✅ use adminRepo
        if (adminOpt.isEmpty()) {
            throw new RuntimeException("No admin found with this email.");
        }

        Admin admin = adminOpt.get();

        if (!admin.getPassword().equals(password)) {
            throw new RuntimeException("Incorrect password.");
        }

        return admin;
    }



//    public List<Admin> getAllAdmins() {
//        return adminRepo.findAll();
//    }

    public Admin createAdmin(Admin admin) {

        return adminRepo.save(admin);
    }

    public Admin updateAdmin(Long id, Admin updatedAdmin) {
        Admin existingAdmin = adminRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + id));

        // 🔁 Update fields
        existingAdmin.setName(updatedAdmin.getName());
        existingAdmin.setEmail(updatedAdmin.getEmail());
        existingAdmin.setPassword(updatedAdmin.getPassword());

        return adminRepo.save(existingAdmin);
    }



}
