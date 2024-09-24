import { Modal, Form, Input, Select, Upload, InputNumber } from "antd";
import React, { memo, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./EditNewModal.css";
import { tutorialType, publishType, studyObject, textType } from "./constants";
const EditNewModal = memo((props) => {
  const { type, open, ok, cancel, editData } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (editData) {
      form.setFieldsValue(editData);
    }
  }, [editData, form]);
  const courseType = Form.useWatch("courseType", form);
  useEffect(() => {
    console.log("courseType", courseType);
  }, [courseType]);
  return (
    <Modal
      width={800}
      okText="确定"
      cancelText="取消"
      open={open}
      title={type === "edit" ? "编辑新增课程" : "新增培训课程"}
      closable
      className="modalClassName"
      onOk={() => {
        const formValue = form.getFieldsValue();
        ok({
          ...editData,
          ...formValue,
          createTime:
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate(),
        });
      }}
      onCancel={cancel}>
      <Form layout="horizontal" form={form}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 4 }}>
            <Form.Item label="教程名称" name="name" required>
              <Input />
            </Form.Item>
            <div style={{ display: "flex", gap: 12 }}>
              <Form.Item
                label="教程类型"
                name="tutorialType"
                style={{ flex: 1 }}
                required>
                <Select options={tutorialType} />
              </Form.Item>
              <Form.Item
                label="发布类型"
                name="courseType"
                style={{ flex: 1 }}
                required>
                <Select options={publishType} />
              </Form.Item>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Form.Item
                label="学习对象"
                name="studyObject"
                style={{ flex: 1 }}
                required>
                <Select options={studyObject} />
              </Form.Item>
              {courseType ? (
                <>
                  {courseType === "上传课件" ? (
                    <Form.Item
                      label="课件类型"
                      name="textType"
                      style={{
                        flexBasis: "250px",
                      }}
                      required>
                      <Select options={textType} />
                    </Form.Item>
                  ) : null}

                  <Form.Item
                    label="阅读时间"
                    name=" readTime"
                    required
                    style={{
                      flexBasis: "250px",
                    }}>
                    <InputNumber suffix="秒" />
                  </Form.Item>
                </>
              ) : null}
            </div>

            <Form.Item label="教程说明" name="tutorialDetails" required>
              <Input.TextArea />
            </Form.Item>
          </div>

          <div style={{ flex: 2 }}>
            <Form.Item
              label="教程封面"
              name="tutorialCover"
              layout="vertical"
              className="upload-item"
              required
              valuePropName="fileList">
              <Upload listType="picture-card">
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
});

export default EditNewModal;
