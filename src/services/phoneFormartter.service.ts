import { CountryCode, parsePhoneNumberWithError } from "libphonenumber-js";

class PhoneService {
    public formatPhoneNumber(phoneNumber: string, country?: CountryCode) {
        const phone = parsePhoneNumberWithError(phoneNumber, { defaultCountry: 'KE' });
        if (phone) {
            return `${phone.countryCallingCode} ${phone.nationalNumber}`;
        }
    }
}

export const phoneService = new PhoneService();