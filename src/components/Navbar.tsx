import { Layout, Menu } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const Navbar: FC = () => {
  const router = useNavigate();
  const { isAuth, user } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();

  return (
    <Layout.Header>
      {isAuth ? (
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          items={[
            { key: 0, label: user.username },
            {
              key: 1,
              label: "Выйти",
              onClick: logout,
            },
          ]}
        />
      ) : (
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          items={[
            {
              key: 1,
              label: "Логин",
              onClick: () => router(RouteNames.LOGIN),
            },
          ]}
        />
      )}
    </Layout.Header>
  );
};

export default Navbar;
