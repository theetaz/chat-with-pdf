"use client";

import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
  layout: "vertical",
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const Contact = () => {
  const [formButtonLoading, setFormButtonLoading] = useState(false);

  const onFinish = async (values) => {
    setFormButtonLoading(true);
    try {
      console.log(values);
      const response = await fetch("/api/sendcontactmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values.user),
      });
      const data = await response.json();
      console.log(data);
      message.success(data.message);
      setFormButtonLoading(false);
    } catch (error) {
      console.log(error);
      setFormButtonLoading(false);
    }
  };

  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        className="contact-form"
        // style={{
        //   maxWidth: 800,
        // }}
        validateMessages={validateMessages}
        autoComplete="off"
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name={["user", "message"]} label="message">
          <Input.TextArea rows={8} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit" loading={formButtonLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Contact;
