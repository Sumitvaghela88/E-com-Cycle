import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Badge,
  ListItemText,
} from "@mui/material";

import { Search, Menu, Close, ShoppingCart } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCart } from "./CartContext";
import { AuthContext } from "../Context/authContext";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const { cart } = useCart();
  const { user, logout } = useContext(AuthContext);

  const role = user?.role;
  const firstName = user?.name?.split(" ")[0] || "User";
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleLogout = () => {
    logout();
    navigate("/customer-auth");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        borderBottom: "1px solid rgba(255,255,255,0.35)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
      elevation={0}
    >
      <Toolbar className="flex justify-between px-4 sm:px-8 py-3">
        {/* LEFT — LOGO + SEARCH */}
        <Box className="flex items-center space-x-6">
          <Link to="/">
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{
                width: { xs: "80px", md: "90px" },
                filter: "drop-shadow(0px 0px 3px rgba(0,0,0,0.2))",
                cursor: "pointer",
              }}
            />
          </Link>

          {/* DESKTOP SEARCH */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              padding: "5px 12px",
              width: 260,
              borderRadius: "12px",
              background: "rgba(255,255,255,0.35)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.45)",
            }}
          >
            <Search fontSize="small" sx={{ color: "#555" }} />
            <InputBase placeholder="Search" sx={{ ml: 1, fontSize: 15 }} />
          </Box>
        </Box>

        {/* RIGHT — DESKTOP MENU */}
        <Box className="hidden md:flex items-center space-x-8">
          {/* Home Button */}
          <Button component={Link} to="/" sx={{ textTransform: "none" }}>
            Home
          </Button>
          {/* Customer Buttons */}
          {role === "customer" && (
            <>
              <Button
                component={Link}
                to="/products"
                sx={{ textTransform: "none" }}
              >
                Products
              </Button>

              <IconButton component={Link} to="/cart">
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </>
          )}

          {/* Contact */}
          <Button component={Link} to="/contact" sx={{ textTransform: "none" }}>
            Contact
          </Button>

          {/* Admin Panel (logged in Admin) */}
          {role === "admin" && (
            <Button
              component={Link}
              to="/admin"
              sx={{
                textTransform: "none",
                px: 3,
                py: 1,
                borderRadius: "10px",
                border: "1px solid rgba(59,130,246,0.5)",
                color: "#2563eb",
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
                "&:hover": {
                  background: "rgba(59,130,246,0.1)",
                },
              }}
            >
              Admin Panel
            </Button>
          )}

          {/* Admin Login (if not logged in) */}
          {!user && (
            <Button
              component={Link}
              to="/admin-auth"
              sx={{
                textTransform: "none",
                px: 3,
                py: 1,
                borderRadius: "10px",
                border: "1px solid rgba(34,197,94,0.5)",
                color: "#15803d",
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
                "&:hover": {
                  background: "rgba(34,197,94,0.12)",
                },
              }}
            >
              Admin Login
            </Button>
          )}

          {/* Login / Logout */}
          {!user ? (
            <Button
              component={Link}
              to="/customer-auth"
              sx={{ textTransform: "none" }}
            >
              Login
            </Button>
          ) : (
            <>
              <Typography sx={{ fontWeight: 600, color: "black" }}>
                Hi, {firstName}
              </Typography>
              <Button
                onClick={handleLogout}
                sx={{ color: "red", textTransform: "none" }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>

        {/* MOBILE MENU ICON */}
        <Box className="flex md:hidden">
          <IconButton onClick={toggleDrawer(true)}>
            <Menu />
          </IconButton>
        </Box>
      </Toolbar>

      {/* DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(15px)",
          },
        }}
      >
        <Box className="flex justify-between items-center p-4">
          <Typography variant="h6" fontWeight="bold">
            Menu
          </Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <Close />
          </IconButton>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          {/* Customer buttons */}
          {role === "customer" && (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/products">
                  <ListItemText primary="Products" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/cart">
                  <ListItemText primary={`Cart (${totalItems})`} />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {/* Contact */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/contact">
              <ListItemText primary="Contact" />
            </ListItemButton>
          </ListItem>

          {/* Admin Panel */}
          {role === "admin" && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin">
                <ListItemText primary="Admin Dashboard" />
              </ListItemButton>
            </ListItem>
          )}

          {/* Admin Login */}
          {!user && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin-auth">
                <ListItemText primary="Admin Login" />
              </ListItemButton>
            </ListItem>
          )}

          {/* Login / Logout */}
          {!user ? (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/customer-auth">
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleLogout();
                  toggleDrawer(false)();
                }}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
