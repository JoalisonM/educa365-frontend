import { ptBR } from "date-fns/locale";
import { formatDistanceStrict } from "date-fns";
import { format, toDate, utcToZonedTime } from "date-fns-tz";

export const formatDate = (date: string) => {
  const timeInBrazilian = utcToZonedTime(toDate(date), "America/Sao_Paulo");

  return format(timeInBrazilian, "dd-MM-yyyy", { locale: ptBR });
};

export const formatDateToAge = (date: string) => {
  const timeInBrazilian = utcToZonedTime(toDate(date), "America/Sao_Paulo");

  return formatDistanceStrict(new Date(), timeInBrazilian, { locale: ptBR });
};
