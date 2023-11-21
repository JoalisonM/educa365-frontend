import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/components/ui/form";

import * as Input from "@components/Input";
import { EnvelopeSimple, Eye, EyeSlash } from "@phosphor-icons/react";
import { Button } from "@components/Button";
import { useState } from "react";

export const Login = () => {
  const form = useForm<any>();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen p-4 my-0 mx-auto bg-gray700">
      <Form {...form}>
        <div className="inset-0 z-50 h-[400px] w-[400px] rounded-xl bg-white opacity-10" />
        <form className="fixed left-[50%] top-[50%] z-50 flex items-center justify-center h-[400px] w-[400px] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex flex-col items-center justify-center gap-4 w-full px-12">
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-3xl text-zinc-100">
                Login
              </h2>
              <span className="text-sm text-zinc-300">Bem-vindo de volta!</span>
            </div>

            <div className="w-full grid grid-cols-1">
              <FormField
                name=""
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="email" className="text-zinc-100">E-mail</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="email"
                          type="email"
                          placeholder="Digite o e-mail"
                          className="flex-1 border-0 bg-transparent outline-none p-0 text-white placeholder-zinc-300 placeholder:text-sm disabled:cursor-not-allowed"
                          {...field}
                        />
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500"></FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1">
              <FormField
                name=""
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="password" className="text-zinc-100">Senha</FormLabel>
                    <FormControl>
                      <Input.Root>
                        <Input.Control
                          id="password"
                          placeholder="Digite a senha"
                          type={passwordShown ? "text" : "password"}
                          className="flex-1 border-0 bg-transparent outline-none p-0 text-white placeholder-zinc-300 placeholder:text-sm disabled:cursor-not-allowed"
                          {...field}
                        />
                        <Input.Suffix type="button" onClick={togglePassword}>
                          {!passwordShown
                            ? <EyeSlash className="h-5 w-5 text-zinc-300" />
                            : <Eye className="h-5 w-5 text-zinc-300" />
                          }
                        </Input.Suffix>
                      </Input.Root>
                    </FormControl>
                    <FormMessage className="text-sm font-normal text-error-500"></FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <Button type="submit">
                Entrar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
