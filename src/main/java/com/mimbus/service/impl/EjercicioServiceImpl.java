package com.mimbus.service.impl;

import com.mimbus.service.EjercicioService;
import com.mimbus.domain.Ejercicio;
import com.mimbus.repository.EjercicioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Ejercicio}.
 */
@Service
@Transactional
public class EjercicioServiceImpl implements EjercicioService {

    private final Logger log = LoggerFactory.getLogger(EjercicioServiceImpl.class);

    private final EjercicioRepository ejercicioRepository;

    public EjercicioServiceImpl(EjercicioRepository ejercicioRepository) {
        this.ejercicioRepository = ejercicioRepository;
    }

    /**
     * Save a ejercicio.
     *
     * @param ejercicio the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Ejercicio save(Ejercicio ejercicio) {
        log.debug("Request to save Ejercicio : {}", ejercicio);
        return ejercicioRepository.save(ejercicio);
    }

    /**
     * Get all the ejercicios.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Ejercicio> findAll(Pageable pageable) {
        log.debug("Request to get all Ejercicios");
        return ejercicioRepository.findAll(pageable);
    }

    /**
     * Get all the ejercicios with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Ejercicio> findAllWithEagerRelationships(Pageable pageable) {
        return ejercicioRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one ejercicio by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Ejercicio> findOne(Long id) {
        log.debug("Request to get Ejercicio : {}", id);
        return ejercicioRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the ejercicio by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Ejercicio : {}", id);
        ejercicioRepository.deleteById(id);
    }
}
