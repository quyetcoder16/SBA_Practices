package se.fu.lab3_he186796.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import se.fu.lab3_he186796.dto.EmployeeDto;
import se.fu.lab3_he186796.exception.ResourceNotFoundException;
import se.fu.lab3_he186796.mapper.EmployeeMapper;
import se.fu.lab3_he186796.pojos.Employee;
import se.fu.lab3_he186796.repository.EmployeeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = employeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return employeeMapper.mapToEmployeeDto(savedEmployee);
    }

    public EmployeeDto getEmployeeById(String empId) {
        Employee employee = employeeRepository.findById(empId).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + empId));
        return employeeMapper.mapToEmployeeDto(employee);
    }

    public Page<EmployeeDto> getAllEmployees(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return employeeRepository.findAll(pageable).map(employeeMapper::mapToEmployeeDto);
    }

    public EmployeeDto updateEmployee(String empId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(empId).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + empId));

        employee.setName(updatedEmployee.getName());
        employee.setDesignation(updatedEmployee.getDesignation());
        employee.setSalary(updatedEmployee.getSalary());

        Employee savedEmployee = employeeRepository.save(employee);
        return employeeMapper.mapToEmployeeDto(savedEmployee);
    }

    public void deleteEmployee(String empId) {
        Employee employee = employeeRepository.findById(empId).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + empId));
        employeeRepository.delete(employee);
    }
}
