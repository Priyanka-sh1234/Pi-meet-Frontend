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
import { useAuth } from '../components/protectRoutes/AuthContext';

import TrainerDashboard from '../components/Trainer/TrainerDashboard';
import AdminDashboard from '../components/Admin/AdminDashboard';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
   const [role, setRole] = useState("admin"); 
  return (
        <>
        {role === "admin" && <AdminDashboard />}
      {role === "trainer" && <TrainerDashboard />}

    </>
  );
};

export default Dashboard;
