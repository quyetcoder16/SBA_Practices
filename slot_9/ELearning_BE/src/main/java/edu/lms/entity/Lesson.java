package edu.lms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "lessons")
@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Lesson extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "lesson_id")
  private Long lessonId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "module_id")
  private Module module;

  @Column(columnDefinition = "NVARCHAR(255)")
  private String title;

  @Column(name = "content_type")
  private String contentType;

  @Column(name = "content_url", columnDefinition = "VARCHAR(1024)")
  private String contentUrl;

  @Column(name = "content_ref")
  private String contentRef;

  @Column(name = "duration_seconds")
  private Integer durationSeconds;

  @Column(name = "is_preview")
  private Boolean isPreview;

  @Column(name = "sort_order")
  private Integer sortOrder;

  private String status;
}
