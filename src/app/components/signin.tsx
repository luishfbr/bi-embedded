"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Mail, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { LoginWithMagicLink } from "../_actions";

export default function SignIn() {
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, reset } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    setLoading(true);
    try {
      const response = await LoginWithMagicLink(data.email);

      if (response != false) {
        toast.success("Email enviado com sucesso!", {
          style: {
            backgroundColor: "#d4edda",
            color: "black",
          },
        });
        reset();
      } else {
        toast.error("Erro ao enviar o email.", {
          style: {
            backgroundColor: "#f8d7da",
            color: "black",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Erro ao enviar o email.", {
        style: {
          backgroundColor: "#f8d7da",
          color: "black",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2">
          Seja bem-vindo(a)! <Rocket />
        </CardTitle>
        <CardDescription>
          Insira seu email corporativo no campo abaixo.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="pb-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label className="pl-2">Email</Label>
            <Input
              type="email"
              placeholder="exemplo@sicoobuberaba.com.br"
              required
              autoComplete="email"
              {...register("email")}
            />
          </div>
          <Button
            variant={"outline"}
            className="w-full cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              <p className="flex flex-row items-center gap-2">
                <Mail />
                Enviar link...
              </p>
            )}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
