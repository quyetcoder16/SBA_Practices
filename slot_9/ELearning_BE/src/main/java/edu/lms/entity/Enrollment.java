package edu.lms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "enrollments")
@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Enrollment extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "enrollment_id")
  private Long enrollmentId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "course_id")
  private Course course;

  @Column(name = "enrolled_at")
  private LocalDateTime enrolledAt;

  private String status;

  @Column(name = "completed_at")
  private LocalDateTime completedAt;

  @Column(name = "completion_rule_snapshot", columnDefinition = "TEXT")
  private String completionRuleSnapshot;
}
