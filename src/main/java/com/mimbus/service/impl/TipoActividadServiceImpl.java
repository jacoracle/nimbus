package com.mimbus.service.impl;

import com.mimbus.service.TipoActividadService;
import com.mimbus.domain.TipoActividad;
import com.mimbus.repository.TipoActividadRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TipoActividad}.
 */
@Service
@Transactional
public class TipoActividadServiceImpl implements TipoActividadService {

    private final Logger log = LoggerFactory.getLogger(TipoActividadServiceImpl.class);

    private final TipoActividadRepository tipoActividadRepository;

    public TipoActividadServiceImpl(TipoActividadRepository tipoActividadRepository) {
        this.tipoActividadRepository = tipoActividadRepository;
    }

    /**
     * Save a tipoActividad.
     *
     * @param tipoActividad the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TipoActividad save(TipoActividad tipoActividad) {
        log.debug("Request to save TipoActividad : {}", tipoActividad);
        return tipoActividadRepository.save(tipoActividad);
    }

    /**
     * Get all the tipoActividads.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TipoActividad> findAll(Pageable pageable) {
        log.debug("Request to get all TipoActividads");
        return tipoActividadRepository.findAll(pageable);
    }


    /**
     * Get one tipoActividad by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TipoActividad> findOne(Long id) {
        log.debug("Request to get TipoActividad : {}", id);
        return tipoActividadRepository.findById(id);
    }

    /**
     * Delete the tipoActividad by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoActividad : {}", id);
        tipoActividadRepository.deleteById(id);
    }
}
