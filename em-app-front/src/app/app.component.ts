import {Component, OnInit} from '@angular/core';
import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = "em-app-front";
  public employees: Employee[] | undefined;
  public editEmployee: Employee | undefined | null
  public deleteEmployee: Employee | undefined | null
  public oldKey: string = '.';

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    // this.employeeService.getEmployees().subscribe(
    //   (response: Employee[]) => {
    //     this.employees = response;
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // );

    this.employeeService.getEmployees().subscribe({
        next: response => this.employees = response,
        error: err => alert(err.message)
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe({
        next: response => {
          console.log(response);
          this.getEmployees();
          addForm.reset();
        },
        error: err => {
          alert(err.message);
          addForm.reset();
        }
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe({
        next: response => {
          console.log(response);
          this.getEmployees();
        },
        error: err => alert(err.message)
      }
    );
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe({
        next: response => {
          console.log(response);
          this.getEmployees();
        },
        error: err => alert(err.message)
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];

    // @ts-ignore
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }

    this.employees = results;

    if (results.length === 0 || !key) {
      this.getEmployees();
    }

  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
}
