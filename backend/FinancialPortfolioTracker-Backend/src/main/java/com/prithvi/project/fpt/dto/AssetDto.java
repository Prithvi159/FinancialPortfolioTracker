package com.prithvi.project.fpt.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssetDto {
    private String ticker;
    private double quantity;
    private double currentPrice;
    private double totalValue;

}