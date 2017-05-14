import {Component, OnInit, OnDestroy} from '@angular/core';
import {Product} from "../../shared/product";
import {ProductService} from "../product.service";
import {Router, ActivatedRoute} from "@angular/router";
import {RouteResolver} from "../../shared/routeResolver";
import {Category} from "../../shared/category";
import {SearchService} from "../search.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'dcws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  //pagination
  page: number = 1;
  itemsPerPage: number = 6;

  products: Product[] = [];
  title:string;

  searchedText: string = "";
  searchedCategory: Category;

  private textSubs: Subscription;
  private categorySubs: Subscription;

  constructor(private productService: ProductService,
              private searchService: SearchService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) { }

  changePage(newPage: number) {
    this.page = newPage;
    RouteResolver.goToFragment(this.router, this.activatedRoute, "top-page");
  }

  //inicijalizacija pagea
  ngOnInit() {
    this.products = this.productService.requireAllProducts();

    this.textSubs = this.searchService.observeSearchText().subscribe(data => this.searchedText = data);
    this.categorySubs = this.searchService.observeSearchCategory().subscribe(data => {
      if(data === null) {
        this.title = "Svi proizvodi";
      } else {
        this.title = data.name;
      }
      this.searchedCategory = data
    });
  }


  ngOnDestroy(): void {
    if(this.textSubs !== undefined) {
      this.textSubs.unsubscribe();
    }

    if(this.categorySubs !== undefined) {
      this.categorySubs.unsubscribe();
    }
  }
}
