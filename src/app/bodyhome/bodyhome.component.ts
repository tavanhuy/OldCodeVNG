import { AfterViewInit, Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FooterhomeComponent } from "../footerhome/footerhome.component";
import { HeaderhomeComponent } from "../headerhome/headerhome.component";
import { Observable, timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// install Swiper modules
Swiper.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-bodyhome',
  standalone: true,
  imports: [FooterhomeComponent, HeaderhomeComponent, CommonModule],
  templateUrl: './bodyhome.component.html',
  styleUrls: ['./bodyhome.component.css']
})
export class BodyhomeComponent implements OnInit, AfterViewChecked {
  books: any[] = [];
  image: string[] = [];
  swiperImg: string[] = [];
  content: string = "";
  contentResult: string = "";
  sortNews: any[] = [];
  newNews: any;
  newflag: boolean = false;

  imgsload: number = 0;
  i: number = 0;
  flag: boolean = false;

  showDropDownMenu1: boolean = false;

  isVisible: boolean = true;

  showtext(): void {
    this.isVisible = !this.isVisible;
  }

  // onMouseEnter1(): void {
  //   console.log(this.showDropDownMenu1)
  //   this.showDropDownMenu1 = true;
  // }
  // onMouseLeave1(): void {
  //   this.showDropDownMenu1 = false;
  // }

  //HỖ TRỢ
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
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getBook().subscribe(data => {
      for (let tmp of data.data) {
        this.books.push(tmp);
        this.image.push("http://localhost:1337" + tmp.image[0].url);

      }

    });
    this.getSwiperImg().subscribe(data => {
      for (let img of data.data) {
        this.swiperImg.push("http://localhost:1337" + img.swiperIMG[0].url);
      }
      this.flag = true;
    });

    // Tóm tắt nội dụng trong mục tin tức

    this.getInfoNews().subscribe(data => {
      for (let news of data.data) {
        news.imgNews.formats.thumbnail.url = "http://localhost:1337" + news.imgNews.formats.thumbnail.url;
        this.sortNews.push(news);
        this.content = news.Content;
        if (this.sortNews.length == 7) {
          break;
        }
      }

      for (let i = 0; i < this.sortNews.length; i++) {
        for (let j = i + 1; j < this.sortNews.length; j++) {
          if (this.sortNews[i].Posteddate < this.sortNews[j].Posteddate) {
            let tmp = this.sortNews[i];
            this.sortNews[i] = this.sortNews[j];
            this.sortNews[j] = tmp;
          }
        }
      }
      for (let i = 0; i < this.sortNews.length; i++) {
        var tmpStr: any = [];
        var tmpContent: String = "";
        console.log(this.sortNews[i].Title);
        if (i == 0) {
          this.sortNews[i].Content = this.sortNews[i].Content.replace(/\n/g, '<br>');
          this.sortNews[i].Content = this.sortNews[i].Content.split(" ");

          for (let c of this.sortNews[i].Content) {
            if (c == "," || c == ",,") {
              tmpStr.push(" ");
            }
            else {
              tmpStr.push(c);
            }

            if (tmpStr.length == 70) {
              for (let str of tmpStr) {
                tmpContent = tmpContent + str + " ";
              }
              tmpContent = tmpContent + "...";
              this.sortNews[i].Content = tmpContent;
              break;
            }
          }
        }
      }
      this.newNews = this.sortNews[0];
      this.sortNews.shift();
      console.log(this.sortNews.length);

      this.newflag = true;
      for (let news of this.sortNews) {
        console.log(news.Posteddate);
      }

      // for(let a of this.content)
      // {
      //   this.contentResult = this.contentResult + a;
      //   if(this.contentResult.length == 8)
      //   {
      //     this.contentResult = this.contentResult + "...";
      //     break;
      //   }
      // }
      // console.log(this.contentResult);
    });
  }

  ngAfterViewChecked() {
    if (this.flag == true) {
      this.initSwiper();
      this.flag = false;

    }
  }

  initSwiper(): void {
    const swiper = new Swiper('.swiper', {
      loop: true,
      slidesPerView: 1,
      speed: 1000,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
    });
  }

  getBook(): Observable<any> {
    return this.http.get<any>("http://localhost:1337/api/Books?populate=*");
  }

  getSwiperImg(): Observable<any> {
    return this.http.get<any>("http://localhost:1337/api/Swipers?populate=*");
  }

  getInfoNews(): Observable<any> {
    return this.http.get<any>("http://localhost:1337/api/news?populate=*");
  }


}
