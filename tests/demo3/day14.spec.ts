import {test, expect} from "@playwright/test";
import { GuestInfo, BookingRequest } from "../../pages/bookingModel.page";
import { D } from "@playwright/test";

test("Class test", () => {
    const guestInfo1 = new GuestInfo(
        "Nguyen Van",
        "A",
        "[EMAIL_ADSRESS]",
        "0123-456-789"
    )

    const checkIn = new Date ("2026-8-15");
    const checkOut = new Date ("2026-9-15");

    const countBookingDate = new BookingRequest(
        1500000,
        checkIn,
        checkOut,
        guestInfo1
    );

    console.log(countBookingDate.getNights());
    console.log(countBookingDate.calculateTotal());
})