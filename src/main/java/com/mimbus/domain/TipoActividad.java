package com.mimbus.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A TipoActividad.
 */
@Entity
@Table(name = "tipo_actividad")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoActividad implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToMany(mappedBy = "tipoactividads")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Ejercicio> ejercicios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public TipoActividad descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Ejercicio> getEjercicios() {
        return ejercicios;
    }

    public TipoActividad ejercicios(Set<Ejercicio> ejercicios) {
        this.ejercicios = ejercicios;
        return this;
    }

    public TipoActividad addEjercicio(Ejercicio ejercicio) {
        this.ejercicios.add(ejercicio);
        ejercicio.getTipoactividads().add(this);
        return this;
    }

    public TipoActividad removeEjercicio(Ejercicio ejercicio) {
        this.ejercicios.remove(ejercicio);
        ejercicio.getTipoactividads().remove(this);
        return this;
    }

    public void setEjercicios(Set<Ejercicio> ejercicios) {
        this.ejercicios = ejercicios;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoActividad)) {
            return false;
        }
        return id != null && id.equals(((TipoActividad) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TipoActividad{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
