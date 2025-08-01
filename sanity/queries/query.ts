import { defineQuery } from "next-sanity";

// ✅ All brands ko fetch karne ke liye simple query
const BRANDS_QUERY = defineQuery(`*[_type=='brand'] | order(name asc)`);

// ✅ Latest blogs
const LATEST_BLOG_QUERY = defineQuery(`
  *[_type == 'blog' && isLatest == true] | order(name asc) {
    ...,
    blogcategories[]->{
      title
    }
  }
`);

// ✅ Deal Products (status: hot)
const DEAL_PRODUCTS = defineQuery(`
  *[_type == 'product' && status == 'hot'] | order(name asc) {
    name,
    slug,
    price,
    discount,
    stock,
    variant,        // ✅ Explicitly added
    status,
    isFeatured,
    description,
    "categories": categories[]->title,
    images,
    brand->{
      name
    }
  }
`);

// ✅ Single product by slug
const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug] | order(name asc) [0] {
    name,
    slug,
    price,
    discount,
    stock,
    variant,        // ✅ Explicitly added
    status,
    isFeatured,
    description,
    "categories": categories[]->title,
    images,
    brand->{
      name
    }
  }
`);

// ✅ Brand specific query
const BRAND_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug] {
    "brandName": brand->title
  }
`);
const PRODUCTS_BY_VARIANT = defineQuery(`
  *[_type == "product" && variant == $variant] | order(name asc) {
    name,
    slug,
    price,
    discount,
    stock,
    variant,
    status,
    isFeatured,
    description,
    "categories": categories[]->title,
    images,
    brand->{
      name
    }
  }
`);

// ✅ My Orders
const MY_ORDERS_QUERY = defineQuery(`
  *[_type == 'order' && clerkUserId == $userId] | order(orderData desc) {
    ...,
    products[]{
      ...,
      product->
    }
  }
`);

// ✅ Get all blogs
const GET_ALL_BLOG = defineQuery(`
  *[_type == 'blog'] | order(publishedAt desc)[0...$quantity] {
    ...,
    blogcategories[]->{
      title
    }
  }
`);

// ✅ Single blog by slug
const SINGLE_BLOG_QUERY = defineQuery(`
  *[_type == "blog" && slug.current == $slug][0] {
    ...,
    author->{
      name,
      image,
    },
    blogcategories[]->{
      title,
      "slug": slug.current,
    },
  }
`);

// ✅ All Blog categories
const BLOG_CATEGORIES = defineQuery(`
  *[_type == "blog"] {
    blogcategories[]->{
      ...
    }
  }
`);

// ✅ Others Blog Query
const OTHERS_BLOG_QUERY = defineQuery(`
  *[
    _type == "blog"
    && defined(slug.current)
    && slug.current != $slug
  ] | order(publishedAt desc)[0...$quantity] {
    ...,
    publishedAt,
    title,
    mainImage,
    slug,
    author->{
      name,
      image,
    },
    categories[]->{
      title,
      "slug": slug.current,
    }
  }
`);

export {
  BRANDS_QUERY,
  LATEST_BLOG_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  BRAND_QUERY,
  MY_ORDERS_QUERY,
  GET_ALL_BLOG,
  SINGLE_BLOG_QUERY,
  BLOG_CATEGORIES,
  OTHERS_BLOG_QUERY,
  PRODUCTS_BY_VARIANT,
};
