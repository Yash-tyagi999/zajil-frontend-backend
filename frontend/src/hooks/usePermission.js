import { useSelector } from "react-redux";

export default function usePermission(key) {
  const permissions = useSelector(
    (state) => state.authMgmtSlice?.permissionsList || []
  );
  return permissions.includes(key);
}
