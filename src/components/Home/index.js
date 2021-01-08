import React from "react";
import { Layout, Row, Col } from "antd";
import Registration from "../Registration";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;
const contentStyle = { background: "#ececec", padding: "20px 50px" };

const Home = (params) => {
  return (
    <>
      <Row
        type="flex"
        justify="center"
        style={{ minHeight: "100vh", minWidth: "100vw", padding: "50px 0", backgroundColor:"#ececec" }}
      >
        <Col>
          {/* <Layout>
            <Header color={"white"}>AIA Lucky Draw</Header>
            <Content style={contentStyle}>
              
            </Content>
            <Footer>Lucky Draw - Copyright 2021</Footer>
          </Layout> */}
          <Registration></Registration>
        </Col>
      </Row>
    </>
  );
};

export default Home;
