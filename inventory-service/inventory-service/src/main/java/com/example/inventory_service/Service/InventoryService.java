package com.example.inventory_service.Service;

import com.example.inventory_service.Data.Inventory;
import com.example.inventory_service.Data.InventoryRepository; // ✅ Correct import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    // 🔄 Get all inventory items
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    // 🔍 Get inventory item by ID
    public Inventory getInventoryById(Long id) {
        Optional<Inventory> optional = inventoryRepository.findById(id);
        return optional.orElse(null);
    }

    // ➕ Add new inventory item
    public Inventory saveInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    // ✏️ Update inventory item
    public Inventory updateInventory(Long id, Inventory updatedInventory) {
        Optional<Inventory> existingInventoryOpt = inventoryRepository.findById(id);

        if (existingInventoryOpt.isPresent()) {
            Inventory existingInventory = existingInventoryOpt.get();

            existingInventory.setItemName(updatedInventory.getItemName());
            existingInventory.setQuantity(updatedInventory.getQuantity());
            existingInventory.setPurchaseDate(updatedInventory.getPurchaseDate());
            existingInventory.setStatus(updatedInventory.getStatus());
            existingInventory.setUnitPrice(updatedInventory.getUnitPrice());
            existingInventory.setAdminId(updatedInventory.getAdminId());

            return inventoryRepository.save(existingInventory);
        } else {
            return null; // Or throw a custom NotFoundException
        }
    }

    // ❌ Delete inventory by ID
    public void deleteInventory(Long id) {
        inventoryRepository.deleteById(id);
    }

    // 🔍 Search by itemName
    public List<Inventory> searchByItemName(String itemName) {
        return inventoryRepository.searchByItemName(itemName);
    }

    // 🔍 Search by status
    public List<Inventory> searchByStatus(String status) {
        return inventoryRepository.searchByStatus(status);
    }

    // 🔍 Search by both itemName + status
    public List<Inventory> searchByItemNameAndStatus(String itemName, String status) {
        return inventoryRepository.searchByItemNameAndStatus(itemName, status);
    }
}
