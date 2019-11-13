package com.mimbus.web.rest;

import com.mimbus.NimbusApp;
import com.mimbus.domain.Componente;
import com.mimbus.repository.ComponenteRepository;
import com.mimbus.service.ComponenteService;
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
 * Integration tests for the {@link ComponenteResource} REST controller.
 */
@SpringBootTest(classes = NimbusApp.class)
public class ComponenteResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Integer DEFAULT_VERSION = 1;
    private static final Integer UPDATED_VERSION = 2;

    @Autowired
    private ComponenteRepository componenteRepository;

    @Autowired
    private ComponenteService componenteService;

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

    private MockMvc restComponenteMockMvc;

    private Componente componente;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComponenteResource componenteResource = new ComponenteResource(componenteService);
        this.restComponenteMockMvc = MockMvcBuilders.standaloneSetup(componenteResource)
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
    public static Componente createEntity(EntityManager em) {
        Componente componente = new Componente()
            .descripcion(DEFAULT_DESCRIPCION)
            .version(DEFAULT_VERSION);
        return componente;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Componente createUpdatedEntity(EntityManager em) {
        Componente componente = new Componente()
            .descripcion(UPDATED_DESCRIPCION)
            .version(UPDATED_VERSION);
        return componente;
    }

    @BeforeEach
    public void initTest() {
        componente = createEntity(em);
    }

    @Test
    @Transactional
    public void createComponente() throws Exception {
        int databaseSizeBeforeCreate = componenteRepository.findAll().size();

        // Create the Componente
        restComponenteMockMvc.perform(post("/api/componentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(componente)))
            .andExpect(status().isCreated());

        // Validate the Componente in the database
        List<Componente> componenteList = componenteRepository.findAll();
        assertThat(componenteList).hasSize(databaseSizeBeforeCreate + 1);
        Componente testComponente = componenteList.get(componenteList.size() - 1);
        assertThat(testComponente.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testComponente.getVersion()).isEqualTo(DEFAULT_VERSION);
    }

    @Test
    @Transactional
    public void createComponenteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = componenteRepository.findAll().size();

        // Create the Componente with an existing ID
        componente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComponenteMockMvc.perform(post("/api/componentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(componente)))
            .andExpect(status().isBadRequest());

        // Validate the Componente in the database
        List<Componente> componenteList = componenteRepository.findAll();
        assertThat(componenteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllComponentes() throws Exception {
        // Initialize the database
        componenteRepository.saveAndFlush(componente);

        // Get all the componenteList
        restComponenteMockMvc.perform(get("/api/componentes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(componente.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)));
    }
    
    @Test
    @Transactional
    public void getComponente() throws Exception {
        // Initialize the database
        componenteRepository.saveAndFlush(componente);

        // Get the componente
        restComponenteMockMvc.perform(get("/api/componentes/{id}", componente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(componente.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION));
    }

    @Test
    @Transactional
    public void getNonExistingComponente() throws Exception {
        // Get the componente
        restComponenteMockMvc.perform(get("/api/componentes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComponente() throws Exception {
        // Initialize the database
        componenteService.save(componente);

        int databaseSizeBeforeUpdate = componenteRepository.findAll().size();

        // Update the componente
        Componente updatedComponente = componenteRepository.findById(componente.getId()).get();
        // Disconnect from session so that the updates on updatedComponente are not directly saved in db
        em.detach(updatedComponente);
        updatedComponente
            .descripcion(UPDATED_DESCRIPCION)
            .version(UPDATED_VERSION);

        restComponenteMockMvc.perform(put("/api/componentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedComponente)))
            .andExpect(status().isOk());

        // Validate the Componente in the database
        List<Componente> componenteList = componenteRepository.findAll();
        assertThat(componenteList).hasSize(databaseSizeBeforeUpdate);
        Componente testComponente = componenteList.get(componenteList.size() - 1);
        assertThat(testComponente.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testComponente.getVersion()).isEqualTo(UPDATED_VERSION);
    }

    @Test
    @Transactional
    public void updateNonExistingComponente() throws Exception {
        int databaseSizeBeforeUpdate = componenteRepository.findAll().size();

        // Create the Componente

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restComponenteMockMvc.perform(put("/api/componentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(componente)))
            .andExpect(status().isBadRequest());

        // Validate the Componente in the database
        List<Componente> componenteList = componenteRepository.findAll();
        assertThat(componenteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteComponente() throws Exception {
        // Initialize the database
        componenteService.save(componente);

        int databaseSizeBeforeDelete = componenteRepository.findAll().size();

        // Delete the componente
        restComponenteMockMvc.perform(delete("/api/componentes/{id}", componente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Componente> componenteList = componenteRepository.findAll();
        assertThat(componenteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Componente.class);
        Componente componente1 = new Componente();
        componente1.setId(1L);
        Componente componente2 = new Componente();
        componente2.setId(componente1.getId());
        assertThat(componente1).isEqualTo(componente2);
        componente2.setId(2L);
        assertThat(componente1).isNotEqualTo(componente2);
        componente1.setId(null);
        assertThat(componente1).isNotEqualTo(componente2);
    }
}
