import { validContactsHeaders, validContactsRow } from './../constants/validCSVData';
import { validateCSV } from './../utils/validateCSVs';
import { validListingsHeaders, validListingsRow } from "../constants/validCSVData"

describe('~~~~~~CSV Validation~~~~~~~~', () => {
    const correctListings = [
        validListingsHeaders, 
        [1000,"Audi",49717,6500,"private"],
        [1001,"Mazda",22031,7000,"private"],
        [1009,"Audi",40070,2500,"dealer"],
        [1010,"Fiat",41201,1500,"other"]
    ]
    const incorrectListings = [
        ['foo', 'bar', 'fuzz', 'buzz', 'seller_type'],
        ['1000',"Audi",49717,6500,"private"],
        [1001,"Mazda",22031,7000,"private"],
    ]

    const correctContacts = [
        validContactsHeaders,
        [1244,1592498493000],
        [1085,1582474057000],
        [ 1288,1579365755000],
        [ 1231,1585159440000],
    ]

    const incorrectContacts = [
        ['listing_id', 'contact_date'],
        ['1244',1592498493000],
        [1085,1582474057000],
        [1288,1579365755000],
        [1231,1585159440000],
    ]

    test('validate Listings CSV', () => {
        const noErrors = validateCSV(correctListings, validListingsHeaders, validListingsRow)
        const errors = validateCSV(incorrectListings, validListingsHeaders, validListingsRow)
        expect(noErrors).toBeNull();
        expect(errors).not.toBeNull();
        if(errors){
            expect(errors[0]).toBe('Error: foo is not a valid header, it should be: id')
        }
    })

    test('validate Contacts CSV', () => {
        const noErrors = validateCSV(correctContacts, validContactsHeaders, validContactsRow)
        const errors = validateCSV(incorrectContacts, validContactsHeaders, validContactsRow)
        expect(noErrors).toBeNull();
        expect(errors).not.toBeNull();
        if(errors){
            expect(errors[0]).toBe("Error: string is not a valid type for row number: 1, it should be: number"
            )
        }
    })
})
