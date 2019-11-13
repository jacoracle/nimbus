package com.mimbus.web.rest;

import com.mimbus.NimbusApp;
import com.mimbus.domain.Calificacion;
import com.mimbus.repository.CalificacionRepository;
import com.mimbus.service.CalificacionService;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.mimbus.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CalificacionResource} REST controller.
 */
@SpringBootTest(classes = NimbusApp.class)
public class CalificacionResourceIT {

    private static final String DEFAULT_SCORE = "AAAAAAAAAA";
    private static final String UPDATED_SCORE = "BBBBBBBBBB";

    private static final Integer DEFAULT_MONEDAS = 1;
    private static final Integer UPDATED_MONEDAS = 2;

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INTENTOS = 1;
    private static final Integer UPDATED_INTENTOS = 2;

    @Autowired
    private CalificacionRepository calificacionRepository;

    @Autowired
    private CalificacionService calificacionService;

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

    private MockMvc restCalificacionMockMvc;

    private Calificacion calificacion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CalificacionResource calificacionResource = new CalificacionResource(calificacionService);
        this.restCalificacionMockMvc = MockMvcBuilders.standaloneSetup(calificacionResource)
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
    public static Calificacion createEntity(EntityManager em) {
        Calificacion calificacion = new Calificacion()
            .score(DEFAULT_SCORE)
            .monedas(DEFAULT_MONEDAS)
            .fecha(DEFAULT_FECHA)
            .intentos(DEFAULT_INTENTOS);
        return calificacion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Calificacion createUpdatedEntity(EntityManager em) {
        Calificacion calificacion = new Calificacion()
            .score(UPDATED_SCORE)
            .monedas(UPDATED_MONEDAS)
            .fecha(UPDATED_FECHA)
            .intentos(UPDATED_INTENTOS);
        return calificacion;
    }

    @BeforeEach
    public void initTest() {
        calificacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createCalificacion() throws Exception {
        int databaseSizeBeforeCreate = calificacionRepository.findAll().size();

        // Create the Calificacion
        restCalificacionMockMvc.perform(post("/api/calificacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(calificacion)))
            .andExpect(status().isCreated());

        // Validate the Calificacion in the database
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeCreate + 1);
        Calificacion testCalificacion = calificacionList.get(calificacionList.size() - 1);
        assertThat(testCalificacion.getScore()).isEqualTo(DEFAULT_SCORE);
        assertThat(testCalificacion.getMonedas()).isEqualTo(DEFAULT_MONEDAS);
        assertThat(testCalificacion.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testCalificacion.getIntentos()).isEqualTo(DEFAULT_INTENTOS);
    }

    @Test
    @Transactional
    public void createCalificacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = calificacionRepository.findAll().size();

        // Create the Calificacion with an existing ID
        calificacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCalificacionMockMvc.perform(post("/api/calificacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(calificacion)))
            .andExpect(status().isBadRequest());

        // Validate the Calificacion in the database
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCalificacions() throws Exception {
        // Initialize the database
        calificacionRepository.saveAndFlush(calificacion);

        // Get all the calificacionList
        restCalificacionMockMvc.perform(get("/api/calificacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(calificacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)))
            .andExpect(jsonPath("$.[*].monedas").value(hasItem(DEFAULT_MONEDAS)))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].intentos").value(hasItem(DEFAULT_INTENTOS)));
    }
    
    @Test
    @Transactional
    public void getCalificacion() throws Exception {
        // Initialize the database
        calificacionRepository.saveAndFlush(calificacion);

        // Get the calificacion
        restCalificacionMockMvc.perform(get("/api/calificacions/{id}", calificacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(calificacion.getId().intValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE))
            .andExpect(jsonPath("$.monedas").value(DEFAULT_MONEDAS))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.intentos").value(DEFAULT_INTENTOS));
    }

    @Test
    @Transactional
    public void getNonExistingCalificacion() throws Exception {
        // Get the calificacion
        restCalificacionMockMvc.perform(get("/api/calificacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCalificacion() throws Exception {
        // Initialize the database
        calificacionService.save(calificacion);

        int databaseSizeBeforeUpdate = calificacionRepository.findAll().size();

        // Update the calificacion
        Calificacion updatedCalificacion = calificacionRepository.findById(calificacion.getId()).get();
        // Disconnect from session so that the updates on updatedCalificacion are not directly saved in db
        em.detach(updatedCalificacion);
        updatedCalificacion
            .score(UPDATED_SCORE)
            .monedas(UPDATED_MONEDAS)
            .fecha(UPDATED_FECHA)
            .intentos(UPDATED_INTENTOS);

        restCalificacionMockMvc.perform(put("/api/calificacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCalificacion)))
            .andExpect(status().isOk());

        // Validate the Calificacion in the database
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeUpdate);
        Calificacion testCalificacion = calificacionList.get(calificacionList.size() - 1);
        assertThat(testCalificacion.getScore()).isEqualTo(UPDATED_SCORE);
        assertThat(testCalificacion.getMonedas()).isEqualTo(UPDATED_MONEDAS);
        assertThat(testCalificacion.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testCalificacion.getIntentos()).isEqualTo(UPDATED_INTENTOS);
    }

    @Test
    @Transactional
    public void updateNonExistingCalificacion() throws Exception {
        int databaseSizeBeforeUpdate = calificacionRepository.findAll().size();

        // Create the Calificacion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCalificacionMockMvc.perform(put("/api/calificacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(calificacion)))
            .andExpect(status().isBadRequest());

        // Validate the Calificacion in the database
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCalificacion() throws Exception {
        // Initialize the database
        calificacionService.save(calificacion);

        int databaseSizeBeforeDelete = calificacionRepository.findAll().size();

        // Delete the calificacion
        restCalificacionMockMvc.perform(delete("/api/calificacions/{id}", calificacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Calificacion> calificacionList = calificacionRepository.findAll();
        assertThat(calificacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Calificacion.class);
        Calificacion calificacion1 = new Calificacion();
        calificacion1.setId(1L);
        Calificacion calificacion2 = new Calificacion();
        calificacion2.setId(calificacion1.getId());
        assertThat(calificacion1).isEqualTo(calificacion2);
        calificacion2.setId(2L);
        assertThat(calificacion1).isNotEqualTo(calificacion2);
        calificacion1.setId(null);
        assertThat(calificacion1).isNotEqualTo(calificacion2);
    }
}
