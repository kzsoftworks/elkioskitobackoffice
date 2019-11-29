import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField
} from "react-admin";

export const PurchaseList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <DateField source="date" />
      <TextField source="name" />
      <TextField source="cost" />
      <ReferenceField source="user_id" reference="users">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
