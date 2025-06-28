package com.example.room_service.Service;


import com.example.room_service.Data.Room;
import com.example.room_service.Data.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

@Autowired
    private RoomRepository roomRepository;


    public List<Room> getAllRooms(){
        return roomRepository.findAll();
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

}
