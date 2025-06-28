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


    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }


    public Inventory getInventoryById(Long id) {
        Optional<Inventory> optional = inventoryRepository.findById(id);
        return optional.orElse(null);
    }


    public Inventory saveInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }


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


    public void deleteInventory(Long id) {
        inventoryRepository.deleteById(id);
    }


    public List<Inventory> searchByItemName(String itemName) {
        return inventoryRepository.searchByItemName(itemName);
    }


    public List<Inventory> searchByStatus(String status) {
        return inventoryRepository.searchByStatus(status);
    }


    public List<Inventory> searchByItemNameAndStatus(String itemName, String status) {
        return inventoryRepository.searchByItemNameAndStatus(itemName, status);
    }
}
