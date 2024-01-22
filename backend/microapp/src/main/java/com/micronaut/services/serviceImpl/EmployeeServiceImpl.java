package com.micronaut.services.serviceImpl;

import com.micronaut.dto.EmployeeDTO;
import com.micronaut.entity.Employee;
import com.micronaut.exception.ResourceNotFoundException;
import com.micronaut.mapper.EmployeeMapper;
import com.micronaut.repository.EmployeeRepository;
import com.micronaut.services.EmployeeService;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Singleton
public class EmployeeServiceImpl implements EmployeeService {

    @Inject
    EmployeeRepository employeeRepository;

    @Override
    public Iterable<EmployeeDTO> getAllEmployees() {
        return StreamSupport.stream(employeeRepository.findAll().spliterator(), false)
                .map(EmployeeMapper::toEmployeeDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO getEmployeeById(String employeeId) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId);
        if (employee == null) {
            throw new ResourceNotFoundException("Employee with ID " + employeeId + " not found");
        }
        return EmployeeMapper.toEmployeeDTO(employee);
    }

    @Override
    public EmployeeDTO saveOrUpdateEmployee(EmployeeDTO employeeDTO) {
        Employee employee = EmployeeMapper.toEmployee(employeeDTO);
        Employee employeeSaved = null;

        if (employee.getId() != null && employeeRepository.existsById(employee.getId())) {
            employeeSaved = employeeRepository.update(employee);
        } else {
            employeeSaved = employeeRepository.save(employee);
        }

        return EmployeeMapper.toEmployeeDTO(employeeSaved);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        employeeRepository.deleteById(employeeId);
    }
}
