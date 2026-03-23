package fu.se.lab07_quyetdxhe186796.repository;

import fu.se.lab07_quyetdxhe186796.dao.StudentDAO;
import fu.se.lab07_quyetdxhe186796.pojo.Student;

import java.util.List;

public class StudentRepository implements IStudentRepository {

  private StudentDAO studentDAO = null;

  public StudentRepository() {
    studentDAO = new StudentDAO();
  }

  @Override
  public List<Student> findAll() {
    return studentDAO.getStudents();
  }

  @Override
  public void save(Student student) {
    studentDAO.save(student);
  }

  @Override
  public void delete(int studentId) {
    studentDAO.delete(studentId);
  }

  @Override
  public Student findById(int studentId) {
    return studentDAO.findById(studentId);
  }

  @Override
  public void update(Student student) {
    studentDAO.update(student);
  }

  @Override
  public Student findByEmail(String email) {
    return studentDAO.findByEmail(email);
  }
}
