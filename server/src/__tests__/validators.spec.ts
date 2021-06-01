import { validateContactRow, validateListingRow } from './../utils/validateCSVs';

describe('~~~~~~CSV Validation~~~~~~~~', () => {
    
    test('validate Listings CSV', () => {
        expect(validateContactRow({"listing_id":"1244","contact_date":"1592498493000"})).toBeTruthy()
        expect(validateContactRow({"contact_date":"1592498493000"})).not.toBeTruthy()
    })

    test('validate Contacts CSV', () => {
        expect(validateListingRow({"id":"1000","make":"Audi","price":"49717","mileage":"6500","seller_type":"private"})).toBeTruthy()
        expect(validateListingRow({"price":"49717","mileage":"6500","seller_type":"private"})).not.toBeTruthy()
    })
})
