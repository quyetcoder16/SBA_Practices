package edu.lms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "assignments")
@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Assignment extends BaseEntity {
  @Id
  @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
  @Column(name = "assignment_id")
  private Long assignmentId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "course_id")
  private Course course;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "lesson_id")
  private Lesson lesson;

  private String title;

  @Column(columnDefinition = "TEXT")
  private String instructions;

  @Column(name = "submission_type")
  private String submissionType;

  @Column(name = "due_at")
  private LocalDateTime dueAt;

  @Column(name = "max_score")
  private Integer maxScore;

  @Column(name = "rubric_ref")
  private String rubricRef;

  private String status;
}
