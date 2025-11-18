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
import { Search, Menu, Close } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCart } from "./CartContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const { cart } = useCart();
  const { user, logout } = useContext(AuthContext);

  // FIXED: derive role from user safely
  const role = user?.role;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleLogout = () => {
    logout();
    navigate("/customer-auth");
  };

  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <AppBar
      position="realative"
      color="default"
      elevation={0}
      className="border-b border-gray-200"
    >
      <Toolbar className="flex justify-between px-4 sm:px-6 py-3 bg-white">
        
        {/* LEFT — Logo + Search */}
        <Box className="flex items-center space-x-4 sm:space-x-8">
          <Link to="/">
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{
                width: { xs: "70px", md: "80px" },
                height: { xs: "28px", md: "32px" },
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
          </Link>

          {/* Search (Desktop only) */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              borderBottom: "1px solid #9ca3af",
              width: { sm: 220, md: 250 },
              height: 31,
            }}
          >
            <InputBase placeholder="Search" sx={{ flex: 1, px: 1, fontSize: 16 }} />
            <IconButton size="small" sx={{ color: "#6b7280" }}>
              <Search fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* RIGHT — Desktop Navigation */}
        <Box className="hidden md:flex items-center space-x-10">

          {/* Customer Only Buttons */}
          {role === "customer" && (
            <>
              <Button component={Link} to="/products" sx={{ textTransform: "none" }}>
                Products
              </Button>

              <IconButton component={Link} to="/cart" aria-label="cart">
                <Badge badgeContent={totalItems} color="error">
                  <Button sx={{ textTransform: "none" }}>Cart</Button>
                </Badge>
              </IconButton>
            </>
          )}

          {/* Admin Panel */}
          {role === "admin" && (
            <Button
              component={Link}
              to="/admin"
              sx={{ textTransform: "none", color: "#2563eb" }}
            >
              Admin Panel
            </Button>
          )}

          {/* Admin Login (only if NOT logged in) */}
          {!user && (
            <Link to="/admin-auth">
              <button className="px-4 py-2 bg-green-400 text-white rounded-lg">
                Admin Login
              </button>
            </Link>
          )}

          {/* Login / Logout */}
          {!user ? (
            <Button component={Link} to="/customer-auth" sx={{ textTransform: "none" }}>
              Login
            </Button>
          ) : (
            <>
              <Typography sx={{ fontWeight: 600 }}>Hi, {firstName}</Typography>
              <Button onClick={handleLogout} sx={{ textTransform: "none", color: "red" }}>
                Logout
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu Icon */}
        <Box className="flex md:hidden">
          <IconButton onClick={toggleDrawer(true)}>
            <Menu />
          </IconButton>
        </Box>
      </Toolbar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { width: 260, padding: 2, backgroundColor: "#fff" } }}
      >
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h6" fontWeight="bold">Menu</Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <Close />
          </IconButton>
        </Box>

        <List>
          {/* Customer Only */}
          {role === "customer" && (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/products" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Products" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/cart" onClick={toggleDrawer(false)}>
                  <ListItemText primary={`Cart (${totalItems})`} />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {/* Admin Only */}
          {role === "admin" && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin" onClick={toggleDrawer(false)}>
                <ListItemText primary="Admin Dashboard" />
              </ListItemButton>
            </ListItem>
          )}

          {/* Admin Login (if not logged in) */}
          {!user && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin-auth" onClick={toggleDrawer(false)}>
                <ListItemText primary="Admin Login" />
              </ListItemButton>
            </ListItem>
          )}

          {/* Login / Logout */}
          {!user ? (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/customer-auth" onClick={toggleDrawer(false)}>
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
