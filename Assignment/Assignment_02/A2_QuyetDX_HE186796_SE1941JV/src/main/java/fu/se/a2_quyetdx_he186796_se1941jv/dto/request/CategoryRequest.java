package fu.se.a2_quyetdx_he186796_se1941jv.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryRequest {
    String categoryName;
    String categoryDesciption;
    Integer parentCategoryId;
    Boolean isActive;
}
