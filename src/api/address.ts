import { api } from "../lib/axios";
import { UpdateAddressInput } from "../dtos";

const uriAddress = "enderecos";

export const Address = {
  update(address: UpdateAddressInput) {
    const { id, ...newAddress } = address;

    return api.put(`${uriAddress}/${id}`, newAddress);
  },
};
