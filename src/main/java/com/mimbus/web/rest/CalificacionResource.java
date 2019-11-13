package com.mimbus.web.rest;

import com.mimbus.domain.Calificacion;
import com.mimbus.service.CalificacionService;
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
 * REST controller for managing {@link com.mimbus.domain.Calificacion}.
 */
@RestController
@RequestMapping("/api")
public class CalificacionResource {

    private final Logger log = LoggerFactory.getLogger(CalificacionResource.class);

    private static final String ENTITY_NAME = "calificacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CalificacionService calificacionService;

    public CalificacionResource(CalificacionService calificacionService) {
        this.calificacionService = calificacionService;
    }

    /**
     * {@code POST  /calificacions} : Create a new calificacion.
     *
     * @param calificacion the calificacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new calificacion, or with status {@code 400 (Bad Request)} if the calificacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/calificacions")
    public ResponseEntity<Calificacion> createCalificacion(@RequestBody Calificacion calificacion) throws URISyntaxException {
        log.debug("REST request to save Calificacion : {}", calificacion);
        if (calificacion.getId() != null) {
            throw new BadRequestAlertException("A new calificacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Calificacion result = calificacionService.save(calificacion);
        return ResponseEntity.created(new URI("/api/calificacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /calificacions} : Updates an existing calificacion.
     *
     * @param calificacion the calificacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated calificacion,
     * or with status {@code 400 (Bad Request)} if the calificacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the calificacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/calificacions")
    public ResponseEntity<Calificacion> updateCalificacion(@RequestBody Calificacion calificacion) throws URISyntaxException {
        log.debug("REST request to update Calificacion : {}", calificacion);
        if (calificacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Calificacion result = calificacionService.save(calificacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, calificacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /calificacions} : get all the calificacions.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of calificacions in body.
     */
    @GetMapping("/calificacions")
    public ResponseEntity<List<Calificacion>> getAllCalificacions(Pageable pageable) {
        log.debug("REST request to get a page of Calificacions");
        Page<Calificacion> page = calificacionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /calificacions/:id} : get the "id" calificacion.
     *
     * @param id the id of the calificacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the calificacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/calificacions/{id}")
    public ResponseEntity<Calificacion> getCalificacion(@PathVariable Long id) {
        log.debug("REST request to get Calificacion : {}", id);
        Optional<Calificacion> calificacion = calificacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(calificacion);
    }

    /**
     * {@code DELETE  /calificacions/:id} : delete the "id" calificacion.
     *
     * @param id the id of the calificacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/calificacions/{id}")
    public ResponseEntity<Void> deleteCalificacion(@PathVariable Long id) {
        log.debug("REST request to delete Calificacion : {}", id);
        calificacionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
