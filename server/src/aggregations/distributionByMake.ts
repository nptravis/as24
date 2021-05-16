export const distributionByMake = (rows: ListingsRow[]): DistributionByMake[] => {
    const out: DistributionByMake[] = [];
    const countByMake: {[key in ListingsRow['make']]: {total: number}} = {}

    rows.forEach(row => {
        if(!countByMake[row.make]){
            countByMake[row.make] = {total: 1};
        } else {
            countByMake[row.make].total++;
        }
    })

    Object.keys(countByMake).forEach(key => {
        out.push({
            make: key,
            distribution: countByMake[key].total / rows.length
        })
    })

    return out;
}