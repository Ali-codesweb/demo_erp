import { ActionIcon, Box, Button, Container, Group, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddEditBill from "../components/AddEditBill";
import { Appshell } from "../components/Appshell";
import BillItem from "../components/BillItem";
import { getBills } from "../network/lib/bill";
import { authStore } from "../store/authStore";

function HomeScreen() {
  const [addOpened, addHandler] = useDisclosure(false);
  const state = authStore(s=>s)
  const [bills, setbills] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("demo_erp_token")
    console.log(token)
    console.log(state.token)
    if(!token && !state.token){
      navigate('/login')
      return
    }
    getBills().then((e) => setbills(e.data.data));
  }, [addOpened,state.token]);

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
