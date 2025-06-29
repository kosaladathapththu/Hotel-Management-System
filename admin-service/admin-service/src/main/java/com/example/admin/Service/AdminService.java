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


    public List<Admin> getAllAdmins(){
        return adminRepo.findAll();
    }

    public  Admin getAdminById(int id) {
        Optional<Admin> Admin = adminRepo.findById(id);
        if (Admin.isPresent()) {
            return Admin.get();
        }
        return null;
    }

    public Admin createAdmin(Admin admin) {
        return adminRepo.save(admin);
    }

    public Admin updateAdmin(Admin admin) {
        return adminRepo.save(admin)    ;
    }

    public Admin deleteAdminById(int id) {
        Optional<Admin> Admin = adminRepo.findById(id);
        if (Admin.isPresent()) {
            adminRepo.deleteById(id);
        }
        return Admin.get();
    }


}
