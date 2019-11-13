package com.mimbus.service.impl;

import com.mimbus.service.ComponenteService;
import com.mimbus.domain.Componente;
import com.mimbus.repository.ComponenteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Componente}.
 */
@Service
@Transactional
public class ComponenteServiceImpl implements ComponenteService {

    private final Logger log = LoggerFactory.getLogger(ComponenteServiceImpl.class);

    private final ComponenteRepository componenteRepository;

    public ComponenteServiceImpl(ComponenteRepository componenteRepository) {
        this.componenteRepository = componenteRepository;
    }

    /**
     * Save a componente.
     *
     * @param componente the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Componente save(Componente componente) {
        log.debug("Request to save Componente : {}", componente);
        return componenteRepository.save(componente);
    }

    /**
     * Get all the componentes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Componente> findAll(Pageable pageable) {
        log.debug("Request to get all Componentes");
        return componenteRepository.findAll(pageable);
    }


    /**
     * Get one componente by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Componente> findOne(Long id) {
        log.debug("Request to get Componente : {}", id);
        return componenteRepository.findById(id);
    }

    /**
     * Delete the componente by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Componente : {}", id);
        componenteRepository.deleteById(id);
    }
}
