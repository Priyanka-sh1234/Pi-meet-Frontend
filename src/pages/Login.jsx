import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/protectRoutes/AuthContext';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = ({ admin, password }) => {
    setLoading(true);

    setTimeout(() => {
      if (admin === 'admin' && password === '123') {
        login();
        navigate("/AdminDashboard");
      } else {
        message.error('Invalid username or password.');
      }
      setLoading(false);
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white/40 p-6">
      <div className="relative backdrop-blur-2xl rounded-3xl shadow-orange-300 shadow-2xl p-10 w-full max-w-xl border border-black/30 overflow-hidden">

        {/* Decorative Blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-400 opacity-30 rounded-full blur-[100px] z-0"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-400 opacity-30 rounded-full blur-[100px] z-0"></div>

        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-6">
            Admin Panel Login
          </h1>

          <p className="text-center text-gray-800 mb-6">
            Please enter your admin credentials to proceed.
          </p>

          <Form
            layout="vertical"
            name="admin-login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={<span className="text-gray-800 font-semibold">Username</span>}
              name="admin"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                className="py-2 rounded-lg shadow-sm focus:border-blue-500 focus:shadow-md"
                placeholder="Enter username"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-800 font-semibold">Password</span>}
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                className="py-2 rounded-lg shadow-sm focus:border-blue-500 focus:shadow-md"
                placeholder="Enter password"
              />
            </Form.Item>


            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="!bg-gradient-to-r !from-blue-500 !to-indigo-600 hover:!from-blue-600 hover:!to-indigo-700 
               !text-white !font-semibold !py-4 !rounded-xl !shadow-md !w-full 
               transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
              >
                Login
              </Button>
            </Form.Item>

          </Form>
        </div>
      </div>
    </div>
  );
}
