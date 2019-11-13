package com.mimbus.service.impl;

import com.mimbus.service.CursoService;
import com.mimbus.domain.Curso;
import com.mimbus.repository.CursoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Curso}.
 */
@Service
@Transactional
public class CursoServiceImpl implements CursoService {

    private final Logger log = LoggerFactory.getLogger(CursoServiceImpl.class);

    private final CursoRepository cursoRepository;

    public CursoServiceImpl(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    /**
     * Save a curso.
     *
     * @param curso the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Curso save(Curso curso) {
        log.debug("Request to save Curso : {}", curso);
        return cursoRepository.save(curso);
    }

    /**
     * Get all the cursos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Curso> findAll(Pageable pageable) {
        log.debug("Request to get all Cursos");
        return cursoRepository.findAll(pageable);
    }

    /**
     * Get all the cursos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Curso> findAllWithEagerRelationships(Pageable pageable) {
        return cursoRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one curso by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Curso> findOne(Long id) {
        log.debug("Request to get Curso : {}", id);
        return cursoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the curso by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Curso : {}", id);
        cursoRepository.deleteById(id);
    }
}
