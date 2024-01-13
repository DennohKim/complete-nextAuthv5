"use server"

import { signOut } from "@/auth"

export const logout = async () => {
	//add server side logic
  await signOut()
}