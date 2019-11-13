package com.mimbus.service;

import com.mimbus.domain.TipoActividad;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link TipoActividad}.
 */
public interface TipoActividadService {

    /**
     * Save a tipoActividad.
     *
     * @param tipoActividad the entity to save.
     * @return the persisted entity.
     */
    TipoActividad save(TipoActividad tipoActividad);

    /**
     * Get all the tipoActividads.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TipoActividad> findAll(Pageable pageable);


    /**
     * Get the "id" tipoActividad.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoActividad> findOne(Long id);

    /**
     * Delete the "id" tipoActividad.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
