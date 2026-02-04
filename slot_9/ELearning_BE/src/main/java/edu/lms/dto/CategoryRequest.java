package edu.lms.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {

    private Integer parentId;

    @NotBlank
    private String categoryName;

    private String description;

    @Builder.Default
    private boolean isActive= true;

    private int sortOrder;
}
