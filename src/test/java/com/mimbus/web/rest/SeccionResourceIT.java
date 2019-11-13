package com.mimbus.web.rest;

import com.mimbus.NimbusApp;
import com.mimbus.domain.Seccion;
import com.mimbus.repository.SeccionRepository;
import com.mimbus.service.SeccionService;
import com.mimbus.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mimbus.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SeccionResource} REST controller.
 */
@SpringBootTest(classes = NimbusApp.class)
public class SeccionResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private SeccionRepository seccionRepository;

    @Autowired
    private SeccionService seccionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSeccionMockMvc;

    private Seccion seccion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SeccionResource seccionResource = new SeccionResource(seccionService);
        this.restSeccionMockMvc = MockMvcBuilders.standaloneSetup(seccionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Seccion createEntity(EntityManager em) {
        Seccion seccion = new Seccion()
            .descripcion(DEFAULT_DESCRIPCION);
        return seccion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Seccion createUpdatedEntity(EntityManager em) {
        Seccion seccion = new Seccion()
            .descripcion(UPDATED_DESCRIPCION);
        return seccion;
    }

    @BeforeEach
    public void initTest() {
        seccion = createEntity(em);
    }

    @Test
    @Transactional
    public void createSeccion() throws Exception {
        int databaseSizeBeforeCreate = seccionRepository.findAll().size();

        // Create the Seccion
        restSeccionMockMvc.perform(post("/api/seccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seccion)))
            .andExpect(status().isCreated());

        // Validate the Seccion in the database
        List<Seccion> seccionList = seccionRepository.findAll();
        assertThat(seccionList).hasSize(databaseSizeBeforeCreate + 1);
        Seccion testSeccion = seccionList.get(seccionList.size() - 1);
        assertThat(testSeccion.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createSeccionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = seccionRepository.findAll().size();

        // Create the Seccion with an existing ID
        seccion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSeccionMockMvc.perform(post("/api/seccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seccion)))
            .andExpect(status().isBadRequest());

        // Validate the Seccion in the database
        List<Seccion> seccionList = seccionRepository.findAll();
        assertThat(seccionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSeccions() throws Exception {
        // Initialize the database
        seccionRepository.saveAndFlush(seccion);

        // Get all the seccionList
        restSeccionMockMvc.perform(get("/api/seccions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(seccion.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getSeccion() throws Exception {
        // Initialize the database
        seccionRepository.saveAndFlush(seccion);

        // Get the seccion
        restSeccionMockMvc.perform(get("/api/seccions/{id}", seccion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(seccion.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }

    @Test
    @Transactional
    public void getNonExistingSeccion() throws Exception {
        // Get the seccion
        restSeccionMockMvc.perform(get("/api/seccions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSeccion() throws Exception {
        // Initialize the database
        seccionService.save(seccion);

        int databaseSizeBeforeUpdate = seccionRepository.findAll().size();

        // Update the seccion
        Seccion updatedSeccion = seccionRepository.findById(seccion.getId()).get();
        // Disconnect from session so that the updates on updatedSeccion are not directly saved in db
        em.detach(updatedSeccion);
        updatedSeccion
            .descripcion(UPDATED_DESCRIPCION);

        restSeccionMockMvc.perform(put("/api/seccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSeccion)))
            .andExpect(status().isOk());

        // Validate the Seccion in the database
        List<Seccion> seccionList = seccionRepository.findAll();
        assertThat(seccionList).hasSize(databaseSizeBeforeUpdate);
        Seccion testSeccion = seccionList.get(seccionList.size() - 1);
        assertThat(testSeccion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingSeccion() throws Exception {
        int databaseSizeBeforeUpdate = seccionRepository.findAll().size();

        // Create the Seccion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSeccionMockMvc.perform(put("/api/seccions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seccion)))
            .andExpect(status().isBadRequest());

        // Validate the Seccion in the database
        List<Seccion> seccionList = seccionRepository.findAll();
        assertThat(seccionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSeccion() throws Exception {
        // Initialize the database
        seccionService.save(seccion);

        int databaseSizeBeforeDelete = seccionRepository.findAll().size();

        // Delete the seccion
        restSeccionMockMvc.perform(delete("/api/seccions/{id}", seccion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Seccion> seccionList = seccionRepository.findAll();
        assertThat(seccionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Seccion.class);
        Seccion seccion1 = new Seccion();
        seccion1.setId(1L);
        Seccion seccion2 = new Seccion();
        seccion2.setId(seccion1.getId());
        assertThat(seccion1).isEqualTo(seccion2);
        seccion2.setId(2L);
        assertThat(seccion1).isNotEqualTo(seccion2);
        seccion1.setId(null);
        assertThat(seccion1).isNotEqualTo(seccion2);
    }
}
