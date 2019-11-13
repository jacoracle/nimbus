package com.mimbus.service;

import com.mimbus.domain.Ejercicio;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Ejercicio}.
 */
public interface EjercicioService {

    /**
     * Save a ejercicio.
     *
     * @param ejercicio the entity to save.
     * @return the persisted entity.
     */
    Ejercicio save(Ejercicio ejercicio);

    /**
     * Get all the ejercicios.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Ejercicio> findAll(Pageable pageable);

    /**
     * Get all the ejercicios with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Ejercicio> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" ejercicio.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Ejercicio> findOne(Long id);

    /**
     * Delete the "id" ejercicio.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
