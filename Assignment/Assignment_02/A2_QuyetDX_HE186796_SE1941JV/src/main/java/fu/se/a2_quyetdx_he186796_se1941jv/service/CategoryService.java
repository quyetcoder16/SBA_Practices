package fu.se.a2_quyetdx_he186796_se1941jv.service;

import fu.se.a2_quyetdx_he186796_se1941jv.dto.request.CategoryRequest;
import fu.se.a2_quyetdx_he186796_se1941jv.dto.response.CategoryResponse;
import fu.se.a2_quyetdx_he186796_se1941jv.entity.Category;
import fu.se.a2_quyetdx_he186796_se1941jv.exception.AppException;
import fu.se.a2_quyetdx_he186796_se1941jv.exception.ErrorCode;
import fu.se.a2_quyetdx_he186796_se1941jv.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    private CategoryResponse toResponse(Category category) {
        String parentName = null;
        if (category.getParentCategoryId() != null) {
            parentName = categoryRepository.findById(category.getParentCategoryId())
                    .map(Category::getCategoryName)
                    .orElse(null);
        }
        return CategoryResponse.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .categoryDesciption(category.getCategoryDescription())
                .parentCategoryId(category.getParentCategoryId())
                .parentCategoryName(parentName)
                .isActive(category.getIsActive())
                .build();
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> getAll() {
        return categoryRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CategoryResponse getById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        return toResponse(category);
    }

    @Transactional
    public CategoryResponse create(CategoryRequest request) {
        Category category = Category.builder()
                .categoryName(request.getCategoryName())
                .categoryDescription(request.getCategoryDesciption())
                .parentCategoryId(request.getParentCategoryId())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();
        return toResponse(categoryRepository.save(category));
    }

    @Transactional
    public CategoryResponse update(Integer id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

        category.setCategoryName(request.getCategoryName());
        category.setCategoryDescription(request.getCategoryDesciption());
        category.setParentCategoryId(request.getParentCategoryId());
        if (request.getIsActive() != null) {
            category.setIsActive(request.getIsActive());
        }

        return toResponse(categoryRepository.save(category));
    }

    @Transactional
    public void delete(Integer id) {
        if (!categoryRepository.existsById(id)) {
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        }
        categoryRepository.deleteById(id);
    }
}
