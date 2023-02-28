import { ActionIcon, Box, Button, Container, Group, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import AddEditBill from "../components/AddEditBill";
import { Appshell } from "../components/Appshell";
import BillItem from "../components/BillItem";
import { getBills } from "../network/lib/bill";

function HomeScreen() {
  const [addOpened, addHandler] = useDisclosure(false);
 
  const [bills, setbills] = useState([]);
  useEffect(() => {
    getBills().then((e) => setbills(e.data.data));
  }, [addOpened]);

  return (
    <div>
      <Appshell />
      <Container>
        <Button
          onClick={() => addHandler.open()}
          mb={30}
          mt={20}
          rightIcon={<i class="fa-solid fa-plus"></i>}
          sx={{ float: "right" }}
        >
          Add{" "}
        </Button>
        <AddEditBill opened={addOpened} handler={addHandler} />
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
                <BillItem element={element} />
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default HomeScreen;
