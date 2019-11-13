package com.mimbus.repository;
import com.mimbus.domain.Curso;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Curso entity.
 */
@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {

    @Query(value = "select distinct curso from Curso curso left join fetch curso.paquetes",
        countQuery = "select count(distinct curso) from Curso curso")
    Page<Curso> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct curso from Curso curso left join fetch curso.paquetes")
    List<Curso> findAllWithEagerRelationships();

    @Query("select curso from Curso curso left join fetch curso.paquetes where curso.id =:id")
    Optional<Curso> findOneWithEagerRelationships(@Param("id") Long id);

}
