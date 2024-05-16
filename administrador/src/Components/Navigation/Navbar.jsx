import React, { useState } from "react";
import "./css/Navbar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { BsCheckCircle, BsClockHistory, BsPeople } from "react-icons/bs"; // Íconos de react-icons/bs
import Dropdown from 'react-bootstrap/Dropdown';
import logo from "../../assets/img/logoAguida.png";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div style={{ backgroundColor: '#faf74500'}}>
      <Navbar className="navbar-custom" style={{backgroundColor: '#FAF845',  border: '2px solid #ffffff', borderRadius: '15%'}}>
        <Container>
          <IconButton onClick={toggleDrawer(true)} aria-label="menu" >
            <MenuIcon style={{ color: '#000000', fontSize: '3rem', margin:'-5px'}} /> {/* Color blanco */}
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <DrawerList />
          </Drawer>
        </Container>
      </Navbar>
    </div>
  );
}

function DrawerList() {
  const drawerItems = [
    { text: "Inicio", href: "/home", icon: <BsClockHistory /> },
    { text: "Usuarios", href: "/", icon: <BsPeople /> },
    { text: "Auditorias", icon: <BsCheckCircle />, subItems: [
        { text: "Generar auditoria", href: "/" },
        { text: "Revicion de auditoria", href: "/" },
        { text: "Auditorias terminadas", href: "/" }
      ] }
  ];

  return (
    <Box sx={{ width: 250, height: '100%', backgroundColor: '#FAF845' }} role="presentation">
      <List>
      <img src={logo} alt="Logo Empresa" style={{ margin: 'auto', height: '20%', width: '204px', display: 'block', borderRadius: '10px' }} />
        {drawerItems.map((item, index) => (
          <div key={index}>
            {item.subItems ? (
              <Dropdown>
                <Dropdown.Toggle variant="transparent" style={{ border: 'none', background: 'transparent', color: '#ffffff' }}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <span className="icono-lista" style={{ color: '#000000' }}>{item.icon}</span>
                      <ListItemText primary={item.text} style={{ color: '#000000' }} />
                    </ListItemButton>
                  </ListItem>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {item.subItems.map((subItem, subIndex) => (
                    <Dropdown.Item href={subItem.href} key={subIndex}>
                      {subItem.text}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <ListItem disablePadding>
                <ListItemButton component="a" href={item.href}>
                  <span className="icono-lista" style={{ color: '#000000' }}>{item.icon}</span>
                  <ListItemText primary={item.text} style={{ color: '#000000' }} />
                </ListItemButton>
              </ListItem>
            )}
          </div>
        ))}
      </List>
    </Box>
  );
}
