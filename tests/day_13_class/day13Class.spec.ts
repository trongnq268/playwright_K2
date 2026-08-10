import { test, expect } from "@playwright/test";
import { GuestInfo } from "../../models/GuestInfo";
import { BookingRequest } from "../../models/bookingRequest";

test.describe("Day 13 - Level 1: Class & Encapsulation", () => {
  test("GuestInfo.getFullName() trả về đúng họ tên đầy đủ", () => {
    const guest = new GuestInfo("John", "Doe", "john.doe@test.com", "0900000000");

    expect(guest.getFullName()).toBe("John Doe");
  });

  test("BookingRequest tính đúng số đêm và tổng tiền lưu trú", () => {
    const guest = new GuestInfo("John", "Doe", "john.doe@test.com", "0900000000");
    const booking = new BookingRequest(
      500000,
      new Date("2026-08-10"),
      new Date("2026-08-13"),
      guest,
    );

    const totalPrice = booking.calculateTotalPrice();
    console.log(`Khách: ${guest.getFullName()} | Số đêm: ${booking.getNights()} | Tổng tiền: ${totalPrice}`);

    expect(booking.getNights()).toBe(3);
    expect(totalPrice).toBe(1500000);
  });
});
