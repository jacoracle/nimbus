package com.mimbus.service;

import com.mimbus.domain.Seccion;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Seccion}.
 */
public interface SeccionService {

    /**
     * Save a seccion.
     *
     * @param seccion the entity to save.
     * @return the persisted entity.
     */
    Seccion save(Seccion seccion);

    /**
     * Get all the seccions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Seccion> findAll(Pageable pageable);


    /**
     * Get the "id" seccion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Seccion> findOne(Long id);

    /**
     * Delete the "id" seccion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
