package com.SystemyInformacyjne.TrainApplication.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.SystemyInformacyjne.TrainApplication.models.ERole;
import com.SystemyInformacyjne.TrainApplication.models.Role;
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}