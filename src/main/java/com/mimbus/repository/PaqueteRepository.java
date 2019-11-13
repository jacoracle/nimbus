package com.mimbus.repository;
import com.mimbus.domain.Paquete;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Paquete entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaqueteRepository extends JpaRepository<Paquete, Long> {

}
