package com.prithvi.project.fpt.service;

import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class StockService {
    @Value("${alpha.vantage.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public double getCurrentPrice(String ticker) {
        String url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + ticker + "&apikey=" + apiKey;
        @SuppressWarnings("unchecked")
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        if (response == null) {
            throw new RuntimeException("No response from API for ticker: " + ticker);
        }
        @SuppressWarnings("unchecked")
        Map<String, String> quote = (Map<String, String>) response.get("Global Quote");
        if (quote == null) {
            throw new IllegalArgumentException("Invalid ticker or no data available for: " + ticker);
        }
        String priceStr = quote.get("05. price");
        if (priceStr == null || priceStr.trim().isEmpty()) {
            throw new IllegalArgumentException("Price data is missing for ticker: " + ticker);
        }
        try {
            return Double.parseDouble(priceStr.trim());
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid price format for ticker: " + ticker, e);
        }
    }

    public Map<String, Object> getHistoricalData(String ticker) {
        String url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&apikey=" + apiKey;
        @SuppressWarnings("unchecked")
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        @SuppressWarnings("unchecked")
        Map<String, Object> timeSeries = (Map<String, Object>) response.get("Time Series (Daily)");
        if (timeSeries == null) {
            throw new RuntimeException("Unable to fetch historical data for " + ticker);
        }
        return timeSeries;
    }
}