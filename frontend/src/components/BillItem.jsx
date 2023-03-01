import { ActionIcon, Box, Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { deleteBills, getBills } from "../network/lib/bill";
import AddEditBill from "./AddEditBill";

function BillItem({ element,setbills,bills }) {
  const [editOpened, editHandlers] = useDisclosure(false);
  const [deleteOpened, deleteHandlers] = useDisclosure(false);
  async function deleteBill() {
    await deleteBills(element.id)
    await getBills().then(e=>setbills(e.data.data))
    deleteHandlers.close()
  }
  return (
    <>
      <AddEditBill
        opened={editOpened}
        handler={editHandlers}
        data={element.bill_items}
        customer_name={element.customer_name}
        bill_id={element.id}
      />
      <Modal
        centered
        title="Delete this Bill ?"
        opened={deleteOpened} 
        onClose={() => deleteHandlers.close()} >
        <Box sx={{ float: 'right' }} >
          <Button mr={10} >No</Button>
          <Button color={'red'} onClick={deleteBill} >Yes</Button>
        </Box>
      </Modal>
      <tr key={element.id}>
        <td>{element.customer_name}</td>
        <td>{element.customer_mobile}</td>
        <td>{element.product_price}</td>
        <td>{element.total_price}</td>
        <td>
          <Group>
            <ActionIcon
              color={"blue"}
              variant="filled"
              onClick={() => editHandlers.open()}
            >
              <i class="fa-solid fa-pencil"></i>
            </ActionIcon>
            <ActionIcon color={"red"} variant="filled" onClick={() => deleteHandlers.open()}>
              <i class="fa-solid fa-trash"></i>
            </ActionIcon>
          </Group>
        </td>
      </tr>
    </>
  );
}

export default BillItem;
