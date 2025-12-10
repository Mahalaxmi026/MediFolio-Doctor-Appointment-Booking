// ApplyDoctor.jsx
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { Container } from "react-bootstrap";
import React from "react";
import axios from "axios";
import dayjs from "dayjs";

function ApplyDoctor({ userId }) {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      // Validate timings
      if (!values.timings || values.timings.length !== 2) {
        message.error("Please select working timings");
        return;
      }

      // Convert timings to ["HH:mm", "HH:mm"]
      const timings = [
        dayjs(values.timings[0]).format("HH:mm"),
        dayjs(values.timings[1]).format("HH:mm"),
      ];

      // Construct doctor object
      const doctor = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        specialization: values.specialization,
        experience: Number(values.experience),
        fees: Number(values.fees),
        timings,
      };

      const payload = { doctor, userId };

      // API call
      const res = await axios.post(
        "http://localhost:5000/api/user/registerdoc",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        form.resetFields();
      } else {
        message.error(res.data.message || "Failed to apply");
      }
    } catch (error) {
      console.error("ApplyDoctor Error:", error);
      message.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container>
      <h2 className="text-center p-3">Apply for Doctor</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="m-3"
      >
        <Row gutter={20}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Full name required" }]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Email required" }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: "Phone required" }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Address required" }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[{ required: true, message: "Specialization required" }]}
            >
              <Input placeholder="Ex: Cardiologist, Dermatologist etc." />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Experience (in years)"
              name="experience"
              rules={[{ required: true, message: "Experience required" }]}
            >
              <Input type="number" placeholder="Enter experience" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Consultation Fees"
              name="fees"
              rules={[{ required: true, message: "Fees required" }]}
            >
              <Input type="number" placeholder="Enter fees" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={24}>
            <Form.Item
              label="Working Timings"
              name="timings"
              rules={[{ required: true, message: "Please select timings" }]}
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>

        <div className="text-center mt-3">
          <button className="btn btn-primary px-4" type="submit">
            Submit Application
          </button>
        </div>
      </Form>
    </Container>
  );
}

export default ApplyDoctor;
