import { Button, Form, Input } from "antd";
import { FC } from "react";
import { rules } from "../utils/rules";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";

const LoginForm: FC = () => {
  const dispatch = useDispatch();

  const submit = () => {
    // @ts-ignore
    dispatch(AuthActionCreators.login("user", "123"));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 800 }}
      initialValues={{ remember: true }}
      onFinish={submit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Логин"
        name="username"
        rules={[rules.required("Введите логин")]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        rules={[rules.required("Введите пароль")]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
