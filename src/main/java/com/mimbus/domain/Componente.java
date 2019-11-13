package com.mimbus.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Componente.
 */
@Entity
@Table(name = "componente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Componente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "version")
    private Integer version;

    @ManyToOne
    @JsonIgnoreProperties("componentes")
    private TipoComponente tipocomponente;

    @ManyToOne
    @JsonIgnoreProperties("componentes")
    private Seccion seccion;

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

    public Componente descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getVersion() {
        return version;
    }

    public Componente version(Integer version) {
        this.version = version;
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public TipoComponente getTipocomponente() {
        return tipocomponente;
    }

    public Componente tipocomponente(TipoComponente tipoComponente) {
        this.tipocomponente = tipoComponente;
        return this;
    }

    public void setTipocomponente(TipoComponente tipoComponente) {
        this.tipocomponente = tipoComponente;
    }

    public Seccion getSeccion() {
        return seccion;
    }

    public Componente seccion(Seccion seccion) {
        this.seccion = seccion;
        return this;
    }

    public void setSeccion(Seccion seccion) {
        this.seccion = seccion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Componente)) {
            return false;
        }
        return id != null && id.equals(((Componente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Componente{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", version=" + getVersion() +
            "}";
    }
}
