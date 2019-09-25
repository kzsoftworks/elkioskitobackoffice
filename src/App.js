import React from "react";
import "./App.css";
import { Admin, Resource } from "react-admin";
import { ItemList } from "./components/ItemList";
import { ItemEdit } from "./components/ItemEdit";
import { ItemCreate } from "./components/ItemCreate";
import { PurchaseList } from "./components/PurchaseList";
import { PurchaseCreate } from "./components/PurchaseCreate";
import { PurchaseEdit } from "./components/PurchaseEdit";
import { UserList } from "./components/UserList";
import CustomRoutes from "./routes/CustomRoutes";
import Menu from "./components/Menu";

import {
  authProvider,
  dataProvider,
  firebaseRealtime
} from "../src/api/Firebase";

//<Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      menu={Menu}
      customSagas={[firebaseRealtime]}
      customRoutes={CustomRoutes}
    >
      <Resource
        name="purchases"
        options={{ label: "Purchases" }}
        list={PurchaseList}
        edit={PurchaseEdit}
        create={PurchaseCreate}
      />
      <Resource
        name="items"
        options={{ label: "Items" }}
        list={ItemList}
        edit={ItemEdit}
        create={ItemCreate}
      />
      <Resource name="users" options={{ label: "Users" }} list={UserList} />
    </Admin>
  );
}

export default App;
