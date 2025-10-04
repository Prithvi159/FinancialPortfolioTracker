package com.prithvi.project.fpt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prithvi.project.fpt.entity.Portfolio;

import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    List<Portfolio> findByUserId(Long userId);
}