import { getUserAllMenusApi } from "@/api/admin-user";

export const haveMenu = async (route: any): Promise<boolean> => {

  const userAllMenus = await getUserAllMenusApi();
  if (userAllMenus) {
    const menu = userAllMenus.find(
      (menu: any) =>
        menu.routePath === route.path && menu.routeName === route.name
    );
    if (menu) {
      return new Promise((resolve) => {
        resolve(true);
      });
    }
  }
  return new Promise((resolve) => {
    resolve(false);
  });
};
