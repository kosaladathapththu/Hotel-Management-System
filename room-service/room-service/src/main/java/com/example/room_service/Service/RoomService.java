package com.example.room_service.Service;


import com.example.room_service.Data.Room;
import com.example.room_service.Data.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

@Autowired
    private RoomRepository roomRepository;


    public List<Room> getAllRooms(){
        return roomRepository.findAll();
    }

    public  Room getRoomById(int id) {
        Optional<Room> Room = roomRepository.findById(id);
        if (Room.isPresent()) {
            return Room.get();
        }
        return null;
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Room room) {
        return roomRepository.save(room)    ;
    }

    public Room deleteRoomById(int id) {
        Optional<Room> Room = roomRepository.findById(id);
        if (Room.isPresent()) {
            roomRepository.deleteById(id);
        }
        return Room.get();
    }

}
