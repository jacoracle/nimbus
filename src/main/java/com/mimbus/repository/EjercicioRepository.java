package com.mimbus.repository;
import com.mimbus.domain.Ejercicio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Ejercicio entity.
 */
@Repository
public interface EjercicioRepository extends JpaRepository<Ejercicio, Long> {

    @Query(value = "select distinct ejercicio from Ejercicio ejercicio left join fetch ejercicio.tipoactividads",
        countQuery = "select count(distinct ejercicio) from Ejercicio ejercicio")
    Page<Ejercicio> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct ejercicio from Ejercicio ejercicio left join fetch ejercicio.tipoactividads")
    List<Ejercicio> findAllWithEagerRelationships();

    @Query("select ejercicio from Ejercicio ejercicio left join fetch ejercicio.tipoactividads where ejercicio.id =:id")
    Optional<Ejercicio> findOneWithEagerRelationships(@Param("id") Long id);

}
