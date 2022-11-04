import Head from "next/head";
import Image from "next/image";
import { Avatar, Button, Card, Form, Input, Modal } from "antd";
import {
  DeleteFilled,
  DribbbleOutlined,
  EditOutlined,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  const finalArray = data.map((each) => ({
    ...each,
    favList: false,
  }));
  return {
    props: { crud: finalArray },
  };
};

const Home = ({ crud }) => {
  const [array, setArray] = useState([]);

  const [values, setValues] = useState({});

  const handleFavList = (index) => {
    array[index].favList = !array[index].favList;
    setArray([...array]);
  };

  const handleDeleteUser = (id) => {
    const finalArray = array.filter((each) => each.id !== id);
    setArray(finalArray);
  };

  const showModal = (id) => {
    const obj = array.find((each) => each.id === id);
    setValues({ ...obj });
  };

  const handleChange = (name, email, phone, website) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      [email]: e.target.value,
      [phone]: e.target.value,
      [website]: e.target.value,
    });
  };

  const handleOk = () => {
    const reqIndex = array.findIndex((each) => each.id === values.id);
    array[reqIndex] = values;
    setValues({});
  };

  const handleCancel = () => {
    setValues({});
  };

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  useEffect(() => {
    if (crud.length) {
      setArray(crud);
    }
  }, [crud]);

  return (
    <div className="main-container">
      <div className="list_container">
        {array.map((crud, index) => (
          <Card
            style={{
              width: { lg: "300px", xs: "100vw" },

              height: "fit-content",
              backgroundColor: "#fffff",
              marginBottom: "10px",
            }}
          >
            <div key={crud.id}>
              <a className="userlist">
                <div className="user_image">
                  <img
                    src="/icon.png"
                    alt="next img"
                    // width="100%"
                    style={{
                      alignItems: "center",
                      width: "50%",
                      height: "50%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                </div>
                <div className="userdetails">
                  <p className="user_name">{crud.name}</p>
                  <div className="mail bg-warning mb-0">
                    <MailOutlined />
                    <p className="listtext">{crud.email}</p>
                  </div>
                  <div className="phone">
                    <PhoneOutlined />
                    <p className="phone">{crud.phone}</p>
                  </div>
                  <div className="website">
                    <DribbbleOutlined />
                    <p className="listtext">{crud.website}</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="buttons">
              <Button className="btn_each" onClick={() => handleFavList(index)}>
                {crud.favList ? (
                  <HeartFilled style={{ color: "red" }} />
                ) : (
                  <HeartOutlined style={{ color: "red" }} />
                )}
              </Button>
              <Button className="btn_each" onClick={() => showModal(crud.id)}>
                <EditOutlined />
              </Button>
              <Modal
                title="Edit User"
                open={values.id == crud.id}
                onOk={handleOk}
                onCancel={handleCancel}
                mask={true}
                // maskStyle={{ backgroundColor: "none" }}
              >
                <Form>
                  <Form.Item
                    label="Name"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onChange={handleChange("name")}
                  >
                    <Input value={values.name} />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onChange={handleChange("email")}
                  >
                    <Input value={values.email} />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onChange={handleChange("phone")}
                  >
                    <Input value={values.phone} />
                  </Form.Item>
                  <Form.Item
                    label="Website"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onChange={handleChange("website")}
                  >
                    <Input value={values.website} />
                  </Form.Item>
                </Form>
              </Modal>

              <Button onClick={() => handleDeleteUser(crud.id)}>
                <DeleteFilled />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
