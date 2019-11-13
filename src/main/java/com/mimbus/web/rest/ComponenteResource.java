package com.mimbus.web.rest;

import com.mimbus.domain.Componente;
import com.mimbus.service.ComponenteService;
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
 * REST controller for managing {@link com.mimbus.domain.Componente}.
 */
@RestController
@RequestMapping("/api")
public class ComponenteResource {

    private final Logger log = LoggerFactory.getLogger(ComponenteResource.class);

    private static final String ENTITY_NAME = "componente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ComponenteService componenteService;

    public ComponenteResource(ComponenteService componenteService) {
        this.componenteService = componenteService;
    }

    /**
     * {@code POST  /componentes} : Create a new componente.
     *
     * @param componente the componente to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new componente, or with status {@code 400 (Bad Request)} if the componente has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/componentes")
    public ResponseEntity<Componente> createComponente(@RequestBody Componente componente) throws URISyntaxException {
        log.debug("REST request to save Componente : {}", componente);
        if (componente.getId() != null) {
            throw new BadRequestAlertException("A new componente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Componente result = componenteService.save(componente);
        return ResponseEntity.created(new URI("/api/componentes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /componentes} : Updates an existing componente.
     *
     * @param componente the componente to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated componente,
     * or with status {@code 400 (Bad Request)} if the componente is not valid,
     * or with status {@code 500 (Internal Server Error)} if the componente couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/componentes")
    public ResponseEntity<Componente> updateComponente(@RequestBody Componente componente) throws URISyntaxException {
        log.debug("REST request to update Componente : {}", componente);
        if (componente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Componente result = componenteService.save(componente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, componente.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /componentes} : get all the componentes.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of componentes in body.
     */
    @GetMapping("/componentes")
    public ResponseEntity<List<Componente>> getAllComponentes(Pageable pageable) {
        log.debug("REST request to get a page of Componentes");
        Page<Componente> page = componenteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /componentes/:id} : get the "id" componente.
     *
     * @param id the id of the componente to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the componente, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/componentes/{id}")
    public ResponseEntity<Componente> getComponente(@PathVariable Long id) {
        log.debug("REST request to get Componente : {}", id);
        Optional<Componente> componente = componenteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(componente);
    }

    /**
     * {@code DELETE  /componentes/:id} : delete the "id" componente.
     *
     * @param id the id of the componente to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/componentes/{id}")
    public ResponseEntity<Void> deleteComponente(@PathVariable Long id) {
        log.debug("REST request to delete Componente : {}", id);
        componenteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
