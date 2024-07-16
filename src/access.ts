/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: InitialState | undefined) {
  const { loginUser } = initialState ?? {};
  return {
    canUser: loginUser,
    // canAdmin: currentUser && currentUser.access === 'admin',
    canAdmin: loginUser?.userRole === 'admin',
    // canAdmin: true,
  };
}
