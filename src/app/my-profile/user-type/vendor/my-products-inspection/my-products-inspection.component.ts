import {Component, OnInit, OnDestroy} from '@angular/core';
import {Product} from "../../../../shared/product";
import {Category} from "../../../../shared/category";
import {Subscription} from "rxjs";
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {VendorService} from "../vendor.service";
import {CategoryService} from "../../../../product-page/category.service";
import {ProfileService} from "../../../profile.service";
import {FileUploader, FileItem, FileLikeObject} from "ng2-file-upload";

@Component({
  selector: 'app-my-products-inspection',
  templateUrl: './my-products-inspection.component.html',
  styleUrls: ['./my-products-inspection.component.css']
})
export class MyProductsInspectionComponent implements OnInit, OnDestroy {
  //svi produkti
  myProducts: Product[] = [];

  uploader: FileUploader = new FileUploader({url: "http://localhost:3000/image_uploads"});
  hasFileOverBase: boolean = false;
  picture: any;

  //za search
  filterActive: boolean = false;
  searchedTitle: string = "";
  searchedCategory: string = "";
  toPrice: number = null;
  available: boolean = true;

  product: Product;

  categories: Category[] = [];

  modalRef: NgbModalRef;

  private addSubs: Subscription;
  private delSubs: Subscription;
  private updateSubs: Subscription;

  constructor(private modalService: NgbModal,
              private vendorService: VendorService,
              private categoryService: CategoryService,
              private profileService: ProfileService,

  ) { }

  ngOnInit() {
    this.myProducts = this.vendorService.requireMyProducts();

    this.categories = this.categoryService.requireCategories();

    this.uploader.onCompleteAll = () => {
      this.uploader.clearQueue();
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      response = JSON.parse(response);
      this.product.picture = "http://localhost:3000" + response.image.url;
      if(this.product.id_product === 0) {
        this.addProductData();
      } else {
        this.updateProductData();
      }

    };
  }

  refreshMyProducts() {
    this.vendorService.refresh();
    this.myProducts = this.vendorService.requireMyProducts();
  }

  deleteProduct(product: Product) {
    this.delSubs = this.vendorService.deleteProduct(product).subscribe(
      response => {
        //izmjena unutar servisa
        let products = this.vendorService.productService.products;
        let index = products.findIndex(
          (p: Product) => p === product);
        products.splice(index, 1);

        this.refreshMyProducts();
      }
    );
  }

  openToUpdate(content, toUpdate:Product) {
    //stvori novi produkt isit ovakav
    this.product = Product.createSameProduct(toUpdate);
    this.picture = this.product.picture;

    this.modalRef = this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

  updateProduct() {
    if(this.uploader.queue.length === 0) {
      this.updateProductData();
      return;
    }

    let picture = this.getLastPicture();
    if(this.product.picture.endsWith(picture.file.name)) {
      this.updateProductData();
    } else {
      this.getLastPicture().upload();
    }

  }

  updateProductData() {
    let oldValue = this.myProducts.find((p: Product) => p.id_product === this.product.id_product);
    this.updateSubs = this.vendorService.updateProduct(oldValue, this.product).subscribe(
      response => {
        //izmjena unutar servisa
        let products = this.vendorService.productService.products;
        let index = products.findIndex(
          (p: Product) => p === oldValue);

        products.splice(index, 1, this.product);

        this.modalRef.close();

        this.refreshMyProducts();
      }
    );
  }

  openToCreate(content) {
    //novi prazan produkt
    this.product = Product.createEmptyProduct(this.profileService.myProfile.email);
    this.picture = 'https://upload.wikimedia.org/wikipedia/commons/6/66/Svengraph_Box.png';

    this.modalRef = this.modalService.open(content, {windowClass: "dark-modal", size: "lg"});
  }

  addProduct() {
    //upload samo zadnje slike
    this.getLastPicture().upload();
  }

  addProductData() {
    this.addSubs = this.vendorService.addProduct(this.product).map(response => response.json())
      .subscribe(
        data => {
          //izmjena unutar servisa, samo pričekaj id sa servera
          this.product.id_product = data.id;
          this.vendorService.productService.products.push(this.product);

          this.modalRef.close();

          this.refreshMyProducts();
        }
      );
  }

  getLastPicture(): FileItem {
    return this.uploader.queue[this.uploader.queue.length - 1];
  }

  fileOverBase(e: any) {
    this.hasFileOverBase = e;
  }

  addCategory(categoryName: string) {
    let index = this.product.categories.findIndex(
      (category: string) => category === categoryName);
    if(index === -1) {
      this.product.categories.push(categoryName);
    }
  }

  getCategories() {
    return this.categories;
  }

  deleteThisCategory(categoryName: string) {
    let index = this.product.categories.findIndex(
      (name: string) => name === categoryName);
    if(index !== -1) {
      this.product.categories.splice(index, 1);
    }
  }

  changePicture(e: any) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.picture = event.target.result;
      }

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  toggleFilter() {
    this.filterActive = !this.filterActive;
  }

  ngOnDestroy(): void {
    if(this.delSubs !== undefined) {
      this.delSubs.unsubscribe();
    }

    if(this.addSubs !== undefined) {
      this.addSubs.unsubscribe();
    }

    if(this.updateSubs !== undefined) {
      this.updateSubs.unsubscribe();
    }

  }
}
