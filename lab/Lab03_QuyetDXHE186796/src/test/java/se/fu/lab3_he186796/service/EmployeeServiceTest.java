package se.fu.lab3_he186796.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import se.fu.lab3_he186796.dto.EmployeeDto;
import se.fu.lab3_he186796.exception.ResourceNotFoundException;
import se.fu.lab3_he186796.mapper.EmployeeMapper;
import se.fu.lab3_he186796.pojos.Employee;
import se.fu.lab3_he186796.repository.EmployeeRepository;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private EmployeeMapper employeeMapper;

    @InjectMocks
    private EmployeeService employeeService;

    private Employee employee;
    private EmployeeDto employeeDto;

    @BeforeEach
    public void setup() {
        employee = Employee.builder()
                .empId("1")
                .name("Quyet")
                .designation("Developer")
                .salary(1000.0)
                .build();

        employeeDto = new EmployeeDto();
        employeeDto.setEmpId("1");
        employeeDto.setName("Quyet");
        employeeDto.setDesignation("Developer");
        employeeDto.setSalary(1000.0);
    }

    @Test
    public void testCreateEmployee() {
        when(employeeMapper.mapToEmployee(any(EmployeeDto.class))).thenReturn(employee);
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);
        when(employeeMapper.mapToEmployeeDto(any(Employee.class))).thenReturn(employeeDto);

        EmployeeDto savedData = employeeService.createEmployee(employeeDto);

        assertNotNull(savedData);
        assertEquals("Quyet", savedData.getName());
        verify(employeeRepository, times(1)).save(employee);
    }

    @Test
    public void testGetEmployeeById() {
        when(employeeRepository.findById("1")).thenReturn(Optional.of(employee));
        when(employeeMapper.mapToEmployeeDto(any(Employee.class))).thenReturn(employeeDto);

        EmployeeDto foundData = employeeService.getEmployeeById("1");

        assertNotNull(foundData);
        assertEquals("1", foundData.getEmpId());
    }

    @Test
    public void testGetEmployeeById_NotFound() {
        when(employeeRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            employeeService.getEmployeeById("1");
        });
    }

    @Test
    public void testGetAllEmployees() {
        Page<Employee> page = new PageImpl<>(Collections.singletonList(employee));
        when(employeeRepository.findAll(any(PageRequest.class))).thenReturn(page);
        when(employeeMapper.mapToEmployeeDto(any(Employee.class))).thenReturn(employeeDto);

        Page<EmployeeDto> result = employeeService.getAllEmployees(0, 10);

        assertEquals(1, result.getTotalElements());
        assertEquals("Quyet", result.getContent().getFirst().getName());
    }

    @Test
    public void testUpdateEmployee() {
        when(employeeRepository.findById("1")).thenReturn(Optional.of(employee));
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);
        when(employeeMapper.mapToEmployeeDto(any(Employee.class))).thenReturn(employeeDto);

        EmployeeDto updateData = new EmployeeDto();
        updateData.setName("Updated Quyet");
        updateData.setDesignation("Senior Developer");
        updateData.setSalary(2000.0);

        EmployeeDto updatedResult = employeeService.updateEmployee("1", updateData);

        assertNotNull(updatedResult);
        verify(employeeRepository, times(1)).save(any(Employee.class));
    }

    @Test
    public void testDeleteEmployee() {
        when(employeeRepository.findById("1")).thenReturn(Optional.of(employee));
        doNothing().when(employeeRepository).delete(any(Employee.class));

        employeeService.deleteEmployee("1");

        verify(employeeRepository, times(1)).delete(employee);
    }
}
