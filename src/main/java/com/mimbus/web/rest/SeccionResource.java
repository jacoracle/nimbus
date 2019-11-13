package com.mimbus.web.rest;

import com.mimbus.domain.Seccion;
import com.mimbus.service.SeccionService;
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
 * REST controller for managing {@link com.mimbus.domain.Seccion}.
 */
@RestController
@RequestMapping("/api")
public class SeccionResource {

    private final Logger log = LoggerFactory.getLogger(SeccionResource.class);

    private static final String ENTITY_NAME = "seccion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SeccionService seccionService;

    public SeccionResource(SeccionService seccionService) {
        this.seccionService = seccionService;
    }

    /**
     * {@code POST  /seccions} : Create a new seccion.
     *
     * @param seccion the seccion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new seccion, or with status {@code 400 (Bad Request)} if the seccion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/seccions")
    public ResponseEntity<Seccion> createSeccion(@RequestBody Seccion seccion) throws URISyntaxException {
        log.debug("REST request to save Seccion : {}", seccion);
        if (seccion.getId() != null) {
            throw new BadRequestAlertException("A new seccion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Seccion result = seccionService.save(seccion);
        return ResponseEntity.created(new URI("/api/seccions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /seccions} : Updates an existing seccion.
     *
     * @param seccion the seccion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated seccion,
     * or with status {@code 400 (Bad Request)} if the seccion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the seccion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/seccions")
    public ResponseEntity<Seccion> updateSeccion(@RequestBody Seccion seccion) throws URISyntaxException {
        log.debug("REST request to update Seccion : {}", seccion);
        if (seccion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Seccion result = seccionService.save(seccion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, seccion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /seccions} : get all the seccions.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of seccions in body.
     */
    @GetMapping("/seccions")
    public ResponseEntity<List<Seccion>> getAllSeccions(Pageable pageable) {
        log.debug("REST request to get a page of Seccions");
        Page<Seccion> page = seccionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /seccions/:id} : get the "id" seccion.
     *
     * @param id the id of the seccion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the seccion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/seccions/{id}")
    public ResponseEntity<Seccion> getSeccion(@PathVariable Long id) {
        log.debug("REST request to get Seccion : {}", id);
        Optional<Seccion> seccion = seccionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(seccion);
    }

    /**
     * {@code DELETE  /seccions/:id} : delete the "id" seccion.
     *
     * @param id the id of the seccion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/seccions/{id}")
    public ResponseEntity<Void> deleteSeccion(@PathVariable Long id) {
        log.debug("REST request to delete Seccion : {}", id);
        seccionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
