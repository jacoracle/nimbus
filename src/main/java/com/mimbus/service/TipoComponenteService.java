package com.mimbus.service;

import com.mimbus.domain.TipoComponente;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link TipoComponente}.
 */
public interface TipoComponenteService {

    /**
     * Save a tipoComponente.
     *
     * @param tipoComponente the entity to save.
     * @return the persisted entity.
     */
    TipoComponente save(TipoComponente tipoComponente);

    /**
     * Get all the tipoComponentes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TipoComponente> findAll(Pageable pageable);


    /**
     * Get the "id" tipoComponente.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoComponente> findOne(Long id);

    /**
     * Delete the "id" tipoComponente.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
