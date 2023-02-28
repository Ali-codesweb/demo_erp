import { Box, Button, Container, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import AddBill from "../components/AddBill";
import { Appshell } from "../components/Appshell";
import { getBills } from "../network/lib/bill";

function HomeScreen() {
  const [opened, setOpened] = useState(false);
  const [bills, setbills] = useState([]);
  useEffect(() => {
    getBills().then((e) => setbills(e.data.data));
  },[opened]);

  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));

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
        <Table striped highlightOnHover withBorder withColumnBorders >
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Customer Mobile</th>
              <th>Total Product Price</th>
              <th>Total Price</th>
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
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default HomeScreen;
