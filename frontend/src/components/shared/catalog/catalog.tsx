import { IProduct } from "@/types/product.interface"
import { FC } from 'react';
import { Text, View } from 'react-native';
import cn from 'clsx';
import { Header } from "@/components/ui";
import { ProductItem } from "./product-item";

interface ICatalog {
    title?: string
    products: IProduct[]
}

export const Catalog: FC<ICatalog> = ({ title, products }) => {
    return (
        <View className={'mb-16'}>
            {title &&
                <Header>{title}</Header>
            }
            {products?.length
                ? (
                    <View className="flex-row flex-wrap justify-between mt-4">
                        {products.map(product => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </View>
                )
                : (
                    <Text className="mt-2">
                        Продукты не найдены
                    </Text>
                )
            }
        </View>
    );
};

