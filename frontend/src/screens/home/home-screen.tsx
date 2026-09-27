import { Layout } from '@/components'
import { FC } from 'react'
import { HeaderProfile } from './components/profile-header'
import { Banner } from './components/banner'
import { Categories } from './components/categories'
import { Products } from './components/products'

const Home: FC = () => {
    return (
        <Layout>
            <HeaderProfile />
            <Banner />
            <Categories />
            <Products />
        </Layout>
    )
}

export default Home
