package com.example.resenasmix.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.resenasmix.model.Videojuego;

public interface VideojuegoRepository extends JpaRepository<Videojuego, Long> {
}