package com.mimbus.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Curso.
 */
@Entity
@Table(name = "curso")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Curso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "curso_paquete",
               joinColumns = @JoinColumn(name = "curso_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "paquete_id", referencedColumnName = "id"))
    private Set<Paquete> paquetes = new HashSet<>();

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

    public Curso descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Paquete> getPaquetes() {
        return paquetes;
    }

    public Curso paquetes(Set<Paquete> paquetes) {
        this.paquetes = paquetes;
        return this;
    }

    public Curso addPaquete(Paquete paquete) {
        this.paquetes.add(paquete);
        paquete.getCursos().add(this);
        return this;
    }

    public Curso removePaquete(Paquete paquete) {
        this.paquetes.remove(paquete);
        paquete.getCursos().remove(this);
        return this;
    }

    public void setPaquetes(Set<Paquete> paquetes) {
        this.paquetes = paquetes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Curso)) {
            return false;
        }
        return id != null && id.equals(((Curso) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Curso{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
