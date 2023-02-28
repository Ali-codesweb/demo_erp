import { ActionIcon, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import AddEditBill from "./AddEditBill";

function BillItem({ element }) {
  const [editOpened, editHandlers] = useDisclosure(false);
  return (
      <>
    <AddEditBill opened={editOpened} handler={editHandlers} data={element.bill_items} customer_name = {element.customer_name} />
    <tr key={element.id}>
      <td>{element.customer_name}</td>
      <td>{element.customer_mobile}</td>
      <td>{element.product_price}</td>
      <td>{element.total_price}</td>
      <td>
        <Group>
          <ActionIcon color={"blue"} variant="filled" onClick={() => editHandlers.open()}>
            <i class="fa-solid fa-pencil"></i>
          </ActionIcon>
          <ActionIcon color={"red"} variant="filled" onClick={() => {}}>
            <i class="fa-solid fa-trash"></i>
          </ActionIcon>
        </Group>
      </td>
    </tr>
   </>
  );
}

export default BillItem;
