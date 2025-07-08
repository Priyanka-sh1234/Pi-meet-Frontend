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
import { useNavigate } from 'react-router-dom';
import { useAuth } from './protectRoutes/AuthContext';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  return (
    <div>Dashboard</div>
  );
};

export default Dashboard;
