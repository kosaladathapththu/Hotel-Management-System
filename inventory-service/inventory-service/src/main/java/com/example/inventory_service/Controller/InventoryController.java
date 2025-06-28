package com.example.inventory_service.Controller;

import com.example.inventory_service.Data.Inventory;
import com.example.inventory_service.Service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private RestTemplate restTemplate;

    private final String ADMIN_SERVICE_BASE_URL = "http://localhost:8081/api/admin/";

    @GetMapping
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    @GetMapping("/{id}")
    public Inventory getInventoryById(@PathVariable Long id) {
        return inventoryService.getInventoryById(id);
    }

    @PostMapping
    public ResponseEntity<?> addInventory(@RequestBody Inventory inventory) {
        try {
            restTemplate.getForEntity(ADMIN_SERVICE_BASE_URL + inventory.getAdminId(), String.class);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Admin ID: " + inventory.getAdminId());
        }
        Inventory saved = inventoryService.saveInventory(inventory);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateInventory(@PathVariable Long id, @RequestBody Inventory inventory) {
        try {
            restTemplate.getForEntity(ADMIN_SERVICE_BASE_URL + inventory.getAdminId(), String.class);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Admin ID");
        }
        Inventory updated = inventoryService.updateInventory(id, inventory);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Inventory not found");
        }
    }

    @DeleteMapping("/{id}")
    public String deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
        return "Inventory item deleted successfully";
    }

    @GetMapping("/search")
    public List<Inventory> searchInventory(
            @RequestParam(required = false) String itemName,
            @RequestParam(required = false) String status) {

        if (itemName != null && status != null) {
            return inventoryService.searchByItemNameAndStatus(itemName, status);
        } else if (itemName != null) {
            return inventoryService.searchByItemName(itemName);
        } else if (status != null) {
            return inventoryService.searchByStatus(status);
        } else {
            return inventoryService.getAllInventory();
        }
    }
}
