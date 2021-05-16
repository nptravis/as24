interface ContentResponse<T> {
    content: T;
}

interface AveragePricePerSellerType {
    seller_type: string;
    average_price: number;
}

interface DistributionByMake {
    make: string;
    distribution: number;
}