export class ProductDto {
  id: string;
  brand: string;
  model: string;
  yearOfManufacture: string;
  price: string;
  description: string;
  timestamp: string;
  status: string;
  imageURLs: string[];
  createdByEmail: string;
  createdById: string;

  constructor(post) {
    this.createdById = post.createdBy.id;
    this.createdByEmail = post.createdBy.email;
    this.id = post._id;
    this.brand = post.brand;
    this.model = post.model;
    this.yearOfManufacture = post.yearOfManufacture;
    this.imageURLs = post.imageURLs;
    this.price = post.price;
    this.description = post.description;
    this.timestamp = post.timestamp;
    this.status = post.status;
  }
}
