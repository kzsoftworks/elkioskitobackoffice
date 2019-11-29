import React from "react";
import { Create, SimpleForm, TextInput, NumberInput } from "react-admin";

export const ItemCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="bar_code" />
      <NumberInput source="price" />
    </SimpleForm>
  </Create>
);
