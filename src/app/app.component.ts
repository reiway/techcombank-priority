import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data = [
    {
      code: '1',
      name: 'Nguyễn Văn A',
      email: 'test@gmail.com',
      color: '#87603a',
      type: 'Bình Minh',
      number: '1-2/24'
    }, {
      code: '2',
      name: 'Nguyễn Văn B',
      email: 'test@gmail.com',
      color: '#696969',
      type: ' RẠNG ĐÔNG',
      number: '3-4/24'
    }, {
      code: '3',
      name: 'Nguyễn Văn C',
      email: 'test@gmail.com',
      color: '#ff0006',
      type: 'Rực Màu',
      number: '5-6/24'
    },
  ];
  isHaveTicket = false;
  form: FormGroup;
  user: any = this.data[0];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', Validators.required],
      email: ['']
    });
  }

  submit() {
    if (this.form.valid) {
      const find = this.data.find((ele) => ele.name == this.form.getRawValue().name && ele.code == this.form.getRawValue().code);
      if (find) {
        this.user = find;
        this.isHaveTicket = true;
      } else {
        this.toastr.error('Thông tin chưa chính xác. Quý khách vui lòng kiểm tra lại.');
      }
    }
  }

}
