import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import {
  enabledExtraServices,
  eventCategories,
  reservationSettings,
} from "@/config/reservations";
import { spaces } from "@/data/spaces";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formCopy, submitLead, type FormStatus } from "@/lib/submit-form";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const schema = z.object({
  nombre: z.string().min(3, "Escribe tu nombre completo."),
  whatsapp: z.string().min(7, "Indica un WhatsApp o teléfono de contacto."),
  correo: z.string().email("Correo no válido.").optional().or(z.literal("")),
  tipoEvento: z.string().min(1, "Selecciona el tipo de evento."),
  fecha: z.date({ required_error: "Selecciona una fecha estimada." }),
  hora: z.string().optional(),
  invitados: z.string().min(1, "Indica una cantidad aproximada."),
  espacio: z.string().optional(),
  presupuesto: z.string().optional(),
  servicios: z.array(z.string()).optional(),
  comentarios: z.string().optional(),
});

type Values = z.infer<typeof schema>;

export function EventQuoteForm({
  defaultCategory,
  defaultSpace,
}: {
  defaultCategory?: string;
  defaultSpace?: string;
}) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [channel, setChannel] = useState<"whatsapp" | "stored" | null>(null);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      whatsapp: "",
      correo: "",
      tipoEvento: defaultCategory ?? "",
      hora: "",
      invitados: "",
      espacio: defaultSpace ?? undefined,
      presupuesto: "",
      servicios: [],
      comentarios: "",
    },
  });

  const servicios = form.watch("servicios") ?? [];
  const fecha = form.watch("fecha");

  async function onSubmit(values: Values) {
    setStatus("submitting");
    try {
      const result = await submitLead({
        kind: "evento",
        fields: {
          nombre: values.nombre,
          whatsapp: values.whatsapp,
          correo: values.correo,
          tipoEvento:
            eventCategories.find((c) => c.id === values.tipoEvento)?.label ?? values.tipoEvento,
          fecha: format(values.fecha, "PPP", { locale: es }),
          hora: values.hora,
          invitados: values.invitados,
          espacio: spaces.find((s) => s.id === values.espacio)?.name ?? values.espacio,
          presupuesto: values.presupuesto,
          servicios: values.servicios,
          comentarios: values.comentarios,
        },
      });
      track("submit_cotizacion", { tipoEvento: values.tipoEvento });
      setChannel(result.channel);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gold-soft/30 px-6 py-10 text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">Solicitud enviada</p>
        <h3 className="mt-4 font-display text-3xl text-ivory">Estamos revisando tu cotización</h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-ink">
          {channel === "stored" ? formCopy.successNoChannel : formCopy.success}
        </p>
        <p className="mt-3 text-xs text-muted-ink/80">{formCopy.notConfirmed}</p>
      </div>
    );
  }

  return (
    <form id="cotizar" onSubmit={form.handleSubmit(onSubmit, () => setStatus("error"))} className="space-y-6" noValidate>
      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          {formCopy.error}
        </p>
      ) : null}

      <Field label="Nombre completo *" error={form.formState.errors.nombre?.message}>
        <Input autoComplete="name" {...form.register("nombre")} />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="WhatsApp / teléfono *" error={form.formState.errors.whatsapp?.message}>
          <Input inputMode="tel" autoComplete="tel" {...form.register("whatsapp")} />
        </Field>
        <Field label="Correo electrónico" error={form.formState.errors.correo?.message}>
          <Input type="email" autoComplete="email" {...form.register("correo")} />
        </Field>
      </div>

      <Field label="Tipo de evento *" error={form.formState.errors.tipoEvento?.message}>
        <Select
          value={form.watch("tipoEvento")}
          onValueChange={(value) => form.setValue("tipoEvento", value, { shouldValidate: true })}
        >
          <SelectTrigger aria-label="Tipo de evento">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {eventCategories.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Fecha estimada *" error={form.formState.errors.fecha?.message}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="goldOutline"
                className={cn(
                  "h-11 w-full justify-start font-sans text-sm font-normal tracking-normal normal-case",
                  !fecha && "text-muted-ink",
                )}
              >
                <CalendarIcon className="size-4" aria-hidden />
                {fecha ? format(fecha, "PPP", { locale: es }) : "Selecciona una fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto border-gold-soft/30 p-0" align="start">
              <Calendar
                mode="single"
                locale={es}
                selected={fecha}
                onSelect={(date) => form.setValue("fecha", date as Date, { shouldValidate: true })}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>
        </Field>
        <Field label="Hora estimada">
          <Select value={form.watch("hora")} onValueChange={(value) => form.setValue("hora", value)}>
            <SelectTrigger aria-label="Hora estimada">
              <SelectValue placeholder="Opcional" />
            </SelectTrigger>
            <SelectContent>
              {reservationSettings.availableTimes.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Cantidad aproximada de invitados *" error={form.formState.errors.invitados?.message}>
          <Input inputMode="numeric" {...form.register("invitados")} />
        </Field>
        <Field label="Espacio de interés">
          <Select value={form.watch("espacio") || undefined} onValueChange={(value) => form.setValue("espacio", value)}>
            <SelectTrigger aria-label="Espacio de interés">
              <SelectValue placeholder="Sin preferencia todavía" />
            </SelectTrigger>
            <SelectContent>
              {spaces.map((space) => (
                <SelectItem key={space.id} value={space.id}>
                  {space.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Presupuesto estimado">
        <Input {...form.register("presupuesto")} placeholder="Opcional" />
      </Field>

      <fieldset className="space-y-3">
        <legend className="font-sans text-[10px] uppercase tracking-[0.28em] text-gold">
          Servicios adicionales
        </legend>
        <p className="text-xs text-muted-ink">Ninguno es obligatorio. Se confirman según disponibilidad.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {enabledExtraServices.map((service) => {
            const checked = servicios.includes(service.id);
            return (
              <label key={service.id} className="flex items-center gap-3 text-sm text-ivory">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(value) => {
                    const next = value
                      ? [...servicios, service.id]
                      : servicios.filter((id) => id !== service.id);
                    form.setValue("servicios", next);
                  }}
                />
                {service.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <Field label="Comentarios">
        <Textarea rows={4} {...form.register("comentarios")} />
      </Field>

      <Button type="submit" variant="gold" className="w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? "Enviando solicitud..." : "Solicitar cotización"}
      </Button>
      <p className="text-xs text-muted-ink">{formCopy.notConfirmed}</p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="font-sans text-[10px] uppercase tracking-[0.28em] text-gold">{label}</Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
