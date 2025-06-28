package com.example.room_service.Controller;


import com.example.room_service.Data.Room;
import com.example.room_service.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RoomController {

    @Autowired
    private RoomService roomService;



    @GetMapping(path = "/rooms")
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();

    }
    @PostMapping(path="/rooms")
    public  Room createRoom(@RequestBody Room room) {
        return roomService.createRoom(room);
    }

}
