import { ActionIcon, Box, Button, Container, Group, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import AddBill from "../components/AddBill";
import { Appshell } from "../components/Appshell";
import { getBills } from "../network/lib/bill";

function HomeScreen() {
  const [opened, setOpened] = useState(false);
  const [bills, setbills] = useState([]);
  useEffect(() => {
    getBills().then((e) => setbills(e.data.data));
  }, [opened]);

  return (
    <div>
      <Appshell />
      <Container>
        <Button
          onClick={() => setOpened(true)}
          mb={30}
          mt={20}
          rightIcon={<i class="fa-solid fa-plus"></i>}
          sx={{ float: "right" }}
        >
          Add{" "}
        </Button>
        <AddBill opened={opened} setOpened={setOpened} />
        <Table striped highlightOnHover withBorder withColumnBorders>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Customer Mobile</th>
              <th>Total Product Price</th>
              <th>Total Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bills.length > 0 &&
              bills.map((element) => (
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
                        onClick={() => {}}
                      >
                        <i class="fa-solid fa-pencil"></i>
                      </ActionIcon>
                      <ActionIcon
                        color={"red"}
                        variant="filled"
                        onClick={() => {}}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </ActionIcon>
                    </Group>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default HomeScreen;
