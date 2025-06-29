package com.example.admin.Controller;


import com.example.admin.Data.Admin;
import com.example.admin.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping(path = "/admins")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();

    }
    @GetMapping(path = "/admins/{id}")
    public Admin getAdminById(@PathVariable int id) {

        return adminService.getAdminById(id);
    }

    @PostMapping(path="/admins")
    public  Admin createAdmin(@RequestBody Admin admin) {
        return adminService.createAdmin(admin);
    }

    @PutMapping(path="/admins")
    public Admin updateAdmin(@RequestBody Admin admin) {
        return adminService.updateAdmin(admin);
    }

    @DeleteMapping(path = "/admins/{id}")
    public Admin deleteAdminById(@PathVariable int id) {
        return adminService.deleteAdminById(id);
    }
}
