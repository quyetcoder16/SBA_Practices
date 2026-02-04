package edu.lms.service;

import edu.lms.dto.CategoryRequest;
import edu.lms.dto.CategoryResponse;
import edu.lms.entity.Category;
import edu.lms.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("categoryService")
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

  private final CategoryRepository categoryRepository;

  @Override
  public CategoryResponse createCategory(CategoryRequest categoryRequest) {

    Optional<Category> optional = categoryRepository.findById(categoryRequest.getParentId());

    Category category =
        Category.builder()
            .categoryName(categoryRequest.getCategoryName())
            .description(categoryRequest.getDescription())
            .isActive(categoryRequest.isActive())
            .sortOrder(categoryRequest.getSortOrder())
            .build();

    if (optional.isPresent()) {
      category.setParent(optional.get());
    }

    Category result = categoryRepository.save(category);

    return CategoryResponse.builder()
        .categoryName(result.getCategoryName())
        .description(result.getDescription())
        .isActive(result.isActive())
        .updateTime(result.getUpdateTime())
        .build();
  }

  @Override
  public List<CategoryResponse> getAllCategories() {
    return categoryRepository.findAllCategories();
  }

  @Override
  public CategoryResponse findCategoryById(Integer id) {
    Category category = categoryRepository.findById(id).orElse(null);
    if (category != null) {
      return CategoryResponse.builder()
          .id(category.getId())
          .categoryName(category.getCategoryName())
          .description(category.getDescription())
          .isActive(category.isActive())
          .updateTime(category.getUpdateTime())
          .build();
    }
    return null;
  }

  @Override
  public void deleteCategory(Integer id) {
    Category category = categoryRepository.findById(id).orElse(null);
    if (category != null && category.getParent() != null) {
      categoryRepository.delete(category);
    }
  }

  @Override
  public CategoryResponse updateCategory(Integer id, CategoryRequest categoryRequest) {
    Category categoryExisting = categoryRepository.findById(id).orElse(null);
    if (categoryExisting != null) {
      categoryExisting.setCategoryName(categoryRequest.getCategoryName());
      categoryExisting.setDescription(categoryRequest.getDescription());
      categoryExisting.setActive(categoryRequest.isActive());
      categoryExisting.setSortOrder(categoryRequest.getSortOrder());
      Category updatedCategory = categoryRepository.save(categoryExisting);
      return CategoryResponse.builder()
          .id(updatedCategory.getId())
          .categoryName(updatedCategory.getCategoryName())
          .description(updatedCategory.getDescription())
          .isActive(updatedCategory.isActive())
          .updateTime(updatedCategory.getUpdateTime())
          .build();
    }

    return null;
  }
}
