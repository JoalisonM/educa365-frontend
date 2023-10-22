import { ViaCep } from "@api/viaCep";

export const useCep = () => {
  const getCep = async (cep: string) => {
    try {
      const response = await ViaCep.get(cep);

      return response.data;
    } catch (e) {
      console.log("e: ", e);
    }
  };

  return {
    getCep,
  };
};
