import axios from "axios";
import { Users } from "../helpers/types/types";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const { data: userData } = await axios.get("/api/users");

  return userData.users as Users;
};

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
