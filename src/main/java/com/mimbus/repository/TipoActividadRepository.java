package com.mimbus.repository;
import com.mimbus.domain.TipoActividad;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoActividad entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoActividadRepository extends JpaRepository<TipoActividad, Long> {

}
