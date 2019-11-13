package com.mimbus.web.rest;

import com.mimbus.domain.Ejercicio;
import com.mimbus.service.EjercicioService;
import com.mimbus.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mimbus.domain.Ejercicio}.
 */
@RestController
@RequestMapping("/api")
public class EjercicioResource {

    private final Logger log = LoggerFactory.getLogger(EjercicioResource.class);

    private static final String ENTITY_NAME = "ejercicio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EjercicioService ejercicioService;

    public EjercicioResource(EjercicioService ejercicioService) {
        this.ejercicioService = ejercicioService;
    }

    /**
     * {@code POST  /ejercicios} : Create a new ejercicio.
     *
     * @param ejercicio the ejercicio to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ejercicio, or with status {@code 400 (Bad Request)} if the ejercicio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ejercicios")
    public ResponseEntity<Ejercicio> createEjercicio(@RequestBody Ejercicio ejercicio) throws URISyntaxException {
        log.debug("REST request to save Ejercicio : {}", ejercicio);
        if (ejercicio.getId() != null) {
            throw new BadRequestAlertException("A new ejercicio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ejercicio result = ejercicioService.save(ejercicio);
        return ResponseEntity.created(new URI("/api/ejercicios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ejercicios} : Updates an existing ejercicio.
     *
     * @param ejercicio the ejercicio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ejercicio,
     * or with status {@code 400 (Bad Request)} if the ejercicio is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ejercicio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ejercicios")
    public ResponseEntity<Ejercicio> updateEjercicio(@RequestBody Ejercicio ejercicio) throws URISyntaxException {
        log.debug("REST request to update Ejercicio : {}", ejercicio);
        if (ejercicio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ejercicio result = ejercicioService.save(ejercicio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ejercicio.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ejercicios} : get all the ejercicios.
     *

     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ejercicios in body.
     */
    @GetMapping("/ejercicios")
    public ResponseEntity<List<Ejercicio>> getAllEjercicios(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Ejercicios");
        Page<Ejercicio> page;
        if (eagerload) {
            page = ejercicioService.findAllWithEagerRelationships(pageable);
        } else {
            page = ejercicioService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ejercicios/:id} : get the "id" ejercicio.
     *
     * @param id the id of the ejercicio to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ejercicio, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ejercicios/{id}")
    public ResponseEntity<Ejercicio> getEjercicio(@PathVariable Long id) {
        log.debug("REST request to get Ejercicio : {}", id);
        Optional<Ejercicio> ejercicio = ejercicioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ejercicio);
    }

    /**
     * {@code DELETE  /ejercicios/:id} : delete the "id" ejercicio.
     *
     * @param id the id of the ejercicio to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ejercicios/{id}")
    public ResponseEntity<Void> deleteEjercicio(@PathVariable Long id) {
        log.debug("REST request to delete Ejercicio : {}", id);
        ejercicioService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
