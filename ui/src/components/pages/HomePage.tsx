import { GetServerSideProps, NextPage } from 'next'
import { HeroSection } from '../modules/home/HeroSection';
import { CategoriesSection } from '../modules/home/CategoriesSection';
import { ProductsListSection } from '../modules/home/ProductsListSection';
import { CallToActionSection } from '../modules/home/CallToActionSection';
import { TopSellersSection } from '../modules/home/TopSellersSection';
import { CallToActionBusinessSection } from '../modules/home/CallToActionBusinessSection';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { API_BASE_URL } from '../../utils/constants';

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
  const categories = await fetch(`http://${API_BASE_URL}/categories`).then(response => response.json());
  const topSellers = await fetchTopSellers();
  
  return {
      categories: categories,
      recentProducts: recentProducts,
      topSellers: topSellers
  }
}

const fetchRecentProducts = async () => {
 return fetch(`http://${API_BASE_URL}/getRecentProducts`)
          .then(response => response.json())
          .catch(error => {console.log(error); return []});
  
  // const recentProductsParsed = recentProducts.map(async (product:any) => {
  //   // TODO: fix this stupid code blocking =)) 
  //   fetch(`http://${API_BASE_URL}/users/${product.seller}`)
  //     .then(response => response.json())
  //     .then(seller => product.seller = seller);
  //   fetch(`http://${API_BASE_URL}/categories/${product.category}`)
  //     .then(response => response.json())
  //     .then(category => product.category = category);
    
  //   return product;
  // });
  // return Promise.all(recentProducts);
}

const fetchTopSellers = async () => {
  return fetch(`http://${API_BASE_URL}/getTopSellers`)
          .then(response => response.json())
          .catch(error => {console.log(error); return []});
  
  // const topSellersParsed = topSellers.map(async (seller:any) => {
  //   // TODO: fix this stupid code blocking =)) 
  //   fetch(`http://${API_BASE_URL}/getUserAvatar`)
  //     .then(response => response.json())
  //     .then(avatar => seller.imageUrl = avatar.imageUrl)
  //   // seller.imageUrl = imageUrl.imageUrl;
  //   return seller;
  // });
  // return Promise.all(topSellers);
}

export default HomePage