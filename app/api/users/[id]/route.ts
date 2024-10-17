import { deleteUserById } from "@/actions/user.action";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export const DELETE = async (_request: NextRequest, { params }: Params) => {
  const { id } = params;

  //----> Delete the user from the database.
  const deletedUser = await deleteUserById(id);

  //----> Send back the response.
  return NextResponse.json({
    user: deletedUser,
    message: "User deleted successfully.",
  });
};

export default DELETE;
