package fu.se.a2_quyetdx_he186796_se1941jv.repository;

import fu.se.a2_quyetdx_he186796_se1941jv.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
