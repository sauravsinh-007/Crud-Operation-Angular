import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  crudForm!: FormGroup
  submitData: any[] = []
  @Input() isCrudForm: boolean = true;
  @Input() editFormData: any;
  days = Array.from({ length: 31 }, (_, i) => i + 1);
  formDataExist: any

  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];
  years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  constructor(private _formBuilder: FormBuilder, private _dataService: DataService) {

    this.crudForm = this._formBuilder.group({
      fullName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      countryCode: ['+91', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      status: ['', Validators.required],
      educationQualification: ['', Validators.required],
      streamOfEducation: ['', Validators.required],
      tenthPercentage: ['', Validators.required],
      twelfthPercentage: ['', Validators.required],
      highestGraduationPercentage: [''],
    });
  }

  ngOnInit() {
    this.getUsers()
  }

  onSubmit(): void {
    if (this.crudForm.valid) {
      console.log('Form Data:', this.crudForm.value);
      if (this.formDataExist && this.formDataExist._id) {
        this._dataService.updateUser(this.formDataExist._id, this.crudForm.value).subscribe({
          next: (res) => {
            this.getUsers();
            this.crudForm.reset();
            this.isCrudForm = false;
            this.formDataExist = null
          },
          error(err) {
            console.log('err', err)

          },
        })
      } else {
        this._dataService.createUser(this.crudForm.value).subscribe({
          next: (response) => {
            console.log('User created:', response);
            // this.submitData.push(this.crudForm.value);
            this.getUsers()
            this.crudForm.reset();
            this.isCrudForm = false;
            this.formDataExist = null
          },
          error: (error) => {
            console.error('Error creating user:', error);
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }
  getUsers(): void {
    this._dataService.getUsers().subscribe({
      next: (data) => {
        console.log('User data retrieved:', data);
        this.submitData = data;
      },
      error: (error) => {
        console.error('Error retrieving user data:', error);
      }
    });
  }

  isFromTrue(event: boolean) {
    console.log(event, "bool");
    this.isCrudForm = event;

  }
  editFromData(evnt: any) {
    console.log('evnt', evnt)
    if (evnt) {
      this.formDataExist = evnt
      this.crudForm.patchValue(evnt)

    }

  }
}
