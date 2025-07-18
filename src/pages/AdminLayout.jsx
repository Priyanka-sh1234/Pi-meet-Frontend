import React, { useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Divider } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSetAtom, useAtomValue } from "jotai";
import { secretKeyAtom, roleAtom, userAtom } from "../store/atoms";
import notification from "../assets/notification.png";
import image from "../assets/boy.png";

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const setSecret = useSetAtom(secretKeyAtom);
  const setRole = useSetAtom(roleAtom);
  const setUser = useSetAtom(userAtom);
  const role = useAtomValue(roleAtom); // 👈 Get role value

  const userName = "Aman Badyal";

  const handleLogout = () => {
    setSecret("");
    setRole("");
    setUser(null);
    navigate("/");
  };

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const userDropdownMenu = (
    <Menu>
      <Menu.Item key="user">
        <div className="items-center text-center gap-3 px-2 py-1">
          <Avatar size="large" src={image} icon={<UserOutlined />} />
          <div className="text-sm font-medium">{userName}</div>
          <div>{role === "admin" ? "Admin" : "Trainer"}</div>
          <div>amritpalsingh87@gmail.com</div>
        </div>
      </Menu.Item>
      <Divider style={{ margin: "4px 0" }} />
      <Menu.Item key="reset" icon={<ReloadOutlined />}>
        Reset password
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        className="bg-red-300"
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  // ✅ Role-based sidebar items
  const menuItems = [
    { key: "/dashboard", icon: <PieChartOutlined />, label: "Dashboard" },
    { key: "/all-classes", icon: <DesktopOutlined />, label: "All Classes" },
    ...(role === "Admin"
      ? [
          {
            key: "/add-trainer",
            icon: <TeamOutlined />,
            label: "Add a trainer",
          },
        ]
      : []),
  ];

  const getBreadcrumbLabel = (path) => {
    const item = menuItems.find((item) => item.key === path);
    return item ? item.label : "Page";
  };

  const currentPath = location.pathname;
  const breadcrumbLabel = getBreadcrumbLabel(currentPath);
  const siderWidth = collapsed ? 80 : 200;

  return (
    <>
      {/* ✅ Fixed Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={200}
        style={{
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="h-12 flex items-center justify-center bg-white rounded-md m-2 transition-all duration-300">
          {collapsed ? (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHeUX5G5ZPphWOo1-G_dz8Dhi9MobK8aJYUw&s"
              alt="Logo Collapsed"
              className="w-10"
            />
          ) : (
            <img
              src="https://www.pisoftinformatics.com/pisoft/images/latestLogoP.png"
              alt="Logo Full"
              className="w-32"
            />
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentPath]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      {/* ✅ Fixed Header */}
      <Header
        className="px-6 flex justify-end items-center bg-white shadow-sm h-16"
        style={{
          position: "fixed",
          top: 0,
          left: siderWidth,
          right: 0,
          height: 64,
          zIndex: 1000,
        }}
      >
        <img
          src={notification}
          alt="notification"
          className="w-10 h-10 mr-5 hover:animate-pulse transition-all duration-300"
        />

        <Dropdown overlay={userDropdownMenu} trigger={["click"]}>
          <button className="text-neutral-200 px-3 py-4 rounded-md shadow-sm flex items-center gap-2">
            <Avatar size="small" src={image} icon={<UserOutlined />} />
            <span className="hidden sm:inline text-sm font-medium">
              {userName}
            </span>
            <DownOutlined className="text-xs" />
          </button>
        </Dropdown>
      </Header>

      {/* ✅ Main Content Area */}
      <Content
        style={{
          marginLeft: siderWidth,
          marginTop: 64,
          padding: "16px",
          backgroundColor: "#f5f5f5",
          height: "calc(100vh - 64px)",
          overflow: "auto",
        }}
      >
        <Breadcrumb className="mb-4 text-gray-600">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>{breadcrumbLabel}</Breadcrumb.Item>
        </Breadcrumb>

        <div
          className="bg-white rounded-lg shadow p-6"
          style={{
            height: "100%",
            overflow: "auto",
          }}
        >
          <Outlet />
        </div>
      </Content>
    </>
  );
};

export default AdminLayout;
