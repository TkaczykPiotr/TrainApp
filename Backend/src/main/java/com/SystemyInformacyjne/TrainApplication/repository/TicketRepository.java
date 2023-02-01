package com.SystemyInformacyjne.TrainApplication.repository;

import com.SystemyInformacyjne.TrainApplication.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findTopByOrderByIdDesc();

    List<Ticket> findAllByAccount(int id);
}
