package se.fu.lab3_he186796.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import se.fu.lab3_he186796.dto.EmployeeDto;
import se.fu.lab3_he186796.service.EmployeeService;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EmployeeController.class)
public class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EmployeeService employeeService;

    @Autowired
    private ObjectMapper objectMapper;

    private EmployeeDto employeeDto;

    @BeforeEach
    public void setup() {
        employeeDto = new EmployeeDto();
        employeeDto.setEmpId("1");
        employeeDto.setName("Quyet");
        employeeDto.setDesignation("Developer");
        employeeDto.setSalary(1000.0);
    }

    @Test
    public void testCreateEmployee() throws Exception {
        when(employeeService.createEmployee(any(EmployeeDto.class))).thenReturn(employeeDto);

        mockMvc.perform(post("/api/employees")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.empId").value("1"))
                .andExpect(jsonPath("$.name").value("Quyet"));
    }

    @Test
    public void testGetEmployeeById() throws Exception {
        when(employeeService.getEmployeeById("1")).thenReturn(employeeDto);

        mockMvc.perform(get("/api/employees/{id}", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Quyet"));
    }

    @Test
    public void testGetAllEmployees() throws Exception {
        Page<EmployeeDto> page = new PageImpl<>(Collections.singletonList(employeeDto));
        when(employeeService.getAllEmployees(0, 10)).thenReturn(page);

        mockMvc.perform(get("/api/employees")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("Quyet"))
                .andExpect(jsonPath("$.totalElements").value(1));
    }

    @Test
    public void testUpdateEmployee() throws Exception {
        when(employeeService.updateEmployee(eq("1"), any(EmployeeDto.class))).thenReturn(employeeDto);

        mockMvc.perform(put("/api/employees/{id}", "1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Quyet"));
    }

    @Test
    public void testDeleteEmployee() throws Exception {
        mockMvc.perform(delete("/api/employees/{id}", "1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Employee deleted successfully."));
    }
}
