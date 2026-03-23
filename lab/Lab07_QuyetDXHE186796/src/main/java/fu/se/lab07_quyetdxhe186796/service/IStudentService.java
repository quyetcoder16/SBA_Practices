package fu.se.lab07_quyetdxhe186796.service;

import fu.se.lab07_quyetdxhe186796.pojo.Student;

import java.util.List;

public interface IStudentService {
  public List<Student> findAll();

  public void save(Student student);

  public void delete(int studentId);

  public Student findById(int studentId);

  public void update(Student student);

  public Student findByEmail(String email);
}
