package com.prithvi.project.fpt.service;

import com.prithvi.project.fpt.dto.AssetDto;
import com.prithvi.project.fpt.dto.InsightDto;
import com.prithvi.project.fpt.dto.PortfolioDto;
import com.prithvi.project.fpt.entity.Asset;
import com.prithvi.project.fpt.entity.Portfolio;
import com.prithvi.project.fpt.entity.User;
import com.prithvi.project.fpt.repository.AssetRepository;
import com.prithvi.project.fpt.repository.PortfolioRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final AssetRepository assetRepository;
    private final StockService stockService;

    public Portfolio createPortfolio(String name, User user) {
        Portfolio portfolio = new Portfolio();
        portfolio.setName(name);
        portfolio.setUser(user);
        return portfolioRepository.save(portfolio);
    }

    public void addAsset(Long portfolioId, String ticker, double quantity) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));
        Asset asset = assetRepository.findByPortfolioIdAndTicker(portfolioId, ticker)
                .orElseGet(() -> {
                    Asset newAsset = new Asset();
                    newAsset.setTicker(ticker);
                    newAsset.setPortfolio(portfolio);
                    return newAsset;
                });
        asset.setQuantity(asset.getQuantity() + quantity);
        assetRepository.save(asset);
    }

    public void removeAsset(Long portfolioId, String ticker) {
        Asset asset = assetRepository.findByPortfolioIdAndTicker(portfolioId, ticker)
                .orElseThrow(() -> new RuntimeException("Asset not found"));
        assetRepository.delete(asset);
    }

    public PortfolioDto getPortfolioDto(Long portfolioId, User currentUser) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));
        if (!portfolio.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access to portfolio");
        }
        List<AssetDto> assetDtos = portfolio.getAssets().stream().map(asset -> {
            double price;
            try {
                price = stockService.getCurrentPrice(asset.getTicker());
            } catch (Exception e) {
                price = 0.0;
            }
            return new AssetDto(
                    asset.getTicker(),
                    asset.getQuantity(),
                    price,
                    price * asset.getQuantity()
            );
        }).toList();
        return new PortfolioDto(portfolio.getId(), portfolio.getName(), assetDtos);
    }

    public List<Portfolio> getUserPortfolios(User user) {
        return portfolioRepository.findByUserId(user.getId());
    }

    public InsightDto getInsights(Long portfolioId, User currentUser) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));
        if (!portfolio.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access to portfolio");
        }
        List<Asset> assets = portfolio.getAssets();
        if (assets.isEmpty()) {
            return new InsightDto(0, "Add some assets to your portfolio");
        }
        double totalValue = assets.stream()
                .mapToDouble(a -> stockService.getCurrentPrice(a.getTicker()) * a.getQuantity())
                .sum();
        double hhi = assets.stream()
                .mapToDouble(a -> {
                    double share = stockService.getCurrentPrice(a.getTicker()) * a.getQuantity() / totalValue;
                    return share * share;
                }).sum();
        double score = 1 - hhi;
        String rec = assets.size() < 5 ? "Consider adding SPY for better diversification" : "Your portfolio is well diversified";
        return new InsightDto(score, rec);
    }
}