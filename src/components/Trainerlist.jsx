import React, { useEffect, useState } from 'react';
import {
  Table, Tag, Space, Button, Modal, message, Drawer, Select
} from 'antd';
import {
  EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import {
  addTrainer, getAllTrainers, deleteTrainer, updateTrainer
} from '../api/trainerApi';
import { Label } from './ui/label';
import { Input as CustomInput } from './ui/input';
import { cn } from './lib/utils';

const batchOptions = [
  'Batch 9-11', 'Batch 11-1', 'Batch 2-4', 'Batch 4-6', 'Batch offline'
];

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const TrainerForm = ({ formData, handleChange, handleBatchChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <LabelInputContainer>
      <Label htmlFor="name">Full Name</Label>
      <CustomInput id="name" value={formData.name} onChange={handleChange} placeholder="Name" />
    </LabelInputContainer>

    <LabelInputContainer>
      <Label htmlFor="email">Email Address</Label>
      <CustomInput id="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" />
    </LabelInputContainer>

    <LabelInputContainer>
      <Label htmlFor="TrainerId">Trainer ID</Label>
      <CustomInput id="TrainerId" value={formData.TrainerId} onChange={handleChange} placeholder="Trainer ID" />
    </LabelInputContainer>

    <LabelInputContainer>
      <Label htmlFor="technology">Technology</Label>
      <select
        id="technology"
        value={formData.technology}
        onChange={handleChange}
        className="w-full px-3 py-2.5 bg-neutral-100 text-black rounded-md text-sm"
      >
        <option value="">Select technology</option>
        <option value="React">React</option>
        <option value="Python">Python</option>
        <option value="Node.js">Node.js</option>
        <option value="Java">Java</option>
        <option value="Angular">Angular</option>
      </select>
    </LabelInputContainer>

    <LabelInputContainer>
      <Label htmlFor="mobile">Mobile</Label>
      <CustomInput id="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" />
    </LabelInputContainer>

    <LabelInputContainer>
      <Label htmlFor="role">Role</Label>
      <select
        id="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full px-3 py-2.5 bg-neutral-100 text-black rounded-md text-sm"
      >
        <option value="Trainer">Trainer</option>
        <option value="Senior Trainer">Senior Trainer</option>
        <option value="Mentor">Mentor</option>
      </select>
    </LabelInputContainer>

    <LabelInputContainer className="md:col-span-2">
      <Label htmlFor="batch">Batches</Label>
      <Select
        mode="multiple"
        allowClear
        placeholder="Select batches"
        id="batch"
        value={formData.batch}
        onChange={handleBatchChange}
        className="w-full"
        options={batchOptions.map(batch => ({ label: batch, value: batch }))}
      />
    </LabelInputContainer>

    <div className="col-span-2 mt-4">
      <button
        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white"
        type="submit"
      >
        Submit
        <BottomGradient />
      </button>
    </div>
  </form>
);

const TrainerList = () => {
  const [trainers, setTrainers] = useState([]);
  const [formData, setFormData] = useState({
    name: '', email: '', TrainerId: '', technology: '', mobile: '', role: 'Trainer', batch: [],
  });

  const [search, setSearch] = useState('');
  const [view, setView] = useState('active');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const fetchTrainers = async () => {
    try {
      const res = await getAllTrainers();
      const all = res.trainers || [];

      const normalized = all.map(t => ({
        ...t,
        status: t.PassChangeStatus?.toLowerCase() === 'inactive' ? 'Inactive' : 'Active',
        batch: t.batch || [],
      }));

      setTrainers(normalized);
    } catch (err) {
      console.error('Error fetching trainers:', err);
      setTrainers([]);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleBatchChange = (value) => {
    setFormData(prev => ({ ...prev, batch: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTrainer(formData);
      message.success('Trainer added');
      setAddModalOpen(false);
      fetchTrainers();
    } catch (err) {
      message.error('Error adding trainer');
    }
  };

  const handleEdit = (record) => {
    setFormData({
      name: record.name,
      email: record.email || '',
      TrainerId: record.TrainerId || '',
      technology: record.technology || '',
      mobile: record.mobile || '',
      role: record.role || 'Trainer',
      batch: record.batch || [],
    });
    setSelectedTrainer(record);
    setEditDrawerOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTrainer(selectedTrainer._id, formData);
      message.success('Trainer updated');
      setEditDrawerOpen(false);
      fetchTrainers();
    } catch (err) {
      message.error('Error updating trainer');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTrainer(selectedTrainer.TrainerId);
      message.success('Trainer deleted');
      setDeleteModalOpen(false);
      fetchTrainers();
    } catch (err) {
      message.error('Error deleting trainer');
    }
  };

  const filteredData = trainers.filter(t =>
    t.name?.toLowerCase().includes(search.toLowerCase()) &&
    t.status?.toLowerCase() === view
  );

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Trainer ID', dataIndex: 'TrainerId', key: 'TrainerId' },
    { title: 'Technology', dataIndex: 'technology', key: 'technology' },
    {
      title: 'Batches',
      dataIndex: 'batch',
      key: 'batch',
      render: (b) => b?.length > 0 ? b.join(', ') : '—'
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status', render: (status) => (
        <Tag
          icon={status === 'Active' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          color={status === 'Active' ? 'green' : 'volcano'}
        >
          {status}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedTrainer(record);
              setDeleteModalOpen(true);
            }}
          />
        </Space>
      )
    }
  ];

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white rounded-lg p-4">
      <div className="flex justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-2">
          <button onClick={() => setView('active')} className={`px-4 py-2 rounded ${view === 'active' ? 'bg-gray-900 text-white' : 'border'}`}>Active</button>
          <button onClick={() => setView('inactive')} className={`px-4 py-2 rounded ${view === 'inactive' ? 'bg-gray-900 text-white' : 'border'}`}>Inactive</button>
        </div>
        <input
          placeholder="Search trainer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <button onClick={() => setAddModalOpen(true)} className="bg-gray-900 text-white rounded px-4 py-2">
          Add Trainer
        </button>
      </div>

      <Table columns={columns} dataSource={filteredData} rowKey="_id" pagination={{ pageSize: 5 }} />

      <Modal title="Add Trainer" open={addModalOpen} onCancel={() => setAddModalOpen(false)} footer={null} width={650}>
        <TrainerForm
          formData={formData}
          handleChange={handleChange}
          handleBatchChange={handleBatchChange}
          handleSubmit={handleAddSubmit}
        />
      </Modal>

      <Drawer
        title={`Edit Trainer - ${selectedTrainer?.name}`}
        open={editDrawerOpen}
        onClose={() => setEditDrawerOpen(false)}
        width={650}
      >
        <TrainerForm
          formData={formData}
          handleChange={handleChange}
          handleBatchChange={handleBatchChange}
          handleSubmit={handleUpdateSubmit}
        />
      </Drawer>

      <Modal
        title="Confirm Delete"
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={handleDelete}
        okButtonProps={{ danger: true }}
      >
        Are you sure you want to delete <b>{selectedTrainer?.name}</b>?
      </Modal>
    </div>
  );
};

export default TrainerList;
