package com.mimbus.web.rest;

import com.mimbus.NimbusApp;
import com.mimbus.domain.Paquete;
import com.mimbus.repository.PaqueteRepository;
import com.mimbus.service.PaqueteService;
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
 * Integration tests for the {@link PaqueteResource} REST controller.
 */
@SpringBootTest(classes = NimbusApp.class)
public class PaqueteResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private PaqueteRepository paqueteRepository;

    @Autowired
    private PaqueteService paqueteService;

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

    private MockMvc restPaqueteMockMvc;

    private Paquete paquete;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PaqueteResource paqueteResource = new PaqueteResource(paqueteService);
        this.restPaqueteMockMvc = MockMvcBuilders.standaloneSetup(paqueteResource)
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
    public static Paquete createEntity(EntityManager em) {
        Paquete paquete = new Paquete()
            .descripcion(DEFAULT_DESCRIPCION);
        return paquete;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Paquete createUpdatedEntity(EntityManager em) {
        Paquete paquete = new Paquete()
            .descripcion(UPDATED_DESCRIPCION);
        return paquete;
    }

    @BeforeEach
    public void initTest() {
        paquete = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaquete() throws Exception {
        int databaseSizeBeforeCreate = paqueteRepository.findAll().size();

        // Create the Paquete
        restPaqueteMockMvc.perform(post("/api/paquetes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paquete)))
            .andExpect(status().isCreated());

        // Validate the Paquete in the database
        List<Paquete> paqueteList = paqueteRepository.findAll();
        assertThat(paqueteList).hasSize(databaseSizeBeforeCreate + 1);
        Paquete testPaquete = paqueteList.get(paqueteList.size() - 1);
        assertThat(testPaquete.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createPaqueteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paqueteRepository.findAll().size();

        // Create the Paquete with an existing ID
        paquete.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaqueteMockMvc.perform(post("/api/paquetes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paquete)))
            .andExpect(status().isBadRequest());

        // Validate the Paquete in the database
        List<Paquete> paqueteList = paqueteRepository.findAll();
        assertThat(paqueteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPaquetes() throws Exception {
        // Initialize the database
        paqueteRepository.saveAndFlush(paquete);

        // Get all the paqueteList
        restPaqueteMockMvc.perform(get("/api/paquetes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paquete.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getPaquete() throws Exception {
        // Initialize the database
        paqueteRepository.saveAndFlush(paquete);

        // Get the paquete
        restPaqueteMockMvc.perform(get("/api/paquetes/{id}", paquete.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(paquete.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }

    @Test
    @Transactional
    public void getNonExistingPaquete() throws Exception {
        // Get the paquete
        restPaqueteMockMvc.perform(get("/api/paquetes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaquete() throws Exception {
        // Initialize the database
        paqueteService.save(paquete);

        int databaseSizeBeforeUpdate = paqueteRepository.findAll().size();

        // Update the paquete
        Paquete updatedPaquete = paqueteRepository.findById(paquete.getId()).get();
        // Disconnect from session so that the updates on updatedPaquete are not directly saved in db
        em.detach(updatedPaquete);
        updatedPaquete
            .descripcion(UPDATED_DESCRIPCION);

        restPaqueteMockMvc.perform(put("/api/paquetes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPaquete)))
            .andExpect(status().isOk());

        // Validate the Paquete in the database
        List<Paquete> paqueteList = paqueteRepository.findAll();
        assertThat(paqueteList).hasSize(databaseSizeBeforeUpdate);
        Paquete testPaquete = paqueteList.get(paqueteList.size() - 1);
        assertThat(testPaquete.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingPaquete() throws Exception {
        int databaseSizeBeforeUpdate = paqueteRepository.findAll().size();

        // Create the Paquete

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaqueteMockMvc.perform(put("/api/paquetes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paquete)))
            .andExpect(status().isBadRequest());

        // Validate the Paquete in the database
        List<Paquete> paqueteList = paqueteRepository.findAll();
        assertThat(paqueteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePaquete() throws Exception {
        // Initialize the database
        paqueteService.save(paquete);

        int databaseSizeBeforeDelete = paqueteRepository.findAll().size();

        // Delete the paquete
        restPaqueteMockMvc.perform(delete("/api/paquetes/{id}", paquete.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Paquete> paqueteList = paqueteRepository.findAll();
        assertThat(paqueteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Paquete.class);
        Paquete paquete1 = new Paquete();
        paquete1.setId(1L);
        Paquete paquete2 = new Paquete();
        paquete2.setId(paquete1.getId());
        assertThat(paquete1).isEqualTo(paquete2);
        paquete2.setId(2L);
        assertThat(paquete1).isNotEqualTo(paquete2);
        paquete1.setId(null);
        assertThat(paquete1).isNotEqualTo(paquete2);
    }
}
