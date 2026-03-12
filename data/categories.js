export const categories = [
  { id: 'new-arrivals', name: 'وصلنا حديثاً', slug: 'new-arrivals' },
  { id: 'clothing', name: 'ملابس', slug: 'clothing' },
  { id: 'shoes', name: 'أحذية', slug: 'shoes' },
  { id: 'accessories', name: 'إكسسوارات', slug: 'accessories' },
  { id: 'sale', name: 'تخفيضات', slug: 'sale' },
];

export const subCategories = [
  { id: 't-shirts', name: 'تيشرتات', parent: 'clothing', slug: 't-shirts' },
  { id: 'shirts', name: 'قمصان', parent: 'clothing', slug: 'shirts' },
  { id: 'pants', name: 'بنطلونات', parent: 'clothing', slug: 'pants' },
  { id: 'jackets', name: 'جاكيتات', parent: 'clothing', slug: 'jackets' },
  { id: 'sneakers', name: 'سنيكرز', parent: 'shoes', slug: 'sneakers' },
  { id: 'boots', name: 'أحذية بوت', parent: 'shoes', slug: 'boots' },
];
