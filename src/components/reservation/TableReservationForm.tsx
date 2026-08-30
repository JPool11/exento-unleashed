import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { reservationSettings, tableOccasions } from "@/config/reservations";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  fecha: z.date({ required_error: "Selecciona una fecha." }),
  hora: z.string().min(1, "Selecciona una hora."),
  personas: z.number().min(reservationSettings.minimumGuests).max(reservationSettings.maximumGuests),
  ocasion: z.string().min(1, "Selecciona una ocasión."),
  notas: z.string().optional(),
});

type Values = z.infer<typeof schema>;

export function TableReservationForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [channel, setChannel] = useState<"whatsapp" | "stored" | null>(null);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      whatsapp: "",
      correo: "",
      hora: "",
      personas: reservationSettings.defaultGuests,
      ocasion: "cena",
      notas: "",
    },
  });

  const personas = form.watch("personas");
  const fecha = form.watch("fecha");

  async function onSubmit(values: Values) {
    setStatus("submitting");
    try {
      const result = await submitLead({
        kind: "mesa",
        fields: {
          nombre: values.nombre,
          whatsapp: values.whatsapp,
          correo: values.correo,
          fecha: format(values.fecha, "PPP", { locale: es }),
          hora: values.hora,
          personas: values.personas,
          ocasion: tableOccasions.find((o) => o.id === values.ocasion)?.label ?? values.ocasion,
          notas: values.notas,
        },
      });
      track("submit_reserva", { ocasion: values.ocasion, personas: values.personas });
      setChannel(result.channel);
      setStatus("success");
      form.reset({ ...form.getValues(), nombre: "", whatsapp: "", correo: "", notas: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gold-soft/30 px-6 py-10 text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">Solicitud enviada</p>
        <h3 className="mt-4 font-display text-3xl text-ivory">Recibimos tu solicitud</h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-ink">
          {channel === "stored" ? formCopy.successNoChannel : formCopy.success}
        </p>
        <p className="mt-3 text-xs text-muted-ink/80">{formCopy.notConfirmed}</p>
        <Button variant="goldOutline" className="mt-6" onClick={() => setStatus("idle")}>
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit, () => setStatus("error"))} className="space-y-6" noValidate>
      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          {formCopy.error}
        </p>
      ) : null}

      <Field label="Nombre *" error={form.formState.errors.nombre?.message}>
        <Input id="nombre" autoComplete="name" {...form.register("nombre")} />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="WhatsApp / teléfono *" error={form.formState.errors.whatsapp?.message}>
          <Input id="whatsapp" inputMode="tel" autoComplete="tel" {...form.register("whatsapp")} />
        </Field>
        <Field label="Correo" error={form.formState.errors.correo?.message}>
          <Input id="correo" type="email" autoComplete="email" {...form.register("correo")} />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Fecha *" error={form.formState.errors.fecha?.message}>
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

        <Field label="Hora *" error={form.formState.errors.hora?.message}>
          <Select value={form.watch("hora")} onValueChange={(value) => form.setValue("hora", value, { shouldValidate: true })}>
            <SelectTrigger aria-label="Hora">
              <SelectValue placeholder="Selecciona una hora" />
            </SelectTrigger>
            <SelectContent>
              {reservationSettings.availableTimes.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {reservationSettings.provisionalHours ? (
            <p className="text-xs text-muted-ink">{reservationSettings.hoursNote}</p>
          ) : null}
        </Field>
      </div>

      <Field label="Número de personas *" error={form.formState.errors.personas?.message}>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex size-11 items-center justify-center border border-gold-soft text-gold"
            aria-label="Quitar persona"
            onClick={() =>
              form.setValue("personas", Math.max(reservationSettings.minimumGuests, personas - 1), {
                shouldValidate: true,
              })
            }
          >
            <Minus className="size-4" />
          </button>
          <p className="min-w-24 text-center font-display text-2xl text-ivory" aria-live="polite">
            {personas} {personas === 1 ? "persona" : "personas"}
          </p>
          <button
            type="button"
            className="flex size-11 items-center justify-center border border-gold-soft text-gold"
            aria-label="Agregar persona"
            onClick={() =>
              form.setValue("personas", Math.min(reservationSettings.maximumGuests, personas + 1), {
                shouldValidate: true,
              })
            }
          >
            <Plus className="size-4" />
          </button>
        </div>
      </Field>

      <Field label="Categoría / ocasión" error={form.formState.errors.ocasion?.message}>
        <Select
          value={form.watch("ocasion")}
          onValueChange={(value) => form.setValue("ocasion", value, { shouldValidate: true })}
        >
          <SelectTrigger aria-label="Ocasión">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tableOccasions.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Notas especiales">
        <Textarea id="notas" rows={4} {...form.register("notas")} />
      </Field>

      <Button type="submit" variant="gold" className="w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? "Enviando solicitud..." : "Solicitar mesa"}
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
