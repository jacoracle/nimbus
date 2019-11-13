package com.mimbus.repository;
import com.mimbus.domain.Componente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Componente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComponenteRepository extends JpaRepository<Componente, Long> {

}
