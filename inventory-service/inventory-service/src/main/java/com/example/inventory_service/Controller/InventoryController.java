package com.example.inventory_service.Controller;

import com.example.inventory_service.Data.Inventory;
import com.example.inventory_service.Service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // ✅ Get All Inventory
    @GetMapping("/inventories")
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    // ✅ Get By ID
    @GetMapping("/inventories/{id}")
    public Inventory getInventoryById(@PathVariable Long id) {
        return inventoryService.getInventoryById(id);
    }

    // ✅ Add Inventory (adminId comes from frontend)
    @PostMapping("/inventories")
    public ResponseEntity<?> addInventory(@RequestBody Inventory inventory) {
        Inventory saved = inventoryService.saveInventory(inventory);
        return ResponseEntity.ok(saved);
    }

    // ✅ Update Inventory
    @PutMapping("/inventories/{id}")
    public ResponseEntity<?> updateInventory(@PathVariable Long id, @RequestBody Inventory inventory) {
        Inventory updated = inventoryService.updateInventory(id, inventory);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Inventory not found");
    }

    // ✅ Delete Inventory
    @DeleteMapping("/inventories/{id}")
    public String deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
        return "✅ Inventory item deleted successfully";
    }

    // ✅ Search Items
    @GetMapping(path="/inventories", params={"itemName", "status"})
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
