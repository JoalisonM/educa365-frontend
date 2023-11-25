import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from "@ui/components/ui/form";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useToast } from "@ui/components/ui/use-toast";

import { useAuth } from "@contexts/auth";
import * as Input from "@components/Input";
import { Button } from "@components/Button";
import { LoginProps } from "@dtos/loginDTO";
import { loginFormSchema } from "@schemas/loginFormSchema";

type LoginFormInputs = z.infer<typeof loginFormSchema>;

export const Login = () => {
  const { toast } = useToast();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordShown, setPasswordShown] = useState(false);

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });
  const {
    reset,
    formState: { errors },
  } = form;

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin: SubmitHandler<LoginProps> = async (value) => {
    const { email, senha } = value;

    try {
      const isLogged = await signIn({ email, senha });

      if (isLogged) {
        const origin = location?.state?.from?.pathname || "/students";
        navigate(origin);

        reset();
      }
    } catch (err) {
      toast({
        title: "E-mail ou senha inválido(s).",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen p-4 my-0 mx-auto bg-gray700">
      <Form {...form}>
        <div className="inset-0 z-50 h-[400px] w-[400px] rounded-xl bg-white opacity-10" />
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="fixed left-[50%] top-[50%] z-50 flex items-center justify-center h-[400px] w-[400px] translate-x-[-50%] translate-y-[-50%]"
        >
          <div className="flex flex-col items-center justify-center gap-4 w-full px-12">
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-3xl text-zinc-100">
                Login
              </h2>
              <span className="text-sm text-zinc-300">Bem-vindo de volta!</span>
            </div>

            <div className="w-full grid grid-cols-1">
              <FormField
                name="email"
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
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.email && errors.email.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1">
              <FormField
                name="senha"
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
                    <FormMessage className="text-sm font-normal text-error-500">
                      {errors.senha && errors.senha.message}
                    </FormMessage>
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
