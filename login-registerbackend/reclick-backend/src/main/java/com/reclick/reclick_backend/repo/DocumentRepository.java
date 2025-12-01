package com.reclick.reclick_backend.repo;

import com.reclick.reclick_backend.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Integer> {}
