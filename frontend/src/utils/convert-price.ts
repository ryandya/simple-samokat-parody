export const ConvertPrice = (price: number) => {
    return price.toLocaleString('ru-RU', {
        style: 'currency', 
        currency: 'RUB'
    })
}