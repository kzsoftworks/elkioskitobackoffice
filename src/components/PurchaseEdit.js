import React from "react";
import {
  Edit,
  SimpleForm,
  NumberInput,
  ReferenceInput,
  SelectInput
} from "react-admin";
import { DateInput } from "react-admin-date-inputs";

export const PurchaseEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput source="cost" step={1} />
      <DateInput
        label="Purchase Date"
        source="date"
        defaultValue={new Date()}
      />
      <ReferenceInput label="Item" source="item_id" reference="items">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="User" source="user_id" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
