package com.mimbus.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Calificacion.
 */
@Entity
@Table(name = "calificacion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Calificacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "score")
    private String score;

    @Column(name = "monedas")
    private Integer monedas;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "intentos")
    private Integer intentos;

    @ManyToOne
    @JsonIgnoreProperties("calificacions")
    private Componente componente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getScore() {
        return score;
    }

    public Calificacion score(String score) {
        this.score = score;
        return this;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public Integer getMonedas() {
        return monedas;
    }

    public Calificacion monedas(Integer monedas) {
        this.monedas = monedas;
        return this;
    }

    public void setMonedas(Integer monedas) {
        this.monedas = monedas;
    }

    public Instant getFecha() {
        return fecha;
    }

    public Calificacion fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Integer getIntentos() {
        return intentos;
    }

    public Calificacion intentos(Integer intentos) {
        this.intentos = intentos;
        return this;
    }

    public void setIntentos(Integer intentos) {
        this.intentos = intentos;
    }

    public Componente getComponente() {
        return componente;
    }

    public Calificacion componente(Componente componente) {
        this.componente = componente;
        return this;
    }

    public void setComponente(Componente componente) {
        this.componente = componente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Calificacion)) {
            return false;
        }
        return id != null && id.equals(((Calificacion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Calificacion{" +
            "id=" + getId() +
            ", score='" + getScore() + "'" +
            ", monedas=" + getMonedas() +
            ", fecha='" + getFecha() + "'" +
            ", intentos=" + getIntentos() +
            "}";
    }
}
