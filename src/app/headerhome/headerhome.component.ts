

import { AfterViewInit, Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
@Component({
  selector: 'app-headerhome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './headerhome.component.html',
  styleUrl: './headerhome.component.css'
})
export class HeaderhomeComponent {
  //HỖ TRỢ
  showDropDownMenu1: boolean = false;
  onMouseEnter1(): void {
    this.showDropDownMenu1 = true;
  }
  onMouseLeave1(): void {
    this.showDropDownMenu1 = false;
  }

  // SẢN PHẨM KHÁC
  showDropDownMenu2: boolean = false;
  onMouseEnter2(): void {
    this.showDropDownMenu2 = true;
  }
  onMouseLeave2(): void {
    this.showDropDownMenu2 = false;
  }


}
