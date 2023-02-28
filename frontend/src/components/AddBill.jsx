import {
    ActionIcon,
    Button, Flex,
    Group,
    Modal,
    Select, Text,
    TextInput
} from "@mantine/core";
import React, { useEffect, useState } from 'react';
import { createCustomerBill } from "../network/lib/bill";
import { getProductTypes } from "../network/lib/product_type";
function AddBill({opened,setOpened}) {

    const [productTypes, setproductTypes] = useState([])
    useEffect(()=>{
        getProductTypes().then(e=>setproductTypes(e.data.data))
    },[])
    const [customerName, setcustomerName] = useState("")
    const [billItems, setbillItems] = useState([
      {
        name: "",
        quantity: 1,
      },
    ]);
    const onChange = (e, i, name) => {
        let newArr = [...billItems];
        newArr[i][name] = e;
        setbillItems(newArr);
      };
    
      const createBill =async ()=>{
        const data =await  createCustomerBill({customer_name:customerName,bill_items:billItems})
        setOpened(false)
      }
  return (
    <Modal
    size={600}
    opened={opened}
    onClose={() => setOpened(false)}
    title="Add Bill!"
  >
    <TextInput placeholder="Customer Name" value={customerName} onChange={(e)=>setcustomerName(e.target.value)} />
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
        variant='filled'
        onClick={() =>
         {
          setbillItems([
            ...billItems,
            {
              name: "",
              quantity: 1,
            },
          ])
         }
        }
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
          value={e.name}
          name="name"
          onChange={(j) => {
            if(!billItems.find(c=>c.name==j)){
              onChange(j, i, "name")
            }
          }}
          data={productTypes.length > 0 ?  productTypes.map(e=>e.name) : []}
        />
        <TextInput
          type={"number"}
          onChange={(j) =>
            onChange(parseInt(j.target.value), i, "quantity")
          }
          name="quantity"
          placeholder="Quantity"
        />

        <ActionIcon color={"red"} onClick={() => {
          setbillItems(billItems.filter(i=>i.name!= e.name))
        }}>
          <i class="fa-solid fa-trash"></i>
        </ActionIcon>
      </Group>
    ))}
    <Button className="float-right" mt={20} onClick={createBill}>Create Bill</Button>
  </Modal>
  )
}

export default AddBill