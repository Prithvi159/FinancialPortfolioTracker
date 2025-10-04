package com.prithvi.project.fpt.dto;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioDto {
    private Long id;
    private String name;
    private List<AssetDto> assets;

}