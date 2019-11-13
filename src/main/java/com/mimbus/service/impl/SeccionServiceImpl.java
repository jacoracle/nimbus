package com.mimbus.service.impl;

import com.mimbus.service.SeccionService;
import com.mimbus.domain.Seccion;
import com.mimbus.repository.SeccionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Seccion}.
 */
@Service
@Transactional
public class SeccionServiceImpl implements SeccionService {

    private final Logger log = LoggerFactory.getLogger(SeccionServiceImpl.class);

    private final SeccionRepository seccionRepository;

    public SeccionServiceImpl(SeccionRepository seccionRepository) {
        this.seccionRepository = seccionRepository;
    }

    /**
     * Save a seccion.
     *
     * @param seccion the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Seccion save(Seccion seccion) {
        log.debug("Request to save Seccion : {}", seccion);
        return seccionRepository.save(seccion);
    }

    /**
     * Get all the seccions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Seccion> findAll(Pageable pageable) {
        log.debug("Request to get all Seccions");
        return seccionRepository.findAll(pageable);
    }


    /**
     * Get one seccion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Seccion> findOne(Long id) {
        log.debug("Request to get Seccion : {}", id);
        return seccionRepository.findById(id);
    }

    /**
     * Delete the seccion by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Seccion : {}", id);
        seccionRepository.deleteById(id);
    }
}
