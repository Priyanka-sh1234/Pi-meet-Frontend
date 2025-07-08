// components/AdminLayout.js
import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/protectRoutes/AuthContext';

const { Header, Content, Footer, Sider } = Layout;

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
        <Layout className='h-auto'
        theme="light">
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}
                theme='light'>
                {/* Logo Image */}
                <div className="h-20 flex bg-white items-center justify-center transition-all duration-300">
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
                            className="w-30"
                        />
                    )}
                </div>

                {/* Menu Items */}
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['/AdminDashboard']}
                    items={menuItems}
                    onClick={handleMenuClick}
                />
            </Sider>


            <Layout
                className='h-auto bg-white'
                theme="light">
                <Content className='h-screen w-full'>
                    <div className="bg-gradient-to-br from-orange-100 to-blue-100 p-8 rounded-xl shadow-md min-h-[80vh]">
                        <div className="bg-white rounded-lg shadow p-6">
                            <Outlet />
                        </div>
                    </div>
                    <button
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        className=" px-8 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50"
                    >
                        Logout
                    </button>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
