package edu.lms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "learning_progress")
@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LearningProgress extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "progress_id")
  private Long learningProgressId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "enrollment_id")
  private Enrollment enrollment;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "lesson_id")
  private Lesson lesson;

  private String status;
  private Integer percent;

  @Column(name = "time_spent_seconds")
  private Integer timeSpentSeconds;

  @Column(name = "last_accessed_at")
  private LocalDateTime lastAccessedAt;
}
