package fu.se.lab07_quyetdxhe186796.dao;

import fu.se.lab07_quyetdxhe186796.pojo.Student;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import java.util.List;

public class StudentDAO {

  private SessionFactory sessionFactory = null;

  private Configuration cf = null;

  public StudentDAO() {
    cf = new Configuration();
    cf.configure("hibernate.cfg.xml");
    sessionFactory = cf.buildSessionFactory();
  }

  public void save(Student student) {
    try (Session session = sessionFactory.openSession()) {
      Transaction transaction = session.beginTransaction();
      try {
        session.persist(student);
        transaction.commit();
        System.out.println("Successfully saved");
      } catch (Exception e) {
        if (transaction != null) transaction.rollback();
        System.out.println("Error: " + e.getMessage());
      }
    }
  }

  public List<Student> getStudents() {
    try (Session session = sessionFactory.openSession()) {
      return session.createQuery("from Student", Student.class).list();
    } catch (Exception e) {
      System.out.println("Error: " + e.getMessage());
      return null;
    }
  }

  public void delete(int studentId) {
    try (Session session = sessionFactory.openSession()) {
      Transaction transaction = session.beginTransaction();
      try {
        Student student = session.get(Student.class, studentId);
        if (student != null) {
          session.remove(student);
          transaction.commit();
          System.out.println("Successfully deleted");
        } else {
          System.out.println("Student not found");
        }
      } catch (Exception e) {
        if (transaction != null) transaction.rollback();
        System.out.println("Error: " + e.getMessage());
        throw e;
      }
    }
  }

  public Student findById(int studentId) {
    try (Session session = sessionFactory.openSession()) {
      return session.get(Student.class, studentId);
    } catch (Exception e) {
      System.out.println("Error: " + e.getMessage());
      throw e;
    }
  }

  public Student findByEmail(String email) {
    try (Session session = sessionFactory.openSession()) {
      return session.createQuery("FROM Student WHERE email = :email", Student.class)
          .setParameter("email", email)
          .uniqueResult();
    } catch (Exception e) {
      System.out.println("Error: " + e.getMessage());
      throw e;
    }
  }

  public void update(Student student) {
    try (Session session = sessionFactory.openSession()) {
      Transaction transaction = session.beginTransaction();
      try {
        session.merge(student);
        transaction.commit();
        System.out.println("Successfully updated");
      } catch (Exception e) {
        if (transaction != null) transaction.rollback();
        System.out.println("Error: " + e.getMessage());
        throw e;
      }
    }
  }
}
