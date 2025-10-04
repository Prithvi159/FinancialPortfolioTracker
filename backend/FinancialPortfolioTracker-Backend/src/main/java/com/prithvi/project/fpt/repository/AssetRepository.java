package com.prithvi.project.fpt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prithvi.project.fpt.entity.Asset;

import java.util.Optional;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    Optional<Asset> findByPortfolioIdAndTicker(Long portfolioId, String ticker);
}