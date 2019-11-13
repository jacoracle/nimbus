package com.mimbus.service;

import com.mimbus.domain.Componente;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Componente}.
 */
public interface ComponenteService {

    /**
     * Save a componente.
     *
     * @param componente the entity to save.
     * @return the persisted entity.
     */
    Componente save(Componente componente);

    /**
     * Get all the componentes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Componente> findAll(Pageable pageable);


    /**
     * Get the "id" componente.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Componente> findOne(Long id);

    /**
     * Delete the "id" componente.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
