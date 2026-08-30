import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactReasons } from "@/config/reservations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formCopy, submitLead, type FormStatus } from "@/lib/submit-form";
import { track } from "@/lib/analytics";

const schema = z.object({
  nombre: z.string().min(3, "Escribe tu nombre."),
  correo: z.string().email("Correo no válido.").optional().or(z.literal("")),
  whatsapp: z.string().optional(),
  motivo: z.string().min(1, "Selecciona un motivo."),
  mensaje: z.string().min(8, "Cuéntanos un poco más."),
});

type Values = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [channel, setChannel] = useState<"whatsapp" | "stored" | null>(null);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { nombre: "", correo: "", whatsapp: "", motivo: "", mensaje: "" },
  });

  async function onSubmit(values: Values) {
    setStatus("submitting");
    try {
      const result = await submitLead({
        kind: "contacto",
        fields: {
          ...values,
          motivo: contactReasons.find((r) => r.id === values.motivo)?.label ?? values.motivo,
        },
      });
      track("submit_contacto", { motivo: values.motivo });
      setChannel(result.channel);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gold-soft/30 px-6 py-8 text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">Mensaje enviado</p>
        <p className="mt-4 text-sm text-muted-ink">
          {channel === "stored" ? formCopy.successNoChannel : formCopy.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit, () => setStatus("error"))} className="space-y-5" noValidate>
      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          {formCopy.error}
        </p>
      ) : null}
      <div className="space-y-2">
        <Label className="font-sans text-[10px] uppercase tracking-[0.28em] text-gold">Nombre</Label>
        <Input autoComplete="name" {...form.register("nombre")} />
        {form.formState.errors.nombre ? (
          <p className="text-xs text-destructive">{form.formState.errors.nombre.message}</p>
        ) : null}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="font-sans text-[10px] uppercase tracking-[0.28em] text-gold">Correo</Label>
          <Input type="email" autoComplete="email" {...form.register("correo")} />
        </div>
        <div className="space-y-2">
          <Label className="font-sans text-[10px] uppercase tracking-[0.28em] text-gold">WhatsApp</Label>
          <Input inputMode="tel" {...form.register("whatsapp")} />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="font-sans text-[10px] uppercase tracking-[0.28em] text-gold">Motivo</Label>
        <Select value={form.watch("motivo")} onValueChange={(value) => form.setValue("motivo", value, { shouldValidate: true })}>
          <SelectTrigger aria-label="Motivo">
            <SelectValue placeholder="Selecciona un motivo" />
          </SelectTrigger>
          <SelectContent>
            {contactReasons.map((reason) => (
              <SelectItem key={reason.id} value={reason.id}>
                {reason.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="font-sans text-[10px] uppercase tracking-[0.28em] text-gold">Mensaje</Label>
        <Textarea rows={5} {...form.register("mensaje")} />
        {form.formState.errors.mensaje ? (
          <p className="text-xs text-destructive">{form.formState.errors.mensaje.message}</p>
        ) : null}
      </div>
      <Button type="submit" variant="gold" disabled={status === "submitting"}>
        {status === "submitting" ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
