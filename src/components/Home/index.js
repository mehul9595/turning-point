import React from "react";
import { Layout, Row, Col } from "antd";
import Entry from "../Registration";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;
const style = { background: "#0092ff", padding: "8px 0" };

const Home = (params) => {
  return (
    <Layout className="centered">
      <Header></Header>
      <Content style={{ margin: "0 auto"}}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <Entry></Entry>
          </Col>
        </Row>
      </Content>
      <Footer>Copyright 2021</Footer>
    </Layout>
  );
};

export default Home;
