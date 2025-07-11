package com.example.room_service.Data;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room,Integer> {

    //  Custom method to find available rooms
    List<Room> findByStatusIgnoreCase(String status);
}
