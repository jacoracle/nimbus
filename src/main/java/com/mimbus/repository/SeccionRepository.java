package com.mimbus.repository;
import com.mimbus.domain.Seccion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Seccion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SeccionRepository extends JpaRepository<Seccion, Long> {

}
