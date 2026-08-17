import { z } from "zod";
import {
  INDIAN_STATES_AND_UTS,
  isValidIndianMobile,
  normalizeIndianPhone,
} from "@/lib/india";

export const checkoutFormSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .transform(normalizeIndianPhone)
    .refine(isValidIndianMobile, "Enter a valid 10-digit Indian mobile number"),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.enum(INDIAN_STATES_AND_UTS, {
    error: "Select a valid state or union territory",
  }),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
  deliveryNotes: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export function parseCheckoutForm(formData: FormData) {
  return checkoutFormSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2") || undefined,
    city: formData.get("city"),
    state: formData.get("state"),
    pincode: formData.get("pincode"),
    deliveryNotes: formData.get("deliveryNotes") || undefined,
  });
}

export function buildCheckoutFormData(values: CheckoutFormValues): FormData {
  const formData = new FormData();
  formData.set("fullName", values.fullName);
  formData.set("phone", values.phone);
  formData.set("addressLine1", values.addressLine1);
  if (values.addressLine2) {
    formData.set("addressLine2", values.addressLine2);
  }
  formData.set("city", values.city);
  formData.set("state", values.state);
  formData.set("pincode", values.pincode);
  if (values.deliveryNotes) {
    formData.set("deliveryNotes", values.deliveryNotes);
  }
  return formData;
}
