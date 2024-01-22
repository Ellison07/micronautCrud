package com.micronaut.controller;

import io.micronaut.http.HttpResponse;
import com.micronaut.dto.EmployeeDTO;
import com.micronaut.services.EmployeeService;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;

import io.micronaut.http.server.cors.CrossOrigin;
import jakarta.inject.Inject;
@CrossOrigin("http://localhost:5173")

@Controller("/employee")
public class EmployeeController {

    @Inject
    EmployeeService employeeService;

    @Get("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Iterable<EmployeeDTO> getAll() {
        return employeeService.getAllEmployees();
    }

    @Get("/find/{employeeId}")
    @Produces(MediaType.APPLICATION_JSON)
    public EmployeeDTO getEmployeeById(String employeeId) {
        return employeeService.getEmployeeById(employeeId);
    }

    @Post("/saveEmployee")
    @Produces(MediaType.APPLICATION_JSON)
    public EmployeeDTO saveOrUpdate(@Body EmployeeDTO employeeDTO) {
        return employeeService.saveOrUpdateEmployee(employeeDTO);
    }

    @Delete("/delete/{employeeId}")
    public HttpResponse delete(Long employeeId) {
        employeeService.deleteEmployee(employeeId);
        return HttpResponse.ok();
    }
}
