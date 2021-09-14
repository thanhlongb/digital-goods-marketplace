import { NextPage } from 'next'
import { HeroSection } from '../modules/home/HeroSection';
import { CategoriesSection } from '../modules/home/CategoriesSection';
import { ProductsListSection } from '../modules/home/ProductsListSection';
import { CallToActionSection } from '../modules/home/CallToActionSection';
import { TopSellersSection } from '../modules/home/TopSellersSection';
import { CallToActionBusinessSection } from '../modules/home/CallToActionBusinessSection';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { API_PRODUCT_SERVICE } from '../../utils/constants';

interface HomePageProps {
  categories?: any[],
  recentProducts?: any[],
  topSellers?: any[]
}

const HomePage: NextPage<HomePageProps> = ({
  categories = [], 
  recentProducts = [],
  topSellers = []
}) => {
  // return JSON.stringify(recentProducts)
  return (
    <>  
      <DefaultLayout>
        <HeroSection />
        <CategoriesSection 
          categories={categories} />
        <ProductsListSection 
          title="Recently added products"
          products={recentProducts}
          showViewMore={true} />
        <CallToActionSection />
        <TopSellersSection 
          sellers={topSellers} />
        <CallToActionBusinessSection />
      </DefaultLayout>
    </>
  )
}

HomePage.getInitialProps = async ({ req }) => {
  // TODO: fix this stupid code blocking =)) 
  const recentProducts = await fetchRecentProducts();
  const categories = await fetch(`https://${API_PRODUCT_SERVICE}/categories`).then(response => response.json());
  const topSellers = await fetchTopSellers();
  
  return {
      categories: categories,
      recentProducts: recentProducts,
      topSellers: topSellers
  }
}

const fetchRecentProducts = async () => {
 return fetch(`https://${API_PRODUCT_SERVICE}/products/recent?limit=6`)
          .then(response => response.json())
          .catch(error => { console.log(error); return [] });
}

const fetchTopSellers = async () => {
  return fetch(`https://${API_PRODUCT_SERVICE}/products/topseller?limit=6`)
          .then(response => response.json())
          .catch(error => {console.log(error); return []});
}

export default HomePage