package com.mimbus.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Ejercicio.
 */
@Entity
@Table(name = "ejercicio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ejercicio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "contenido")
    private String contenido;

    @ManyToOne
    @JsonIgnoreProperties("ejercicios")
    private Componente componente;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "ejercicio_tipoactividad",
               joinColumns = @JoinColumn(name = "ejercicio_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tipoactividad_id", referencedColumnName = "id"))
    private Set<TipoActividad> tipoactividads = new HashSet<>();

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

    public Ejercicio descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getContenido() {
        return contenido;
    }

    public Ejercicio contenido(String contenido) {
        this.contenido = contenido;
        return this;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public Componente getComponente() {
        return componente;
    }

    public Ejercicio componente(Componente componente) {
        this.componente = componente;
        return this;
    }

    public void setComponente(Componente componente) {
        this.componente = componente;
    }

    public Set<TipoActividad> getTipoactividads() {
        return tipoactividads;
    }

    public Ejercicio tipoactividads(Set<TipoActividad> tipoActividads) {
        this.tipoactividads = tipoActividads;
        return this;
    }

    public Ejercicio addTipoactividad(TipoActividad tipoActividad) {
        this.tipoactividads.add(tipoActividad);
        tipoActividad.getEjercicios().add(this);
        return this;
    }

    public Ejercicio removeTipoactividad(TipoActividad tipoActividad) {
        this.tipoactividads.remove(tipoActividad);
        tipoActividad.getEjercicios().remove(this);
        return this;
    }

    public void setTipoactividads(Set<TipoActividad> tipoActividads) {
        this.tipoactividads = tipoActividads;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ejercicio)) {
            return false;
        }
        return id != null && id.equals(((Ejercicio) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Ejercicio{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", contenido='" + getContenido() + "'" +
            "}";
    }
}
