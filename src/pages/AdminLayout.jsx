// components/AdminLayout.js
import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/protectRoutes/AuthContext';

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const menuItems = [
    { key: '/AdminDashboard', icon: <PieChartOutlined />, label: 'Dashboard' },
    { key: '/all-classes', icon: <DesktopOutlined />, label: 'All Classes' },
    {
      key: 'sub1',
      icon: <TeamOutlined />,
      label: 'Trainers',
      children: [
        { key: '/add-trainer', label: 'Add a trainer' },
        { key: '/update-trainer', label: 'Update Credentials' },
      ],
    },
    { key: '/add-guest', icon: <UserOutlined />, label: 'Add a guest' },
  ];

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/AdminDashboard']}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header with Logout */}
        <Header className="bg-white px-6 flex justify-end items-center shadow-sm">
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white border-none px-4 py-1 rounded-md shadow-sm"
          >
            Logout
          </Button>
        </Header>

        {/* Main Content Area Styled */}
        <Content className="m-4">
          <div className="bg-gradient-to-br from-orange-100 to-blue-100 p-8 rounded-xl shadow-md min-h-[80vh]">
            <div className="bg-white rounded-lg shadow p-6">
              <Outlet />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
