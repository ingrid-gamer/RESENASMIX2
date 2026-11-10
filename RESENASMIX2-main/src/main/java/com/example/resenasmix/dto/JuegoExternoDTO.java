package com.example.resenasmix.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class JuegoExternoDTO {

    private Long id;
    private String title;
    private String thumbnail;

    @JsonProperty("short_description")
    private String shortDescription;

    private String genre;
    private String platform;
    private String publisher;
    private String developer;

    @JsonProperty("release_date")
    private String releaseDate;

    @JsonProperty("freetogame_profile_url")
    private String freeToGameProfileUrl;
}