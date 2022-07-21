declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: "azure",
  },
  {
    path: "/gestion-usuarios",
    title: "Usuarios",
    icon: "icon-align-left-2",
    class: "azure",
  },
  {
    path: "/calendar-admin",
    title: "Calendario",
    icon: "icon-calendar-60",
    class: "yellow",
  },
  {
    path: "/user",
    title: "Perfil",
    icon: "icon-single-02",
    class: "azure",
  }
];

export const ROUTES_VIEWER : RouteInfo[] = [
  {
    path: "/calendar-view",
    title: "Calendario",
    icon: "icon-calendar-60",
    class: "yellow",
  },
  {
    path: "/user",
    title: "Perfil",
    icon: "icon-single-02",
    class: "azure",
  },
  {
    path: "/icons",
    title: "Icons",
    icon: "icon-atom",
    class: "pink",
  }
];
