import prisma from "./prisma.db";
import { Address } from "@prisma/client";

type AddressWithoutId = Omit<Address, 'id'>

export class AddressDb {
  constructor() {}

  static async createAddress(address: Address): Promise<Address> {
    const newAddress = await prisma.address.create({ data: address });

    if (!newAddress) {
      throw new Error("Address not created");
    }

    return newAddress;
  }

  static async editAddress(id: string, address: AddressWithoutId): Promise<Address> {
    await this.detailAddress(id);

    const editedAddress = await prisma.address.update({
      data: address,
      where: { id },
    });

    if (!editedAddress) {
      throw new Error(`Address with id: ${id} cannot be updated`);
    }

    return editedAddress;
  }

  static async deletedAddress(id: string): Promise<Address> {
    await this.detailAddress(id);

    const deletedAddress = await prisma.address.delete({ where: { id } });

    return deletedAddress;
  }

  static async detailAddress(id: string): Promise<Address> {
    const address = await prisma.address.findUnique({ where: { id } });

    if (!address) {
      throw new Error(`Address with id: ${id} is not found`);
    }

    return address;
  }

  static async getAllAddress(): Promise<Address[]> {
    return await prisma.address.findMany({});
  }
}
