package com.prithvi.project.fpt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.prithvi.project.fpt.dto.InsightDto;
import com.prithvi.project.fpt.dto.PortfolioDto;
import com.prithvi.project.fpt.entity.User;
import com.prithvi.project.fpt.service.PortfolioService;
import com.prithvi.project.fpt.service.StockService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/portfolios")
public class PortfolioController {
    private final PortfolioService portfolioService;
    private final StockService stockService;


    @PostMapping
    public ResponseEntity<PortfolioDto> create(@RequestParam String name, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(portfolioService.getPortfolioDto(
                portfolioService.createPortfolio(name, user).getId(), user));
    }

    @GetMapping
    public ResponseEntity<List<PortfolioDto>> getAll(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
                portfolioService.getUserPortfolios(user)
                        .stream()
                        .map(p -> portfolioService.getPortfolioDto(p.getId(), user))
                        .toList()
        );
    }

    @PostMapping("/{id}/assets")
    public ResponseEntity<String> addAsset(@PathVariable Long id, @RequestParam String ticker, @RequestParam double quantity) {
        portfolioService.addAsset(id, ticker, quantity);
        return ResponseEntity.ok("Asset added");
    }

    @DeleteMapping("/{id}/assets/{ticker}")
    public ResponseEntity<String> removeAsset(@PathVariable Long id, @PathVariable String ticker) {
        portfolioService.removeAsset(id, ticker);
        return ResponseEntity.ok("Asset removed");
    }

    @GetMapping("/{id}")
    public ResponseEntity<PortfolioDto> get(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(portfolioService.getPortfolioDto(id, user));
    }

    @GetMapping("/{id}/insights")
    public ResponseEntity<InsightDto> getInsights(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(portfolioService.getInsights(id, user));
    }

    @GetMapping("/{id}/historical/{ticker}")
    public ResponseEntity<Map<String, Object>> getHistorical(@PathVariable String ticker, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(stockService.getHistoricalData(ticker));
    }
    
}