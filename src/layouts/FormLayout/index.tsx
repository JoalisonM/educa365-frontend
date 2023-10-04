import { tv } from "tailwind-variants";
import { NavLink } from "react-router-dom";
import { Check } from "@phosphor-icons/react";
import { ReactNode } from "react";

import { useFormContext } from "@hooks/useForm";

const item = tv({
  slots: {
    base: "flex items-center justify-center h-6 w-6 rounded-full border border-zinc-400",
    active: "flex items-center justify-center h-6 w-6 rounded-full border border-selectiveYellow bg-selectiveYellow",
  },
});

const { base, active } = item();

const formSteps = {
  STUDENT: {
    value: 1,
    title: "Dados do estudante",
    to: "/students/new-student",
  },
  ADDRESS: {
    value: 2,
    title: "Endereço",
    to: "/students/new-student/address",
  },
  COMMENTS: {
    value: 3,
    title: "Observações específicas",
    to: "/students/new-student/comments",
  },
  PARENTS: {
    value: 4,
    title: "Dados do responsável",
    to: "/students/new-student/parents",
  },
  CONDITIONS: {
    value: 5,
    title: "Condições de moradia e de vida",
    to: "/students/new-student/housing",
  },
};

interface FormLayoutProps {
  children: ReactNode;
}

export const FormLayout = ({ children }: FormLayoutProps) => {
  const { currentStep } = useFormContext();

  return (
    <div className="grid grid-cols-app">
      <aside className="flex flex-col gap-8">
        {Object.entries(formSteps).map(([key, step]) => (
          <div key={key} className="flex items-center gap-3 text-gray600">
            <span className={currentStep === step.value ? active() : base()}>
              {currentStep > step.value && <Check weight="bold" className="h-4 w-4 text-zinc-400" />}
            </span>
            <NavLink to={step.to}>{step.title}</NavLink>
          </div>
        ))}
      </aside>
      {children}
    </div>
  );
};
