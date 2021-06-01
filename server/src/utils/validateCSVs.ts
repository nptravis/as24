export const validateContactRow = (row: any): row is ContactsRow => 
    typeof row.listing_id === 'string' && 
    typeof row.contact_date === 'string';
export const validateListingRow = (row: any): row is ListingsRow => 
	typeof row.make === 'string' && 
	typeof row.price === 'string' && 
	typeof row.mileage === 'string' && 
	typeof row.id === 'string' && 
	typeof row.seller_type === 'string';