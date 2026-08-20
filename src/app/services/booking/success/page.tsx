import Link from "next/link";
import { GuestBookingSuccessActions } from "./GuestBookingSuccessActions";

interface BookingSuccessPageProps {
  searchParams: Promise<{ whatsapp?: string }>;
}

export default async function BookingSuccessPage({
  searchParams,
}: BookingSuccessPageProps) {
  const { whatsapp } = await searchParams;
  const whatsappUrl = whatsapp ? decodeURIComponent(whatsapp) : null;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <div className="rounded-[1.5rem] border border-line/70 bg-white p-8 shadow-lg">
        <p className="section-eyebrow mb-4 mx-auto w-fit">Booking Request</p>
        <h1 className="text-2xl font-black text-ink sm:text-3xl">
          Almost there!
        </h1>
        <p className="mt-3 text-muted">
          Send your grooming request on WhatsApp so our team can confirm your
          preferred slot.
        </p>

        {whatsappUrl ? (
          <div className="mt-8">
            <GuestBookingSuccessActions whatsappUrl={whatsappUrl} />
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-brand px-6 font-bold text-white"
            >
              Back to Services
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
