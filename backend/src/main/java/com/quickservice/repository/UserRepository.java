package com.quickservice.repository;

import com.quickservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // LOGIN
    Optional<User> findByEmailIgnoreCase(String email);

    // CHECK IF EMAIL ALREADY EXISTS (used in signup)
    boolean existsByEmailIgnoreCase(String email);

    // GET ALL PROVIDERS
    List<User> findByRoleIgnoreCase(String role);

    // (Optional) This also works but is not mandatory:
    List<User> findByRole(String role);
        long countByRole(String role);

}
