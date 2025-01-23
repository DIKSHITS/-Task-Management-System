
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import UserManagement from "views/examples/UserManagement.js";
import ManageTasks from "views/examples/ManageTasks.js";
import Settings from "views/examples/Settings.js";
import TaskManagement from "views/examples/TaskManagement.js";
import TaskMonitoring from "views/examples/TaskMonitoring.js";
import TaskExecution from "views/examples/TaskExecution.js";
import Collaboration from "views/examples/Collaboration.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary", // Icon updated to represent Dashboard
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/Settings",
    name: "Project Overview and Settings",
    icon: "ni ni-settings-gear-65 text-blue", // Icon updated for Settings
    component: <Settings />,
    layout: "/admin",
  },
  {
    path: "/user-management",
    name: "Manage Users",
    icon: "ni ni-single-02 text-info", // Icon updated for User Management
    component: <UserManagement />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-circle-08 text-yellow", // Icon updated for User Profile
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/ManageTasks",
    name: "Manage Task",
    icon: "ni ni-bullet-list-67 text-red", // Icon updated for Manage Tasks
    component: <ManageTasks />,
    layout: "/admin",
  },
  {
    path: "/TaskManagement",
    name: "Task Management",
    icon: "ni ni-folder-17 text-purple", // Icon updated for Task Management
    component: <TaskManagement />,
    layout: "/admin",
  },
  {
    path: "/TaskMonitoring",
    name: "Task Monitoring",
    icon: "ni ni-chart-bar-32 text-green", // Icon updated for Task Monitoring
    component: <TaskMonitoring />,
    layout: "/admin",
  },
  {
    path: "/TaskExecution",
    name: "Task Execution",
    icon: "ni ni-delivery-fast text-orange", // Icon updated for Task Execution
    component: <TaskExecution />,
    layout: "/admin",
  },
  {
    path: "/Collaboration",
    name: "Collaboration",
    icon: "ni ni-chat-round text-cyan", // Icon updated for Collaboration
    component: <Collaboration />,
    layout: "/admin",
  },
];

export default routes;



