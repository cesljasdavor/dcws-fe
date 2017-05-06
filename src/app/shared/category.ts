export class Category {
  constructor(
    public name: string,
    public description: string,
    public id?: number,
    public super_category?: string,
    public picture?: string
  ) {}

  static createSameCategory(category: Category): Category {
    return new Category(category.name, category.description, category.id);
  }
}
