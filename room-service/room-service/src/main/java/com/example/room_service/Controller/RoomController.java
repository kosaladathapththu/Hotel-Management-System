package com.example.room_service.Controller;


import com.example.room_service.Data.Room;
import com.example.room_service.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RoomController {

    @Autowired
    private RoomService roomService;



    @GetMapping(path = "/rooms")
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();

    }
    @GetMapping(path = "/admins/{id}")
    public Room getRoomById(@PathVariable int id) {

        return roomService.getRoomById(id);
    }

    @PostMapping(path="/rooms")
    public  Room createRoom(@RequestBody Room room) {
        return roomService.createRoom(room);
    }

    @PutMapping(path="/rooms")
    public Room updateRoom(@RequestBody Room room) {
        return roomService.updateRoom(room);
    }

    @DeleteMapping(path = "/rooms/{id}")
    public Room deleteRoomById(@PathVariable int id) {
        return roomService.deleteRoomById(id);
    }

}
