import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 0px 5px grey",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export function Appshell() {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const setToken = authStore(s => s.setToken)
  const location = window.location.pathname;
  const navigate = useNavigate()
  const logout = () => {
    setToken(null)
    localStorage.removeItem("demo_erp_token")
    navigate("/login")
  }
  return (
    location != "/login" && (
      <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={10}>
        <Container className={classes.inner} fluid>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
            {/* <MantineLogo size={28} /> company logo */}
          </Group>
          <Group spacing={5} position="center">
            <Text className={classes.link}>Hello</Text>
            <Text className={classes.link}>Hello</Text>
            <Menu shadow="md" width={200} trigger="hover">
              <Menu.Target>
                <Text>
                  Toggle menu <i class="fa-solid fa-chevron-down"></i>
                </Text>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item>Settings</Menu.Item>
                <Menu.Item>Messages</Menu.Item>
                <Menu.Item>Gallery</Menu.Item>
                <Menu.Item
                  rightSection={
                    <Text size="xs" color="dimmed">
                      ⌘K
                    </Text>
                  }
                >
                  Search
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item>Transfer my data</Menu.Item>
                <Menu.Item color="red">Delete my account</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Button color={'red'} sx={{ float: 'right' }} onClick={logout}>Logout</Button>
          </Group>
        </Container>
      </Header>
    )
  );
}
