import groq from 'groq';

// список товаров (упрощённая "карточка" + поля для фронта)
export const PRODUCTS_LIST = groq`*[_type=="product"] | order(order asc){
  "_id": _id,
  title,
  "slug": slug.current,
  "basePrice": coalesce(basePrice, 0),
  "description": {
    "intro": descriptionIntro,
    "equipment": equipment[],
    "benefits": descriptionBenefits,
    "conclusion": descriptionConclusion
  },
  material,
  warranty,
  "image": coalesce(mainImage.asset->url, images[0].asset->url),
  "images": images[].asset->url,
  "options": options[]{ name, "values": values[]{ label, price } },
  "specsPairs": specs[]{ label, value },
  "category": coalesce(category->slug.current, "uncategorized")
}`;

export const PRODUCT_BY_SLUG = groq`*[_type=="product" && slug.current==$slug][0]{
  "_id": _id,
  title,
  "slug": slug.current,
  "basePrice": coalesce(basePrice, 0),
  "description": {
    "intro": descriptionIntro,
    "equipment": equipment[],
    "benefits": descriptionBenefits,
    "conclusion": descriptionConclusion
  },
  material,
  warranty,
  "image": coalesce(mainImage.asset->url, images[0].asset->url),
  "images": images[].asset->url,
  "options": options[]{ name, "values": values[]{ label, price } },
  "specsPairs": specs[]{ label, value },
  "category": coalesce(category->slug.current, "uncategorized")
}`;

// категории с вложенными товарами (для секций витрины)
export const CATEGORIES_WITH_PRODUCTS = groq`*[_type=="category"] | order(order asc){
  "_id": _id,
  title,
  "slug": slug.current,
  subtitle,
  order,
  "products": *[_type=="product" && references(^._id)] | order(order asc){
    "_id": _id,
    title,
    "slug": slug.current,
    "basePrice": coalesce(basePrice, 0),
    "description": {
      "intro": descriptionIntro,
      "equipment": equipment[],
      "benefits": descriptionBenefits,
      "conclusion": descriptionConclusion
    },
    material,
    warranty,
    "image": coalesce(mainImage.asset->url, images[0].asset->url),
    "images": images[].asset->url,
    "options": options[]{ name, "values": values[]{ label, price } },
    "specsPairs": specs[]{ label, value },
    "category": coalesce(category->slug.current, "uncategorized")
  }
}`;

export const GALLERY_ITEMS = groq`*[_type=="galleryItem"] | order(order asc){
  "_id": _id,
  title,
  "slug": slug.current,
  "cover": coalesce(cover.asset->url, images[0].asset->url),
  "images": images[].asset->url,
  text,
  "textPlain": select(defined(text) => pt::text(text), null)
}`;

export const GALLERY_BY_SLUG = groq`*[_type=="galleryItem" && slug.current==$slug][0]{
  "_id": _id,
  title,
  "slug": slug.current,
  "cover": coalesce(cover.asset->url, images[0].asset->url),
  "images": images[].asset->url,
  text
}`;
