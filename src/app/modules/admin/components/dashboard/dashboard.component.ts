import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { TaskResponse } from '../../interfaces/task-response';
import { AdminService } from '../../services/admin.service';
import { NavbarComponent } from "../../../../../shared/components/navbar/navbar.component";
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModule

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, NavbarComponent,NgbModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  taskList: TaskResponse[] = [];
  filteredTaskList: TaskResponse[] = [];
  searchKeyword: string = '';
  taskToDeleteId: number | null = null;
  modalRef: NgbModalRef | null = null; // Reference to the open modal
  totalPages!: number;
  currentPage: number = 0;
  pageSize: number = 6;

  constructor(private adminService: AdminService, private modalService: NgbModal) {
    this.getAllTasks();
  }

  getAllTasks() {
    this.adminService.getAllTasks(this.currentPage, this.pageSize).subscribe((response) => {
      // console.log("getting Response " + response.content);
      this.taskList = response.content;
      this.totalPages = response.totalPages;
      this.filteredTaskList = this.taskList;
    });
  }

  // Method to handle page changes
  onPageChange(page: number): void {
    if (page < 0 || page >= this.totalPages) return; // Prevent invalid page numbers
    this.currentPage = page;
    this.getAllTasks();
  }

  filterTasks() {
    if (this.searchKeyword.trim() === '') {
      this.filteredTaskList = this.taskList;
    } else {
      this.filteredTaskList = this.taskList.filter(task => task.title.toLowerCase().includes(this.searchKeyword.toLowerCase()));
    }
  }

  filterByStatus(status: string) {
    if (status === 'all') {
      this.filteredTaskList = this.taskList;
    } else {
      this.filteredTaskList = this.taskList.filter(task => task.taskStatus.toLowerCase() === status.toLowerCase());
    }
  }

  openDeleteModal(template: TemplateRef<any>, taskId: number) {
    this.taskToDeleteId = taskId;
    this.modalRef = this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm'
    });
  }

  confirmDelete() {
    if (this.taskToDeleteId !== null) {
      this.adminService.deleteTask(this.taskToDeleteId).subscribe(() => {
        this.getAllTasks(); // Refresh the list after deletion
        if (this.modalRef) {
          this.modalRef.close(); // Close the modal
        }
      });
    }
  }

  getPriorityClass(priority: 'High' | 'Medium' | 'Low'): string {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  }

  getStatusClass(taskStatus: 'ASSIGN' | 'PENDING' | 'INPROGRESS' | 'COMPLETED' | 'DEFERRED' | 'CANCELLED'): string {
    switch (taskStatus) {
      case 'ASSIGN': return 'status-assign';
      case 'PENDING': return 'status-pending';
      case 'INPROGRESS': return 'status-in-progress';
      case 'COMPLETED': return 'status-completed';
      case 'DEFERRED': return 'status-deferred';
      case 'CANCELLED': return 'status-cancelled';
      default: return '';
    }
  }
}
