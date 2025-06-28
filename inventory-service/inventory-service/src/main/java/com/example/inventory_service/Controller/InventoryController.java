package com.example.inventory_service.Controller;

import com.example.inventory_service.Data.Inventory;
import com.example.inventory_service.Service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory") // 🌐 Base URL for this controller
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // 🟢 GET all inventory items
    @GetMapping
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    // 🟢 GET one inventory item by ID
    @GetMapping("/{id}")
    public Inventory getInventoryById(@PathVariable Long id) {
        return inventoryService.getInventoryById(id);
    }

    // 🟢 POST - Add new inventory item
    @PostMapping
    public Inventory addInventory(@RequestBody Inventory inventory) {
        return inventoryService.saveInventory(inventory);
    }

    // 🟡 PUT - Update existing item
    @PutMapping("/{id}")
    public Inventory updateInventory(@PathVariable Long id, @RequestBody Inventory inventory) {
        return inventoryService.updateInventory(id, inventory);
    }

    // 🔴 DELETE inventory by ID
    @DeleteMapping("/{id}")
    public String deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
        return "Inventory item deleted successfully ✅";
    }
}
