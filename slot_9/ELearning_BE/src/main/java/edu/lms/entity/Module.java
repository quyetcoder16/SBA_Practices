package edu.lms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "modules")
@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Module extends BaseEntity {
  @Id
  @Column(name = "module_id")
  private Long moduleId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "course_id")
  private Course course;

  @Column(columnDefinition = "NVARCHAR(255)")
  private String title;

  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(name = "sort_order")
  private Integer sortOrder;

  private String status;
}
