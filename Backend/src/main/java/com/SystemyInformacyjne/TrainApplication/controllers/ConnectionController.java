package com.SystemyInformacyjne.TrainApplication.controllers;

import com.SystemyInformacyjne.TrainApplication.models.Connection;
import com.SystemyInformacyjne.TrainApplication.payload.response.ResourceNotFoundException;
import com.SystemyInformacyjne.TrainApplication.repository.ConnectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/connection")
public class ConnectionController {

    @Autowired
    private ConnectionRepository connectionRepository;


    @GetMapping("/view")
    public List<Connection> getAllConnection() {
        return connectionRepository.findAll();
    }


    @PostMapping("/add")
    public Connection createConnection(@RequestBody Connection connection) {
        return connectionRepository.save(connection);
    }

    @GetMapping("/one/{id}")
    public ResponseEntity<Connection> getConnectionById(@PathVariable Long id) {
        Connection connection = connectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Connection not exist with id :" + id));
        return ResponseEntity.ok(connection);
    }


}
