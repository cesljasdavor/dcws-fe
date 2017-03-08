import { Component, OnInit } from '@angular/core';
import {Product} from "../../shared/product";
import {ProductService} from "../product.service";
import {Router, ActivatedRoute} from "@angular/router";
import {RouteResolver} from "../../shared/routeResolver";

@Component({
  selector: 'dcws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  page: number = 1;

  //produkti ovisno o stranici
  pageProducts: Product[] = [];
  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) { }

  changePage() {
    this.pageProducts = this.productService.getPageProducts(this.page);
    RouteResolver.goToFragment(this.router, this.activatedRoute, "top-page");
  }

  //inicijalizacija pagea
  ngOnInit() {
    this.changePage();
  }

  //za pagination
  getSize(): number {
    return this.productService.getNumberOfProducts();
  }

  getPageSize(): number {
    return this.productService.pageSize;
  }
}
