import { Address } from "@api/address";
import { UpdateAddressInput } from "@dtos/addressDTO";
import { useCallback } from "react";

export const useAddress = () => {
  const updateAddress = useCallback((data: UpdateAddressInput) => {
    const response = Address.update(data);

    return response;
  }, []);

  return {
    updateAddress,
  };
};
