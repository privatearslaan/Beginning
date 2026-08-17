"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteService } from "@/actions/admin";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

interface ServiceListProps {
  services: Array<{
    id: string;
    name: string;
    price: { toString(): string };
    durationMin: number;
    active: boolean;
  }>;
}

export function ServiceList({ services }: ServiceListProps) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      {services.map((service) => (
        <div
          key={service.id}
          className="flex items-center justify-between rounded-xl border border-emerald-100 bg-white p-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-stone-900">{service.name}</span>
              <Badge variant={service.active ? "default" : "outline"}>
                {service.active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-sm text-stone-500">
              {formatPrice(service.price.toString())} · {service.durationMin} min
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                await deleteService(service.id);
                toast.success("Service deleted");
              });
            }}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ))}
    </div>
  );
}
