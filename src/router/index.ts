import { haveMenu } from "@/utils/authUtil";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/components/layout/MyLayout.vue"),
    meta: {
      name: "首页",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      name: "登录",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/components/layout/MyLayout.vue"),
    meta: {
      name: "主页",
    },
    children: [
      {
        path: "/setting",
        name: "Setting",
        component: () => import("@/components/layout/Content.vue"),
        meta: {
          name: "系统设置",
        },
        children: [
          {
            path: "/users",
            name: "UserManage",
            component: () => import("@/views/user/UserManage.vue"),
            meta: {
              name: "用户管理",
            },
          },
          {
            path: "/roles",
            name: "RoleManage",
            component: () => import("@/views/role/RoleManage.vue"),
            meta: {
              name: "角色管理",
            },
          },
          {
            path: "/authorits",
            name: "AuthoritManage",
            component: () => import("@/views/authority/AuthorityManage.vue"),
            meta: {
              name: "权限管理",
            },
          },
          {
            path: "/menus",
            name: "MenuManage",
            component: () => import("@/views/menu/MenuManage.vue"),
            meta: {
              name: "菜单管理",
            },
          },
          {
            path: "/dicts",
            name: "DIctManage",
            component: () => import("@/views/dict/DIctManage.vue"),
            meta: {
              name: "字典管理",
            },
          },
          {
            path: "/articles",
            name: "ArticleManage",
            component: () => import("@/views/article/ArticleManage.vue"),
            meta: {
              name: "文章管理",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/articles/:id",
    name: "EditArticle",
    component: () => import("@/views/article/Article.vue"),
    meta: {
      name: "编辑文章",
    },
  },
  {
    path: "/views/:id",
    name: "ArticleView",
    component: () => import("@/views/article/ArticleView.vue"),
    meta: {
      name: "预览文章",
    },
  },
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});


router.beforeEach(async (to) => {

  if (to.path === "/login" || to.path === "/" || to.path === "/home") {
    return true;
  }

  return await haveMenu(to)
});

export default router;
