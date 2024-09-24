import React, { memo, useEffect, useState } from "react";
import { Table, Input, Select, Form, Button, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { tutorialType, studyObject } from "./constants";
import EditNewModal from "./EditNewModal";
import "./index.css";

const mockData = [
  {
    key: "1",
    name: "心脏病急救指南",
    tutorialType: "网上康复学校",
    courseType: "在线编辑",
    studyObject: "职工",
    studyNumber: 1500,
    createTime: "2023-05-01",
  },
  {
    key: "2",
    name: "糖尿病饮食管理",
    tutorialType: "老年慢病学校",
    courseType: "上传课件",
    studyObject: "通用",
    studyNumber: 3000,
    createTime: "2023-04-15",
  },
  {
    key: "3",
    name: "新冠肺炎防护措施",
    tutorialType: "业务学习",
    courseType: "在线编辑",
    studyObject: "通用",
    studyNumber: 10000,
    createTime: "2023-03-20",
  },
  {
    key: "4",
    name: "手术室无菌操作",
    tutorialType: "应急操作培训",
    courseType: "上传课件",
    studyObject: "职工",
    studyNumber: 800,
    createTime: "2023-05-10",
  },
  {
    key: "5",
    name: "儿童疫苗接种指南",
    tutorialType: "网上康复学校",
    courseType: "在线编辑",
    studyObject: "通用",
    studyNumber: 5000,
    createTime: "2023-04-01",
  },
  {
    key: "6",
    name: "癌症放化疗护理",
    tutorialType: "老年慢病学校",
    courseType: "上传课件",
    studyObject: "职工",
    studyNumber: 1200,
    createTime: "2023-05-05",
  },
  {
    key: "7",
    name: "孕期营养指导",
    tutorialType: "业务学习",
    courseType: "在线编辑",
    studyObject: "通用",
    studyNumber: 4000,
    createTime: "2023-04-20",
  },
  {
    key: "8",
    name: "精神疾病诊断标准",
    tutorialType: "应急操作培训",
    courseType: "上传课件",
    studyObject: "职工",
    studyNumber: 600,
    createTime: "2023-05-15",
  },
  {
    key: "9",
    name: "中医养生保健",
    tutorialType: "网上康复学校",
    courseType: "在线编辑",
    studyObject: "通用",
    studyNumber: 8000,
    createTime: "2023-03-30",
  },
  {
    key: "10",
    name: "急诊科常见病处理",
    tutorialType: "老年慢病学校",
    courseType: "上传课件",
    studyObject: "职工",
    studyNumber: 2000,
    createTime: "2023-05-08",
  },
  {
    key: "11",
    name: "老年人跌倒预防",
    tutorialType: "业务学习",
    courseType: "在线编辑",
    studyObject: "通用",
    studyNumber: 3500,
    createTime: "2023-04-10",
  },
  {
    key: "12",
    name: "医疗器械使用指南",
    tutorialType: "应急操作培训",
    courseType: "上传课件",
    studyObject: "职工",
    studyNumber: 1800,
    createTime: "2023-05-12",
  },
];

const ManagePage = memo(() => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState(mockData);
  const [editData, setEditData] = useState(null);
  const [form] = Form.useForm();
  const columns = [
    {
      title: "教程名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "类型",
      dataIndex: "tutorialType",
      key: "tutorialType",
    },
    {
      title: "课件类型",
      dataIndex: "courseType",
      key: "courseType",
    },
    {
      title: "学习对象",
      dataIndex: "studyObject",
      key: "studyObject",
    },
    {
      title: "学习人数",
      dataIndex: "studyNumber",
      key: "studyNumber",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "教程类型",
      dataIndex: "tutorialType",
      key: "tutorialType",
    },
    {
      title: "操作",
      dataIndex: "option",
      key: "option",
      render: (_, record) => {
        return (
          <>
            <Button
              type="text"
              onClick={() => {
                setEditModalOpen(true);
                setEditData(record);
              }}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title="确定删除吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => {
                console.log("record", record);
                const filterData = dataSource.filter(
                  (item) => item.key !== record.key
                );
                setDataSource(filterData);
                message.success("删除成功");
              }}>
              <Button danger type="text">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    console.log("dataSource", dataSource);
  }, [dataSource]);

  return (
    <div>
      <div className="searchBar">
        <Form layout="inline" form={form}>
          <Form.Item label="教程名称" name="name">
            <Input placeholder="请输入教程名称" allowClear />
          </Form.Item>
          <Form.Item label="学习对象" name="studyObject">
            <Select
              placeholder="请选择学习对象"
              allowClear
              options={studyObject}
            />
          </Form.Item>
          <Form.Item label="教程类型" name="tutorialType">
            <Select
              placeholder="请选择教程类型"
              allowClear
              options={tutorialType}
            />
          </Form.Item>

          <Form.Item style={{ marginLeft: "auto" }}>
            <Button
              type="primary"
              style={{ marginRight: "8px" }}
              onClick={() => {
                // const { name, tutorialType, studyObject } =
                //   form.getFieldsValue();
                const formValue = form.getFieldsValue();
                // 过滤掉空值
                const filetFormValue = {};
                Object.keys(formValue).forEach((key) => {
                  if (formValue[key]) {
                    filetFormValue[key] = formValue[key];
                  }
                });
                console.log("filetFormValue", filetFormValue);
                const filterData = mockData.filter((item) => {
                  return Object.keys(filetFormValue).every((key) => {
                    return item[key].includes(filetFormValue[key]);
                  });
                });
                setDataSource(filterData);
                console.log(filterData);
              }}>
              查询
            </Button>
            <Button
              onClick={() => {
                setNewModalOpen(true);
              }}>
              新增
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 3,
        }}
      />
      {/* 编辑 modal */}
      <EditNewModal
        type="edit"
        open={editModalOpen}
        ok={(value) => {
          setEditModalOpen(false);
          console.log("数据编辑", value);
          const editedData = dataSource.map((item) => {
            if (item.key === value.key) {
              return {
                ...item,
                ...value,
              };
            }
            return item;
          });
          setDataSource(editedData);
        }}
        cancel={() => {
          setEditModalOpen(false);
        }}
        editData={editData}
      />
      {/* 新增 modal */}
      <EditNewModal
        type="new"
        open={newModalOpen}
        ok={(value) => {
          setNewModalOpen(false);
          console.log("新增数据", value);
          setDataSource([
            ...dataSource,
            {
              ...value,
              key: String(Number(dataSource[dataSource.length - 1].key) + 1),
            },
          ]);
        }}
        cancel={() => {
          setNewModalOpen(false);
        }}
      />
    </div>
  );
});

export default ManagePage;
