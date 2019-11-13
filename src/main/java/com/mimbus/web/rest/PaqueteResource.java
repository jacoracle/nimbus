package com.mimbus.web.rest;

import com.mimbus.domain.Paquete;
import com.mimbus.service.PaqueteService;
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
 * REST controller for managing {@link com.mimbus.domain.Paquete}.
 */
@RestController
@RequestMapping("/api")
public class PaqueteResource {

    private final Logger log = LoggerFactory.getLogger(PaqueteResource.class);

    private static final String ENTITY_NAME = "paquete";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaqueteService paqueteService;

    public PaqueteResource(PaqueteService paqueteService) {
        this.paqueteService = paqueteService;
    }

    /**
     * {@code POST  /paquetes} : Create a new paquete.
     *
     * @param paquete the paquete to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paquete, or with status {@code 400 (Bad Request)} if the paquete has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/paquetes")
    public ResponseEntity<Paquete> createPaquete(@RequestBody Paquete paquete) throws URISyntaxException {
        log.debug("REST request to save Paquete : {}", paquete);
        if (paquete.getId() != null) {
            throw new BadRequestAlertException("A new paquete cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Paquete result = paqueteService.save(paquete);
        return ResponseEntity.created(new URI("/api/paquetes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /paquetes} : Updates an existing paquete.
     *
     * @param paquete the paquete to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paquete,
     * or with status {@code 400 (Bad Request)} if the paquete is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paquete couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/paquetes")
    public ResponseEntity<Paquete> updatePaquete(@RequestBody Paquete paquete) throws URISyntaxException {
        log.debug("REST request to update Paquete : {}", paquete);
        if (paquete.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Paquete result = paqueteService.save(paquete);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paquete.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /paquetes} : get all the paquetes.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paquetes in body.
     */
    @GetMapping("/paquetes")
    public ResponseEntity<List<Paquete>> getAllPaquetes(Pageable pageable) {
        log.debug("REST request to get a page of Paquetes");
        Page<Paquete> page = paqueteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /paquetes/:id} : get the "id" paquete.
     *
     * @param id the id of the paquete to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paquete, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/paquetes/{id}")
    public ResponseEntity<Paquete> getPaquete(@PathVariable Long id) {
        log.debug("REST request to get Paquete : {}", id);
        Optional<Paquete> paquete = paqueteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(paquete);
    }

    /**
     * {@code DELETE  /paquetes/:id} : delete the "id" paquete.
     *
     * @param id the id of the paquete to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/paquetes/{id}")
    public ResponseEntity<Void> deletePaquete(@PathVariable Long id) {
        log.debug("REST request to delete Paquete : {}", id);
        paqueteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
