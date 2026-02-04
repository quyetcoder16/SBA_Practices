package edu.lms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "grades")
@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Grade extends BaseEntity {
  @Id
  @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
  @Column(name = "grade_id")
  private Long gradeId;

  @Column(name = "grade_target_type")
  private String gradeTargetType;

  @Column(name = "grade_target_id")
  private Long gradeTargetId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "grader_id")
  private User grader;

  private Integer score;

  @Column(columnDefinition = "TEXT")
  private String feedback;

  @Column(name = "graded_at")
  private LocalDateTime gradedAt;

  private String status;
}
