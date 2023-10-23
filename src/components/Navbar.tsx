import { Layout, Menu } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Navbar: FC = () => {
  const router = useNavigate();
  const { isAuth } = useTypedSelector((state) => state.auth);
  return (
    <Layout.Header>
      {isAuth ? (
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          items={[
            { key: 0, label: "AVIATUS" },
            {
              key: 1,
              label: "Выйти",
              onClick: () => console.log("Выйти"),
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
