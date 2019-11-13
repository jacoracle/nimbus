package com.mimbus.service;

import com.mimbus.domain.Paquete;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Paquete}.
 */
public interface PaqueteService {

    /**
     * Save a paquete.
     *
     * @param paquete the entity to save.
     * @return the persisted entity.
     */
    Paquete save(Paquete paquete);

    /**
     * Get all the paquetes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Paquete> findAll(Pageable pageable);


    /**
     * Get the "id" paquete.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Paquete> findOne(Long id);

    /**
     * Delete the "id" paquete.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
