package com.SystemyInformacyjne.TrainApplication.controllers;

import com.SystemyInformacyjne.TrainApplication.models.Sites;
import com.SystemyInformacyjne.TrainApplication.payload.response.ResourceNotFoundException;
import com.SystemyInformacyjne.TrainApplication.repository.SitesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/site")
public class SitesController {

    @Autowired
    private SitesRepository sitesRepository;

    @GetMapping("/all/{id}")
    public List<Sites> getAllSites(@PathVariable int id){
        return sitesRepository.findAllByConn(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Sites> updateSites(@PathVariable int id){
        Sites sites = sitesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Site not exist with id :" + id));

        sites.setStatus(false);
        Sites updatedSites = sitesRepository.save(sites);

        return ResponseEntity.ok(updatedSites);
    }
}
