package com.example.inventory_service.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    // 🔍 Search by item name
    @Query("SELECT i FROM Inventory i WHERE i.itemName = ?1")
    List<Inventory> searchByItemName(String itemName);

    // 🔍 Search by status
    @Query("SELECT i FROM Inventory i WHERE i.status = ?1")
    List<Inventory> searchByStatus(String status);

    // 🔍 Search by both itemName and status
    @Query("SELECT i FROM Inventory i WHERE i.itemName = ?1 AND i.status = ?2")
    List<Inventory> searchByItemNameAndStatus(String itemName, String status);
}
