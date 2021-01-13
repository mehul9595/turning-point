import React, { useState, useEffect } from "react";
import axios from "axios";
import ReCaptcha from "react-google-recaptcha";
import {
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Divider,
  Button,
  Checkbox,
  Modal,
  message,
} from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

const Registration = (props) => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const [agreementOk, setAgreementOk] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  useEffect(() => {
    console.log("use effect : agreementOk value", agreementOk);
    form.setFieldsValue({
      agreement: true,
    });
    setChecked(agreementOk);
  }, [form, agreementOk]);

  const handleOk = (params) => {
    setConfirmLoading(true);
    setAgreementOk(true);
    console.log("agreementOk value", agreementOk);
    console.log("setting fields value true");

    setTimeout(() => {
      form.validateFields(["agreement"]);
      setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  const showModal = (params) => {
    setVisible(true);
  };

  const onPrefixChange = () => {
    form.validateFields(["phone"]);
  };

  const onCheckChange = (e) => {
    console.log("agreementOk value", agreementOk);
    if (agreementOk) {
      setChecked(e.target.checked);
    }
  };

  const onSubmitFinish = async (values) => {
    message.loading("Submitting your registration", 3);
    console.log("agreementOk", agreementOk);

    const { firstName, lastName, email, phone } = values;

    await axios
      .post("https://registrationfuncapi.azurewebsites.net/api/registration", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      })
      .then(
        (response) => {
          console.log(response);
          message.success(
            "Your entry is submitted. Please wait for the results.",
            5
          );
        },
        (err) => {
          console.log(err);
          message.error("Server is busy right now, please try again later.", 5);
        }
      )
      .then(() => {
        form.resetFields();
        setAgreementOk(false);
        console.log("called at the end!");
      });
  };

  const onSubmitFailed = (values) => {
    console.log("Error:", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select onChange={onPrefixChange}>
        <Option value="+852">+852</Option>
        <Option value="+91">+91</Option>
      </Select>
    </Form.Item>
  );

  const onCaptchaChange = (e) => {
    console.log("onCaptchaChange:", e);
    const user_response = e;
    if (e === null) return;

    axios
      .post(
        "https://registrationfuncapi.azurewebsites.net/api/siteverifyfuncapi",
        {
          user_response: user_response,
        }
      )
      .then(
        (response) => {
          console.log(response);
          message.success("verified", 5);
        },
        (err) => {
          console.log(err);
          message.error("Server is busy right now, please try again later.", 5);
        }
      );
  };

  return (
    <Card title="Register for Lucky draw!" bordered hoverable>
      <Form
        // labelCol={{ span: 18 }}
        // wrapperCol={{ span: 16 }}
        size="large"
        form={form}
        initialValues={{
          prefix: "+852",
          agreement: false,
        }}
        layout="vertical"
        onFinish={onSubmitFinish}
        onFinishFailed={onSubmitFailed}
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
            rules={[{ required: true, message: "Last Name is required" }]}
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
              { required: true, message: "Phone number is required." },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  let code = getFieldValue("prefix");
                  if (
                    !value ||
                    (code === "+852" && value.length === 8) ||
                    (code === "+91" && value.length === 10)
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "Phone number is not valid for the selected country code"
                  );
                },
              }),
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
          rules={[
            {
              type: "boolean",
              required: true,
              transform: (value) => value || undefined,
              validator: async (_, value) => {
                if (value && agreementOk) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    "Please open and accept the terms and conditions"
                  );
                }
              },
            },
          ]}
        >
          <Checkbox checked={checked} onChange={onCheckChange}>
            I have read the
            <Button type="link" onClick={showModal} style={{ padding: "0" }}>
              Terms & Conditions.
            </Button>
          </Checkbox>
        </Form.Item>
        <Modal
          title="Terms and Conditions"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          cancelButtonProps={{ hidden: true }}
        >
          <p>
            <b>AGREEMENT TO TERMS</b> <br /> These Terms and Conditions
            constitute a legally binding agreement made between you, whether
            personally or on behalf of an entity (“you”) and [business entity
            name] (“we,” “us” or “our”), concerning your access to and use of
            the [website name.com] website as well as any other media form,
            media channel, mobile website or mobile application related, linked,
            or otherwise connected thereto (collectively, the “Site”). You agree
            that by accessing the Site, you have read, understood, and agree to
            be bound by all of these Terms and Conditions. If you do not agree
            with all of these Terms and Conditions, then you are expressly
            prohibited from using the Site and you must discontinue use
            immediately.
          </p>
        </Modal>
        <Form.Item
          name="challenge"
          rules={[
            { required: true, message: "Please verify the captcha challenge." },
          ]}
        >
          <ReCaptcha
            sitekey="6LdKEikaAAAAAJhWHGwLNbOROaOsNRww5zwCES_T"
            onChange={onCaptchaChange}
          ></ReCaptcha>
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
