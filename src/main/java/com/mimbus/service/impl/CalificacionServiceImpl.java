package com.mimbus.service.impl;

import com.mimbus.service.CalificacionService;
import com.mimbus.domain.Calificacion;
import com.mimbus.repository.CalificacionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Calificacion}.
 */
@Service
@Transactional
public class CalificacionServiceImpl implements CalificacionService {

    private final Logger log = LoggerFactory.getLogger(CalificacionServiceImpl.class);

    private final CalificacionRepository calificacionRepository;

    public CalificacionServiceImpl(CalificacionRepository calificacionRepository) {
        this.calificacionRepository = calificacionRepository;
    }

    /**
     * Save a calificacion.
     *
     * @param calificacion the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Calificacion save(Calificacion calificacion) {
        log.debug("Request to save Calificacion : {}", calificacion);
        return calificacionRepository.save(calificacion);
    }

    /**
     * Get all the calificacions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Calificacion> findAll(Pageable pageable) {
        log.debug("Request to get all Calificacions");
        return calificacionRepository.findAll(pageable);
    }


    /**
     * Get one calificacion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Calificacion> findOne(Long id) {
        log.debug("Request to get Calificacion : {}", id);
        return calificacionRepository.findById(id);
    }

    /**
     * Delete the calificacion by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Calificacion : {}", id);
        calificacionRepository.deleteById(id);
    }
}
