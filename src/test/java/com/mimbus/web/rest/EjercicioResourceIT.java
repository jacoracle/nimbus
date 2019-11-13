package com.mimbus.web.rest;

import com.mimbus.NimbusApp;
import com.mimbus.domain.Ejercicio;
import com.mimbus.repository.EjercicioRepository;
import com.mimbus.service.EjercicioService;
import com.mimbus.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.mimbus.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EjercicioResource} REST controller.
 */
@SpringBootTest(classes = NimbusApp.class)
public class EjercicioResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENIDO = "AAAAAAAAAA";
    private static final String UPDATED_CONTENIDO = "BBBBBBBBBB";

    @Autowired
    private EjercicioRepository ejercicioRepository;

    @Mock
    private EjercicioRepository ejercicioRepositoryMock;

    @Mock
    private EjercicioService ejercicioServiceMock;

    @Autowired
    private EjercicioService ejercicioService;

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

    private MockMvc restEjercicioMockMvc;

    private Ejercicio ejercicio;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EjercicioResource ejercicioResource = new EjercicioResource(ejercicioService);
        this.restEjercicioMockMvc = MockMvcBuilders.standaloneSetup(ejercicioResource)
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
    public static Ejercicio createEntity(EntityManager em) {
        Ejercicio ejercicio = new Ejercicio()
            .descripcion(DEFAULT_DESCRIPCION)
            .contenido(DEFAULT_CONTENIDO);
        return ejercicio;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ejercicio createUpdatedEntity(EntityManager em) {
        Ejercicio ejercicio = new Ejercicio()
            .descripcion(UPDATED_DESCRIPCION)
            .contenido(UPDATED_CONTENIDO);
        return ejercicio;
    }

    @BeforeEach
    public void initTest() {
        ejercicio = createEntity(em);
    }

    @Test
    @Transactional
    public void createEjercicio() throws Exception {
        int databaseSizeBeforeCreate = ejercicioRepository.findAll().size();

        // Create the Ejercicio
        restEjercicioMockMvc.perform(post("/api/ejercicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ejercicio)))
            .andExpect(status().isCreated());

        // Validate the Ejercicio in the database
        List<Ejercicio> ejercicioList = ejercicioRepository.findAll();
        assertThat(ejercicioList).hasSize(databaseSizeBeforeCreate + 1);
        Ejercicio testEjercicio = ejercicioList.get(ejercicioList.size() - 1);
        assertThat(testEjercicio.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testEjercicio.getContenido()).isEqualTo(DEFAULT_CONTENIDO);
    }

    @Test
    @Transactional
    public void createEjercicioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ejercicioRepository.findAll().size();

        // Create the Ejercicio with an existing ID
        ejercicio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEjercicioMockMvc.perform(post("/api/ejercicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ejercicio)))
            .andExpect(status().isBadRequest());

        // Validate the Ejercicio in the database
        List<Ejercicio> ejercicioList = ejercicioRepository.findAll();
        assertThat(ejercicioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEjercicios() throws Exception {
        // Initialize the database
        ejercicioRepository.saveAndFlush(ejercicio);

        // Get all the ejercicioList
        restEjercicioMockMvc.perform(get("/api/ejercicios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ejercicio.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].contenido").value(hasItem(DEFAULT_CONTENIDO)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllEjerciciosWithEagerRelationshipsIsEnabled() throws Exception {
        EjercicioResource ejercicioResource = new EjercicioResource(ejercicioServiceMock);
        when(ejercicioServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restEjercicioMockMvc = MockMvcBuilders.standaloneSetup(ejercicioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEjercicioMockMvc.perform(get("/api/ejercicios?eagerload=true"))
        .andExpect(status().isOk());

        verify(ejercicioServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllEjerciciosWithEagerRelationshipsIsNotEnabled() throws Exception {
        EjercicioResource ejercicioResource = new EjercicioResource(ejercicioServiceMock);
            when(ejercicioServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restEjercicioMockMvc = MockMvcBuilders.standaloneSetup(ejercicioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEjercicioMockMvc.perform(get("/api/ejercicios?eagerload=true"))
        .andExpect(status().isOk());

            verify(ejercicioServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getEjercicio() throws Exception {
        // Initialize the database
        ejercicioRepository.saveAndFlush(ejercicio);

        // Get the ejercicio
        restEjercicioMockMvc.perform(get("/api/ejercicios/{id}", ejercicio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ejercicio.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.contenido").value(DEFAULT_CONTENIDO));
    }

    @Test
    @Transactional
    public void getNonExistingEjercicio() throws Exception {
        // Get the ejercicio
        restEjercicioMockMvc.perform(get("/api/ejercicios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEjercicio() throws Exception {
        // Initialize the database
        ejercicioService.save(ejercicio);

        int databaseSizeBeforeUpdate = ejercicioRepository.findAll().size();

        // Update the ejercicio
        Ejercicio updatedEjercicio = ejercicioRepository.findById(ejercicio.getId()).get();
        // Disconnect from session so that the updates on updatedEjercicio are not directly saved in db
        em.detach(updatedEjercicio);
        updatedEjercicio
            .descripcion(UPDATED_DESCRIPCION)
            .contenido(UPDATED_CONTENIDO);

        restEjercicioMockMvc.perform(put("/api/ejercicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEjercicio)))
            .andExpect(status().isOk());

        // Validate the Ejercicio in the database
        List<Ejercicio> ejercicioList = ejercicioRepository.findAll();
        assertThat(ejercicioList).hasSize(databaseSizeBeforeUpdate);
        Ejercicio testEjercicio = ejercicioList.get(ejercicioList.size() - 1);
        assertThat(testEjercicio.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testEjercicio.getContenido()).isEqualTo(UPDATED_CONTENIDO);
    }

    @Test
    @Transactional
    public void updateNonExistingEjercicio() throws Exception {
        int databaseSizeBeforeUpdate = ejercicioRepository.findAll().size();

        // Create the Ejercicio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEjercicioMockMvc.perform(put("/api/ejercicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ejercicio)))
            .andExpect(status().isBadRequest());

        // Validate the Ejercicio in the database
        List<Ejercicio> ejercicioList = ejercicioRepository.findAll();
        assertThat(ejercicioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEjercicio() throws Exception {
        // Initialize the database
        ejercicioService.save(ejercicio);

        int databaseSizeBeforeDelete = ejercicioRepository.findAll().size();

        // Delete the ejercicio
        restEjercicioMockMvc.perform(delete("/api/ejercicios/{id}", ejercicio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ejercicio> ejercicioList = ejercicioRepository.findAll();
        assertThat(ejercicioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ejercicio.class);
        Ejercicio ejercicio1 = new Ejercicio();
        ejercicio1.setId(1L);
        Ejercicio ejercicio2 = new Ejercicio();
        ejercicio2.setId(ejercicio1.getId());
        assertThat(ejercicio1).isEqualTo(ejercicio2);
        ejercicio2.setId(2L);
        assertThat(ejercicio1).isNotEqualTo(ejercicio2);
        ejercicio1.setId(null);
        assertThat(ejercicio1).isNotEqualTo(ejercicio2);
    }
}
