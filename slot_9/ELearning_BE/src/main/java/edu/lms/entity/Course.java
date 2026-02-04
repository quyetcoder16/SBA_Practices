package edu.lms.entity;

import edu.lms.enums.CourseLevel;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "Course")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Course {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "course_id")
  private Integer courseId;

  @Column(columnDefinition = "NVARCHAR(255)")
  private String title;

  @Column(name = "short_description", columnDefinition = "TEXT")
  private String shortDescription;

  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(name = "course_level")
  @Enumerated(EnumType.STRING)
  private CourseLevel courseLevel;

  @Column(columnDefinition = "NVARCHAR(255)")
  private String language;

  @Column(name = "thumbnail_url", columnDefinition = "VARCHAR(1024)")
  private String thumbnailUrl;

  private String status;

  @Column(name = "publish_at")
  private LocalDateTime publishAt;

  @Column(name = "create_at")
  private LocalDateTime createdAt;

  @Column(name = "update_at")
  private LocalDateTime updatedAt;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "course")
  private Set<CourseCategory> courseCategories;

  @OneToMany(mappedBy = "course")
  private Set<Module> modules;
}
