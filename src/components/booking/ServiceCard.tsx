"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    durationMin: number;
    price: { toString(): string } | number | string;
    image: string | null;
  };
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-stone-900">
          {service.name}
        </h3>
        <p className="mb-4 text-sm text-stone-600">{service.description}</p>
        <div className="mb-4 flex flex-wrap gap-4 text-sm text-stone-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {service.durationMin} min
          </span>
          <span className="font-semibold text-emerald-700">
            {formatPrice(service.price.toString())}
          </span>
        </div>
        <Link href={`/services/${service.id}/book`}>
          <Button className="w-full">Book Appointment</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
