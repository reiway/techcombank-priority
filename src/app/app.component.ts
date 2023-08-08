import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import SwiperCore, { Keyboard, Pagination, Navigation, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual]);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;
  loading = false;
  data = [
    {
      code: '1',
      name: 'Lương Thanh Khuê',
      email: 'test@gmail.com',
      color: '#87603a',
      type: 'Bình Minh',
      number: '1-2/24',
      numberslide: 2
    }, {
      code: '2',
      name: 'Nguyễn Văn B',
      email: 'test@gmail.com',
      color: '#696969',
      type: ' Rạng Đông',
      number: '3-4/24',
      numberslide: 2
    }, {
      code: '3',
      name: 'Nguyễn Văn C',
      email: 'test@gmail.com',
      color: '#ff0006',
      type: 'Rực Màu',
      number: '5-6/24',
      numberslide: 2
    }, {
      code: '4',
      name: 'Nhật Anh',
      email: 'test@gmail.com',
      color: '#ff0006',
      type: 'Rực Màu',
      number: '6-7/24',
      numberslide: 1
    },
  ];
  isHaveTicket = false;
  form: FormGroup;
  user: any = this.data[0];
  slide = 1;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', Validators.required],
      email: ['']
    });
  }

  getData() {
    return this.http.get('https://api.dev.qrclc.com/api/ticket/public/guests', {
      params: {
        event_id: 'evt_cj5s7k223aks73f6j8gg',
        param_value: this.form.getRawValue().code,
        name: this.form.getRawValue().name,
        param_name: 'Mã định danh',
        email: this.form.getRawValue().email
      }
    });
  }

  download(user: any) {
    this.loading = true;
    this.http.get('https://api.dev.qrclc.com/api/ticket/public/get', {
      params: {
        guest_code: user.code,
        format: 'jpeg',
      },
      responseType: 'blob'
    }).subscribe((res) => {
      const blod = new Blob([res])
      const href = URL.createObjectURL(blod);

      const anchorElement = document.createElement('a');
      anchorElement.href = href;
      anchorElement.download = `${user.name}.jpg`;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
      this.loading = false;
      this.toastr.success('Đã lưu vé thành công');
    })
  }

  downloadClick() {
    this.user.forEach((user: any) => {
      this.download(user);
    });
  }

  submit() {
    if (this.form.valid) {
      // const find = this.data.find((ele) => ele.name == this.form.getRawValue().name && ele.code == this.form.getRawValue().code);
      // if (find) {
      //   this.user = find;
      //   this.isHaveTicket = true;
      // } else {
      //   
      // }
      this.loading = true;
      this.getData().subscribe((res: any) => {
        if (res?.data) {
          this.user = res.data.map((ele: any) => {
            return {
              ...ele,
              rank_data: res.ranks.find((rank: any) => rank.id === ele.rank_id)
            }
          });
          this.isHaveTicket = true;
          this.loading = false;
        } else {
          this.toastr.error('Thông tin chưa chính xác. Quý khách vui lòng kiểm tra lại.');
        }
      }, () => {
        this.toastr.error('Thông tin chưa chính xác. Quý khách vui lòng kiểm tra lại.');
        this.loading = false;
      })
    }
  }

  slideNext() {
    this.swiper.swiperRef.slideNext(100);
    this.slide = 2;
  }
  slidePrev() {
    this.swiper.swiperRef.slidePrev(100);
    this.slide = 1;
  }

  onSlideChange(event: any) {
    this.slide = this.slide === 1 ? 2 : 1;
    this.cd.detectChanges()
  }

}
