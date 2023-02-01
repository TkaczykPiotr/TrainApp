package com.SystemyInformacyjne.TrainApplication.controllers;

import com.SystemyInformacyjne.TrainApplication.models.Ticket;
import com.SystemyInformacyjne.TrainApplication.payload.response.ResourceNotFoundException;
import com.SystemyInformacyjne.TrainApplication.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/ticket")
public class TicketController {
    @Autowired
    private TicketRepository ticketRepository;

    @GetMapping("/all")
    public List<Ticket> getAllTicket(){
        return ticketRepository.findAll();
    }

    @GetMapping("/all/{id}")
    public List<Ticket> getAllTicketByAccount(@PathVariable int id){
        return ticketRepository.findAllByAccount(id);
    }

    @PostMapping("/add")
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @GetMapping("/one/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ticket not exist with id :" + id));
        return ResponseEntity.ok(ticket);
    }

    @PutMapping("/second/{id}")
    public ResponseEntity<Ticket> updateSecondTicket(@PathVariable Long id, @RequestBody Ticket ticketDetails){
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not exist with id :" + id));

        ticket.setReduction(ticketDetails.getReduction());
        ticket.setUserName(ticketDetails.getUserName());
        ticket.setUserSurname(ticketDetails.getUserSurname());
        ticket.setDates(ticketDetails.getDates());
        ticket.setSite(ticketDetails.getSite());
        ticket.setPrize(ticketDetails.getPrize());

        Ticket updatedTicket = ticketRepository.save(ticket);
        return ResponseEntity.ok(updatedTicket);
    }

    @PutMapping("/third/{id}")
    public ResponseEntity<Ticket> updateThirdTicket(@PathVariable Long id, @RequestBody Ticket ticketDetails){
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not exist with id :" + id));

        ticket.setPayments(ticketDetails.getPayments());
        ticket.setAccount(ticketDetails.getAccount());
        Ticket updatedTicket = ticketRepository.save(ticket);


        return ResponseEntity.ok(updatedTicket);
    }

}
