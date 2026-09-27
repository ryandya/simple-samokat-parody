import { Explorer } from '@/screens/explorer/explorer-screen';
import { Favourites } from '@/screens/favourites/favourites-screen';
import Home from '@/screens/home/home-screen';
import { Profile } from '@/screens/profile/profile-screen';
import { Search } from '@/screens/search/search-screen';
import { IRoute } from "./navigation.types";
import { Cart } from '@/screens/cart/cart-screen';
import { Category } from '@/screens/category/category-screen';
import { Product } from '@/screens/product/product-screen';

export const routes: IRoute[] = [
    {
        name: 'Home',
        component: Home
    },
    {
        name: 'Favourites',
        component: Favourites
    },
    {
        name: 'Search',
        component: Search
    },
    {
        name: 'Explorer',
        component: Explorer
    },
    {
        name: 'Profile',
        component: Profile
    },
    {
        name: 'Cart',
        component: Cart
    },
    {
        name: 'Category',
        component: Category
    },
    {
        name: 'Product',
        component: Product
    },
]
