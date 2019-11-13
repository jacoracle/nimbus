package com.mimbus.service;

import com.mimbus.domain.Calificacion;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Calificacion}.
 */
public interface CalificacionService {

    /**
     * Save a calificacion.
     *
     * @param calificacion the entity to save.
     * @return the persisted entity.
     */
    Calificacion save(Calificacion calificacion);

    /**
     * Get all the calificacions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Calificacion> findAll(Pageable pageable);


    /**
     * Get the "id" calificacion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Calificacion> findOne(Long id);

    /**
     * Delete the "id" calificacion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
