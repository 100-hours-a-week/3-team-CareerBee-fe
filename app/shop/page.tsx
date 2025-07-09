import Intro from '@/src/entities/shop/ui/Intro';
import ProductList from '@/src/entities/shop/ui/ProductList';

export default function Page() {
  return (
    <div className="overflow-y-auto">
      <Intro />
      <ProductList />
    </div>
  );
}
