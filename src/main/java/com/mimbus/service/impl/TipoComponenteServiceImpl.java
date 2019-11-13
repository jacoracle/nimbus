package com.mimbus.service.impl;

import com.mimbus.service.TipoComponenteService;
import com.mimbus.domain.TipoComponente;
import com.mimbus.repository.TipoComponenteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TipoComponente}.
 */
@Service
@Transactional
public class TipoComponenteServiceImpl implements TipoComponenteService {

    private final Logger log = LoggerFactory.getLogger(TipoComponenteServiceImpl.class);

    private final TipoComponenteRepository tipoComponenteRepository;

    public TipoComponenteServiceImpl(TipoComponenteRepository tipoComponenteRepository) {
        this.tipoComponenteRepository = tipoComponenteRepository;
    }

    /**
     * Save a tipoComponente.
     *
     * @param tipoComponente the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TipoComponente save(TipoComponente tipoComponente) {
        log.debug("Request to save TipoComponente : {}", tipoComponente);
        return tipoComponenteRepository.save(tipoComponente);
    }

    /**
     * Get all the tipoComponentes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TipoComponente> findAll(Pageable pageable) {
        log.debug("Request to get all TipoComponentes");
        return tipoComponenteRepository.findAll(pageable);
    }


    /**
     * Get one tipoComponente by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TipoComponente> findOne(Long id) {
        log.debug("Request to get TipoComponente : {}", id);
        return tipoComponenteRepository.findById(id);
    }

    /**
     * Delete the tipoComponente by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoComponente : {}", id);
        tipoComponenteRepository.deleteById(id);
    }
}
