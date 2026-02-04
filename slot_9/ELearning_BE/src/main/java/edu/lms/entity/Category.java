package edu.lms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "Category",
        uniqueConstraints = {@UniqueConstraint(name = "UQ_C_NAME", columnNames = {"category_name"})})
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "parent_id", referencedColumnName = "id")
    private Category parent;

    @Column(name = "category_name", columnDefinition = "NVARCHAR(250)")
    private String categoryName;

    @Column(columnDefinition = "NVARCHAR(250)")
    private String description;

    @Column(name = "sort_order")
    private int sortOrder;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "update_time")
    private LocalDateTime updateTime;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<CourseCategory> courseCategories;
}
