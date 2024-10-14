'use server';

import { AddressDb } from "@/db/address.db";
import { Address } from "@prisma/client";


export const createAddress = async (formData: FormData) => {
    //----> Get the cart item from the request.
    const newAddress = Object.fromEntries(formData) as unknown as Address;
    //----> Store the new cart item in the database.
    const createdAddress = await AddressDb.createAddress(newAddress);
    //----> Send back the response.

    return createdAddress;
  };

export const deleteAddressById = async (preState: { id: string }) => {
  //----> Get the cart item id from params.
  const {id} = preState;
  //----> Delete the cart item from the database.
  const deletedAddress = await AddressDb.deletedAddress(id);
  //----> Send back the response.
  return deletedAddress;
};

export const editAddressById = async (formData: FormData) => {   
    //----> Get the cart item to update from request.
    const addressToUpdate = Object.fromEntries(formData) as unknown as Address;
    //----> Destructure address to update;
    const {id, ...rest} = addressToUpdate
    //----> Delete the cart item from the database.
    const editedAddress = await AddressDb.editAddress(id, rest);
    //----> Send back the response.
    return editedAddress;
  };

export const getAllAddress = async () => {
    //----> Get all cart items from the database.
    const address = await AddressDb.getAllAddress();
    //----> Send back the response.
    return address;
  };

export const getAddressById = async (preState: { id: string }) => {
  //----> Get the cart item id from params.
  const {id} = preState;
  //----> Retrieve cart item from database.
  const address = await AddressDb.detailAddress(id);
  //----> Send back the response back.
  return address;
};