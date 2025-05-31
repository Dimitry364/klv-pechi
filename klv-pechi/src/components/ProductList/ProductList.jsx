import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';

function ProductList({ products }) {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
