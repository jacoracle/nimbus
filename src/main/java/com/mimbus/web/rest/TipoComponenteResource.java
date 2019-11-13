package com.mimbus.web.rest;

import com.mimbus.domain.TipoComponente;
import com.mimbus.service.TipoComponenteService;
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
 * REST controller for managing {@link com.mimbus.domain.TipoComponente}.
 */
@RestController
@RequestMapping("/api")
public class TipoComponenteResource {

    private final Logger log = LoggerFactory.getLogger(TipoComponenteResource.class);

    private static final String ENTITY_NAME = "tipoComponente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoComponenteService tipoComponenteService;

    public TipoComponenteResource(TipoComponenteService tipoComponenteService) {
        this.tipoComponenteService = tipoComponenteService;
    }

    /**
     * {@code POST  /tipo-componentes} : Create a new tipoComponente.
     *
     * @param tipoComponente the tipoComponente to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoComponente, or with status {@code 400 (Bad Request)} if the tipoComponente has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-componentes")
    public ResponseEntity<TipoComponente> createTipoComponente(@RequestBody TipoComponente tipoComponente) throws URISyntaxException {
        log.debug("REST request to save TipoComponente : {}", tipoComponente);
        if (tipoComponente.getId() != null) {
            throw new BadRequestAlertException("A new tipoComponente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoComponente result = tipoComponenteService.save(tipoComponente);
        return ResponseEntity.created(new URI("/api/tipo-componentes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-componentes} : Updates an existing tipoComponente.
     *
     * @param tipoComponente the tipoComponente to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoComponente,
     * or with status {@code 400 (Bad Request)} if the tipoComponente is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoComponente couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-componentes")
    public ResponseEntity<TipoComponente> updateTipoComponente(@RequestBody TipoComponente tipoComponente) throws URISyntaxException {
        log.debug("REST request to update TipoComponente : {}", tipoComponente);
        if (tipoComponente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoComponente result = tipoComponenteService.save(tipoComponente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoComponente.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-componentes} : get all the tipoComponentes.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoComponentes in body.
     */
    @GetMapping("/tipo-componentes")
    public ResponseEntity<List<TipoComponente>> getAllTipoComponentes(Pageable pageable) {
        log.debug("REST request to get a page of TipoComponentes");
        Page<TipoComponente> page = tipoComponenteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /tipo-componentes/:id} : get the "id" tipoComponente.
     *
     * @param id the id of the tipoComponente to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoComponente, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-componentes/{id}")
    public ResponseEntity<TipoComponente> getTipoComponente(@PathVariable Long id) {
        log.debug("REST request to get TipoComponente : {}", id);
        Optional<TipoComponente> tipoComponente = tipoComponenteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoComponente);
    }

    /**
     * {@code DELETE  /tipo-componentes/:id} : delete the "id" tipoComponente.
     *
     * @param id the id of the tipoComponente to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-componentes/{id}")
    public ResponseEntity<Void> deleteTipoComponente(@PathVariable Long id) {
        log.debug("REST request to delete TipoComponente : {}", id);
        tipoComponenteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
