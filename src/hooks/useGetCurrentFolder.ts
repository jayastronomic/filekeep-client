import { useLocation } from "react-router";

export function useGetCurrentFolder() {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  return paths[paths.length - 1];
}
