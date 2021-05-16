

export const averagePricePerSellerType = (rows: ListingsRow[]): AveragePricePerSellerType[] => {
    const out: AveragePricePerSellerType[] = [];
    const totalsBySellerType: {[key in AveragePricePerSellerType['seller_type']]: {
        totalPrice: number;
        totalListings: number;
    }} = {}

    // total prices per seller type
    rows.forEach(row => {
        if(!totalsBySellerType[row.seller_type]){
            totalsBySellerType[row.seller_type] = {
                totalPrice: Number(row.price),
                totalListings: 1
            }
        } else {
            totalsBySellerType[row.seller_type].totalPrice += Number(row.price)
            totalsBySellerType[row.seller_type].totalListings++;
        }
    })

    // get averages
    Object.keys(totalsBySellerType).map(key => {
        out.push({
            seller_type: key,
            average_price: totalsBySellerType[key].totalPrice / totalsBySellerType[key].totalListings
        })
    });
    
    return out;
}