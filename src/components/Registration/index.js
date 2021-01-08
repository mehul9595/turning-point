import React from "react";
import {
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Divider,
  Button,
  Checkbox,
} from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

const Registration = (props) => {
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select>
        <Option value="+852">+852</Option>
        <Option value="+91">+91</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Card title="Register for Lucky draw!" bordered hoverable>
      <Form
        // labelCol={{ span: 18 }}
        // wrapperCol={{ span: 16 }}
        size="large"
        initialValues={{
          prefix: "+852",
        }}
        layout="vertical"
      >
        <Form.Item label="Name">
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "First Name is required" }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0",
            }}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          {/* <Form.Item
            name="year"
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Input placeholder="Input birth year" />
          </Form.Item>
          <Form.Item
            name="month"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Input placeholder="Input birth month" />
          </Form.Item> */}
          <Form.Item
            label="Date of Birth"
            name="dob"
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0",
            }}
          >
            <DatePicker
              style={{ width: "100%" }}
              rules={[
                { required: true, message: "Date of birth is required." },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
            rules={[
              { type: "number", message: "This is not a valid phone number." },
              { required: true, message: "Phone number is required." },
            ]}
          >
            <Input placeholder="Contact number" addonBefore={prefixSelector} />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            { type: "email", message: "This is not correct email." },
            { required: true, message: "E-mail is required. " },
          ]}
        >
          <Input placeholder="abc@gmail.com" />
        </Form.Item>
        <Divider />

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Should accept agreement"),
            },
          ]}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Registration;
