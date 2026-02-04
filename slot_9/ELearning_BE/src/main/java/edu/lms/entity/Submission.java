package edu.lms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "submissions")
@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Submission extends BaseEntity {
  @Id
  @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
  @Column(name = "submission_id")
  private Long submissionId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "assignment_id")
  private Assignment assignment;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "enrollment_id")
  private Enrollment enrollment;

  @Column(name = "submitted_at")
  private LocalDateTime submittedAt;

  private String status;

  @Column(name = "content_text", columnDefinition = "TEXT")
  private String contentText;

  @Column(name = "content_url")
  private String contentUrl;
}
