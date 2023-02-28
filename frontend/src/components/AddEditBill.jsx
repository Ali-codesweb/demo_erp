import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Modal,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { createCustomerBill } from "../network/lib/bill";
import { getProductTypes } from "../network/lib/product_type";
function AddEditBill({ opened, handler, data, customer_name }) {
  const [billItems, setbillItems] = useState([
    {
      item: "",
      quantity: 0,
    },
  ]);
  const [productTypes, setproductTypes] = useState([]);
  const [customerName, setcustomerName] = useState(
    customer_name ? customer_name : ""
  );
  useEffect(() => {
    if (data) setbillItems(data);
    else
      setbillItems([
        {
          item: "",
          quantity: 0,
        },
      ]);
    getProductTypes().then((e) => setproductTypes(e.data.data));
  }, []);

  const onChange = (e, i, item) => {
    let newArr = [...billItems];
    newArr[i][item] = e;
    setbillItems(newArr);
  };

  const createBill = async () => {
    if (data) {
      console.log("edit")
     
    }else{
      const resp = await createCustomerBill({
        customer_name: customerName,
        bill_items: billItems,
      });
      handler.toggle();
    }
  };
  return (
    <Modal
      size={600}
      opened={opened}
      onClose={() => handler.toggle()}
      title="Add Bill!"
    >
      <TextInput
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setcustomerName(e.target.value)}
      />
      <Flex
        mb={20}
        mih={50}
        gap="xl"
        justify="center"
        align="end"
        direction="row"
        wrap="wrap"
      >
        <Text size={"xl"} mt={20}>
          Items
        </Text>
        <ActionIcon
          color={"blue"}
          variant="filled"
          onClick={() => {
            setbillItems([
              ...billItems,
              {
                name: "",
                quantity: 1,
              },
            ]);
          }}
        >
          <i class="fa-solid fa-plus"></i>
        </ActionIcon>
      </Flex>
      {billItems.map((e, i) => (
        <Group>
          <Select
            placeholder="Item"
            searchable
            limit={2}
            nothingFound="No options"
            value={e.item}
            name="name"
            onChange={(j) => {
              console.log(billItems);
              if (!billItems.find((c) => c.item == j)) {
                onChange(j, i, "item");
              }
            }}
            data={
              productTypes.length > 0 ? productTypes.map((e) => e.item) : []
            }
          />
          <TextInput
            type={"number"}
            value={e.quantity}
            onChange={(j) => onChange(parseInt(j.target.value), i, "quantity")}
            name="quantity"
            placeholder="Quantity"
          />

          <ActionIcon
            color={"red"}
            onClick={() => {
              setbillItems(billItems.filter((i) => i.item != e.item));
            }}
          >
            <i class="fa-solid fa-trash"></i>
          </ActionIcon>
        </Group>
      ))}
      <Button className="float-right" mt={20} onClick={createBill}>
        {!data ? "Create Bill" : "Edit"}
      </Button>
    </Modal>
  );
}

export default AddEditBill;
