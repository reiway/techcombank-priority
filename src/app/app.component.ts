import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      number: '1/24'
    }, {
      code: '2',
      name: 'Nguyễn Văn B',
      email: 'test@gmail.com',
      color: '#696969',
      type: 'Hừng Đông',
      number: '2/24'
    }, {
      code: '3',
      name: 'Nguyễn Văn C',
      email: 'test@gmail.com',
      color: '#ff0006',
      type: 'Rực Màu',
      number: '3/24'
    },
  ];
  isHaveTicket = false;
  form: FormGroup;
  user: any = this.data[0];

  constructor(
    private formBuilder: FormBuilder,
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
      console.log(find);

      if (find) {
        this.user = find;
        this.isHaveTicket = true;
      }
    }
  }

}
