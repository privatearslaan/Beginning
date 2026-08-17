/** All 28 states and 8 union territories of India (alphabetical). */
export const INDIAN_STATES_AND_UTS = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export type IndianStateOrUt = (typeof INDIAN_STATES_AND_UTS)[number];

export const STORE_PHONE = "+91 98765 43210";
export const STORE_PHONE_TEL = "+919876543210";

const INDIAN_STATE_SET = new Set<string>(INDIAN_STATES_AND_UTS);

export function isIndianStateOrUt(value: string): value is IndianStateOrUt {
  return INDIAN_STATE_SET.has(value);
}

/** Strip formatting and country code; returns up to 10 national digits. */
export function normalizeIndianPhone(input: string): string {
  const digits = input.replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }

  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }

  return digits.slice(0, 10);
}

export function isValidIndianMobile(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizeIndianPhone(phone));
}

/** Display as +91 XXXXX XXXXX for 10-digit Indian mobiles. */
export function formatIndianPhone(phone: string): string {
  const digits = normalizeIndianPhone(phone);
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return phone;
  }

  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}
