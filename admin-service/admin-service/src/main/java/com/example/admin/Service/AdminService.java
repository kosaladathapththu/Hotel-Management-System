package com.example.admin.Service;

import com.example.admin.Data.Admin;
import com.example.admin.Data.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepo;

    public List<Admin> getAllAdmins() {
        return adminRepo.findAll();
    }

    public Admin createAdmin(Admin admin) {
        return adminRepo.save(admin);
    }

    public Admin findByEmail(String email) {
        return adminRepo.findByEmail(email);
    }
}
