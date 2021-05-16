import { averagePricePerSellerType } from "../aggregations/averagePricePerSellerType"
import { distributionByMake } from "../aggregations/distributionByMake";

describe('~~~~~Aggregations~~~~~~~', () => {

    test('averagePricePerSellerType', () => {
        const rows: ListingsRow[] = [
            {id: '1', make: 'audi', mileage: '10000', price: '100', seller_type: 'private'},
            {id: '2', make: 'audi', mileage: '10000', price: '50', seller_type: 'private'},
            {id: '3', make: 'audi', mileage: '10000', price: '100', seller_type: 'dealer'},
            {id: '4', make: 'audi', mileage: '10000', price: '200', seller_type: 'dealer'},
            {id: '5', make: 'audi', mileage: '10000', price: '50', seller_type: 'other'},
        ]
        const result = averagePricePerSellerType(rows);
        const expected: AveragePricePerSellerType[] = [
            {seller_type: 'private', average_price: 75},
            {seller_type: 'dealer', average_price: 150},
            {seller_type: 'other', average_price: 50},
        ]
    
        expect(result).toEqual(expected)
    })

    test('distributionByMake', () => {
        const rows: ListingsRow[] = [
            {id: '1', make: 'audi', mileage: '10000', price: '100', seller_type: 'private'},
            {id: '2', make: 'bmw', mileage: '10000', price: '50', seller_type: 'private'},
            {id: '3', make: 'audi', mileage: '10000', price: '50', seller_type: 'private'},
            {id: '4', make: 'audi', mileage: '10000', price: '50', seller_type: 'private'},
        ]
        const result = distributionByMake(rows);
        const expected: DistributionByMake[] = [
            {make: 'audi', distribution: 0.75},
            {make: 'bmw', distribution: 0.25}
        ]
    
        expect(result).toEqual(expected)
    })
})