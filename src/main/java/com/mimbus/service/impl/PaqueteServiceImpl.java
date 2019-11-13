package com.mimbus.service.impl;

import com.mimbus.service.PaqueteService;
import com.mimbus.domain.Paquete;
import com.mimbus.repository.PaqueteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Paquete}.
 */
@Service
@Transactional
public class PaqueteServiceImpl implements PaqueteService {

    private final Logger log = LoggerFactory.getLogger(PaqueteServiceImpl.class);

    private final PaqueteRepository paqueteRepository;

    public PaqueteServiceImpl(PaqueteRepository paqueteRepository) {
        this.paqueteRepository = paqueteRepository;
    }

    /**
     * Save a paquete.
     *
     * @param paquete the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Paquete save(Paquete paquete) {
        log.debug("Request to save Paquete : {}", paquete);
        return paqueteRepository.save(paquete);
    }

    /**
     * Get all the paquetes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Paquete> findAll(Pageable pageable) {
        log.debug("Request to get all Paquetes");
        return paqueteRepository.findAll(pageable);
    }


    /**
     * Get one paquete by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Paquete> findOne(Long id) {
        log.debug("Request to get Paquete : {}", id);
        return paqueteRepository.findById(id);
    }

    /**
     * Delete the paquete by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Paquete : {}", id);
        paqueteRepository.deleteById(id);
    }
}
