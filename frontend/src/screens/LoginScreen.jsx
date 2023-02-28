import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Container,
    Group,
    Button,
  } from '@mantine/core';
import { useState } from 'react';
import { login } from '../network/lib/auth';
import { authStore } from '../store/authStore';
  import { ErrorNotification } from "../constants/notifications";
import { useLocation, useNavigate } from 'react-router-dom';
  export function LoginScreen() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
    const  store = authStore(s=>s)
    const signIn = async()=>{
      try {
        console.log(store)
      const { data } = await login(username,password)
        if(data.token){
          store.setToken(data.token)
          navigate('/')
        }else{
          console.log(data)
        }
      } catch (error) {
      ErrorNotification(error.message)
      }
    }
    return (
        <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" onChange={(e)=>setusername(e.target.value)} required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={(e)=>setpassword(e.target.value)} />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Anchor onClick={(event) => event.preventDefault()} href="#" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={signIn}>
            Sign in
          </Button>
        </Paper>
      </Container>
    );
  }