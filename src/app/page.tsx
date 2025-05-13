"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MagicLink } from "@/services/server";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
}

export default function Home() {
  const { register, handleSubmit, reset } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    await MagicLink(data.email as string);
    reset();
  };
  return (
    <div className="flex items-center justify-center h-screen mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Seja bem-vindo(a)!</CardTitle>
          <CardDescription>Insira seu email corporativo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              type="email"
              placeholder="exemplo@sicoobuberaba.com.br"
              {...register("email")}
              required
            />
            <Button type="submit" className="cursor-pointer">
              Receber link
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            No password required. Check your email for a magic link.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
