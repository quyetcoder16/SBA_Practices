package fu.se.a2_quyetdx_he186796_se1941jv.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "Category")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CategoryID")
    private Integer categoryId;

    @Column(name = "CategoryName", nullable = false, length = 100)
    private String categoryName;

    @Column(name = "CategoryDesciption", length = 250)
    private String categoryDescription;

    @Column(name = "ParentCategoryID")
    private Integer parentCategoryId;

    @Column(name = "IsActive")
    private Boolean isActive;

    public Boolean getIsActive() {
        return isActive;
    }

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<NewsArticle> newsArticles;
}
