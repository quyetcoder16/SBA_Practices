package edu.lms.controller;

import edu.lms.constants.ApiPaths;
import edu.lms.dto.CategoryRequest;

import edu.lms.dto.CategoryResponse;
import edu.lms.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.CATEGORIES)
@RequiredArgsConstructor
public class CategoryController {
  private final CategoryService categoryService;

  @PostMapping
  public ResponseEntity<?> createCategory(@RequestBody @Valid CategoryRequest categoryRequest) {
    categoryService.createCategory(categoryRequest);
    return ResponseEntity.ok().build();
  }

  @GetMapping
  public ResponseEntity<List<CategoryResponse>> getCategories() {
    return ResponseEntity.ok().body(categoryService.getAllCategories());
  }

  @GetMapping("/{id}")
  public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Integer id) {
    return ResponseEntity.ok().body(categoryService.findCategoryById(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<CategoryResponse> updateCategory(
      @PathVariable Integer id, @RequestBody @Valid CategoryRequest categoryRequest) {

    return ResponseEntity.ok().body(categoryService.updateCategory(id, categoryRequest));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteCategory(@PathVariable Integer id) {
    categoryService.deleteCategory(id);
    return ResponseEntity.ok().build();
  }
}
