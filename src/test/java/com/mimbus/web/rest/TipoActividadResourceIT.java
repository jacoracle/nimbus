package com.mimbus.web.rest;

import com.mimbus.NimbusApp;
import com.mimbus.domain.TipoActividad;
import com.mimbus.repository.TipoActividadRepository;
import com.mimbus.service.TipoActividadService;
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
 * Integration tests for the {@link TipoActividadResource} REST controller.
 */
@SpringBootTest(classes = NimbusApp.class)
public class TipoActividadResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private TipoActividadRepository tipoActividadRepository;

    @Autowired
    private TipoActividadService tipoActividadService;

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

    private MockMvc restTipoActividadMockMvc;

    private TipoActividad tipoActividad;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoActividadResource tipoActividadResource = new TipoActividadResource(tipoActividadService);
        this.restTipoActividadMockMvc = MockMvcBuilders.standaloneSetup(tipoActividadResource)
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
    public static TipoActividad createEntity(EntityManager em) {
        TipoActividad tipoActividad = new TipoActividad()
            .descripcion(DEFAULT_DESCRIPCION);
        return tipoActividad;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoActividad createUpdatedEntity(EntityManager em) {
        TipoActividad tipoActividad = new TipoActividad()
            .descripcion(UPDATED_DESCRIPCION);
        return tipoActividad;
    }

    @BeforeEach
    public void initTest() {
        tipoActividad = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoActividad() throws Exception {
        int databaseSizeBeforeCreate = tipoActividadRepository.findAll().size();

        // Create the TipoActividad
        restTipoActividadMockMvc.perform(post("/api/tipo-actividads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoActividad)))
            .andExpect(status().isCreated());

        // Validate the TipoActividad in the database
        List<TipoActividad> tipoActividadList = tipoActividadRepository.findAll();
        assertThat(tipoActividadList).hasSize(databaseSizeBeforeCreate + 1);
        TipoActividad testTipoActividad = tipoActividadList.get(tipoActividadList.size() - 1);
        assertThat(testTipoActividad.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createTipoActividadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoActividadRepository.findAll().size();

        // Create the TipoActividad with an existing ID
        tipoActividad.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoActividadMockMvc.perform(post("/api/tipo-actividads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoActividad)))
            .andExpect(status().isBadRequest());

        // Validate the TipoActividad in the database
        List<TipoActividad> tipoActividadList = tipoActividadRepository.findAll();
        assertThat(tipoActividadList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoActividads() throws Exception {
        // Initialize the database
        tipoActividadRepository.saveAndFlush(tipoActividad);

        // Get all the tipoActividadList
        restTipoActividadMockMvc.perform(get("/api/tipo-actividads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoActividad.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getTipoActividad() throws Exception {
        // Initialize the database
        tipoActividadRepository.saveAndFlush(tipoActividad);

        // Get the tipoActividad
        restTipoActividadMockMvc.perform(get("/api/tipo-actividads/{id}", tipoActividad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoActividad.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }

    @Test
    @Transactional
    public void getNonExistingTipoActividad() throws Exception {
        // Get the tipoActividad
        restTipoActividadMockMvc.perform(get("/api/tipo-actividads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoActividad() throws Exception {
        // Initialize the database
        tipoActividadService.save(tipoActividad);

        int databaseSizeBeforeUpdate = tipoActividadRepository.findAll().size();

        // Update the tipoActividad
        TipoActividad updatedTipoActividad = tipoActividadRepository.findById(tipoActividad.getId()).get();
        // Disconnect from session so that the updates on updatedTipoActividad are not directly saved in db
        em.detach(updatedTipoActividad);
        updatedTipoActividad
            .descripcion(UPDATED_DESCRIPCION);

        restTipoActividadMockMvc.perform(put("/api/tipo-actividads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoActividad)))
            .andExpect(status().isOk());

        // Validate the TipoActividad in the database
        List<TipoActividad> tipoActividadList = tipoActividadRepository.findAll();
        assertThat(tipoActividadList).hasSize(databaseSizeBeforeUpdate);
        TipoActividad testTipoActividad = tipoActividadList.get(tipoActividadList.size() - 1);
        assertThat(testTipoActividad.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoActividad() throws Exception {
        int databaseSizeBeforeUpdate = tipoActividadRepository.findAll().size();

        // Create the TipoActividad

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoActividadMockMvc.perform(put("/api/tipo-actividads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoActividad)))
            .andExpect(status().isBadRequest());

        // Validate the TipoActividad in the database
        List<TipoActividad> tipoActividadList = tipoActividadRepository.findAll();
        assertThat(tipoActividadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoActividad() throws Exception {
        // Initialize the database
        tipoActividadService.save(tipoActividad);

        int databaseSizeBeforeDelete = tipoActividadRepository.findAll().size();

        // Delete the tipoActividad
        restTipoActividadMockMvc.perform(delete("/api/tipo-actividads/{id}", tipoActividad.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoActividad> tipoActividadList = tipoActividadRepository.findAll();
        assertThat(tipoActividadList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoActividad.class);
        TipoActividad tipoActividad1 = new TipoActividad();
        tipoActividad1.setId(1L);
        TipoActividad tipoActividad2 = new TipoActividad();
        tipoActividad2.setId(tipoActividad1.getId());
        assertThat(tipoActividad1).isEqualTo(tipoActividad2);
        tipoActividad2.setId(2L);
        assertThat(tipoActividad1).isNotEqualTo(tipoActividad2);
        tipoActividad1.setId(null);
        assertThat(tipoActividad1).isNotEqualTo(tipoActividad2);
    }
}
