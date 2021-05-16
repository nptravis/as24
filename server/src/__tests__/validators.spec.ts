import { validContactsHeaders, validContactsRow } from './../constants/validCSVData';
import { validateCSV } from './../utils/validateCSVs';
import { validListingsHeaders, validListingsRow } from "../constants/validCSVData"

describe('~~~~~~CSV Validation~~~~~~~~', () => {
    const correctListings: ListingsRow[] = [
        {id: '1000', make: "Audi", mileage: '49717', price: '6500', seller_type: 'private' },
        {id: '1000', make: "Mazda", mileage: '22031', price: '7000', seller_type: 'private' },
        {id: '1000', make: "Audi", mileage: '40700', price: '2500', seller_type: 'dealer' },
        {id: '1000', make: "Fiat", mileage: '49717', price: '6500', seller_type: 'other' },
    ]
    const incorrectListings = [
        {foo: '1000', make: "Audi", seller_type: 'private' },
        {id: 1000, make: "Mazda", mileage: '22031', price: '7000', seller_type: 'private' },
        {id: 1000, make: "Audi", mileage: '40700', price: '2500', seller_type: 'dealer' },
    ]

    const correctContacts = [
        {"listing_id":"1244","contact_date":"1592498493000"},
        {"listing_id":"1085","contact_date":"1582474057000"},
        {"listing_id":"1288","contact_date":"1579365755000"},
        {"listing_id":"1231","contact_date":"1585159440000"},
    ]

    const incorrectContacts = [
        {"listing_id":1244,"contact_date":"1592498493000"},
        {"listing_id":"1085","contact_date":"1582474057000"},
        {"listing_id":"1288","contact_date":"1579365755000"},
        {"listing_id":"1231","contact_date":"1585159440000"},
    ]

    test('validate Listings CSV', () => {
        const noError = validateCSV(correctListings, validListingsHeaders, validListingsRow)
        const error = validateCSV(incorrectListings, validListingsHeaders, validListingsRow)
        expect(noError).toBeNull();
        expect(error).not.toBeNull();
        if(error){
            expect(error.message).toBe('There is not enough headers.')
        }
    })

    test('validate Contacts CSV', () => {
        const noError = validateCSV(correctContacts, validContactsHeaders, validContactsRow)
        const error = validateCSV(incorrectContacts, validContactsHeaders, validContactsRow)
        expect(noError).toBeNull();
        expect(error).not.toBeNull();
        if(error){
            expect(error.message).toBe("number is not a valid type for row number: 1, it should be: string"
            )
        }
    })
})
