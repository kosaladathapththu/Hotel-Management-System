package com.example.inventory_service.Data;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "inventory")
public class Inventory {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "item_name", nullable = false)
    private String itemName;


    @Column(name = "quantity", nullable = false)
    private Integer quantity;


    @Column(name = "purchase_date")
    private LocalDate purchaseDate;


    @Column(name = "status")
    private String status;


    @Column(name = "unit_price")
    private Double unitPrice;


    @Column(name = "admin_id")
    private Long adminId;

    //  No @ManyToOne here, because Admin is in another microservice
}
