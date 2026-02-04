package edu.lms.repository;

import edu.lms.dto.CategoryResponse;
import edu.lms.entity.Category;
import edu.lms.service.CategoryService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("categoryRepository")
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query("SELECT new edu.lms.dto.CategoryResponse(c.id, c.categoryName, c.description, c.isActive, c.updateTime, p.categoryName) FROM Category c JOIN c.parent p")
    List<CategoryResponse> findAllCategories();

}
