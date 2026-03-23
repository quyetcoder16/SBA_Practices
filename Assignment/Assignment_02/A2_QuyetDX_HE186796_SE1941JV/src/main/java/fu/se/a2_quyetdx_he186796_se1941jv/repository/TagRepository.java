package fu.se.a2_quyetdx_he186796_se1941jv.repository;

import fu.se.a2_quyetdx_he186796_se1941jv.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
}
