package com.SystemyInformacyjne.TrainApplication.repository;

import com.SystemyInformacyjne.TrainApplication.models.Connection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConnectionRepository extends JpaRepository<Connection, Long> {



}
