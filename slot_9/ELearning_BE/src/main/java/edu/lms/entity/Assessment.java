package edu.lms.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "assessments")
@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Assessment extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assessment_id")
    private Long assessmentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    private String title;

    @Column(name = "assessment_type")
    private String assessmentType;

    @Column(name = "time_limit_seconds")
    private Integer timeLimitSeconds;

    @Column(name = "attempts_allowed")
    private Integer attemptsAllowed;

    @Column(name = "passing_score")
    private Integer passingScore;

    @Column(name = "shuffle_questions")
    private Boolean shuffleQuestions;

    private String status;
}
