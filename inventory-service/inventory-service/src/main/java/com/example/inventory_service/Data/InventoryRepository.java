package com.example.inventory_service.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

public interface InventoryRepository extends JpaRepository<Inventory,Long> {
}
