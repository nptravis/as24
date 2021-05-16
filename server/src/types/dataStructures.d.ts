interface ListingsRow {
	id: string;
	make: string;
	mileage: string;
    price: string;
	seller_type: string;
}

interface ContactsRow {
    listing_id: string;
    contact_date: string;
}

interface AveragePricePerSellerType {
    seller_type: string;
    average_price: number;
}

interface DistributionByMake {
    make: string;
    distribution: number;
}