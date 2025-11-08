import React, { useState } from "react";
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
import {
  Search,
  KeyboardArrowDown,
  Menu,
  Close,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCart } from "./CartContext";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      className="border-b border-gray-200"
    >
      <Toolbar className="flex justify-between px-4 sm:px-6 py-3 bg-white">
        {/* ===== Left Section: Logo + Search ===== */}
        <Box className="flex items-center space-x-4 sm:space-x-8">
          {/* Logo */}
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

          {/* Search Input (hidden on small screens) */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              borderBottom: "1px solid #9ca3af",
              width: { sm: 220, md: 250 },
              height: 31,
              ml: 1,
            }}
          >
            <InputBase
              placeholder="Search"
              sx={{
                flex: 1,
                fontSize: 16,
                color: "#1f2937",
                px: 1,
                "& input": { padding: 0 },
              }}
            />
            <IconButton
              size="small"
              sx={{ color: "#6b7280", "&:hover": { color: "black" } }}
            >
              <Search fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* ===== Right Section: Navigation Buttons ===== */}
        <Box
          className="hidden md:flex items-center space-x-10"
          sx={{ alignItems: "center" }}
        >
          <Button
            color="inherit"
            component={Link}
            to="/products"
            sx={{
              textTransform: "none",
              fontSize: "0.9rem",
              "&:hover": { color: "#2563eb" },
            }}
          >
            Products
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/sell"
            sx={{
              textTransform: "none",
              "&:hover": { color: "#2563eb" },
            }}
          >
            Sell
          </Button>
          <IconButton component={Link} to="/cart" color="inherit" aria-label="cart">
            <Badge badgeContent={totalItems} color="error">
              <Button
                color="inherit"
                sx={{
                  textTransform: "none",
                  "&:hover": { color: "#2563eb" },
                }}
              >
                Cart
              </Button>
            </Badge>
          </IconButton>
          <Button
            color="inherit"
            component={Link}
            to="/account"
            sx={{
              textTransform: "none",
              "&:hover": { color: "#2563eb" },
            }}
          >
            Account
          </Button>
        </Box>

        {/* ===== Mobile Hamburger Icon ===== */}
        <Box className="flex md:hidden">
          <IconButton onClick={toggleDrawer(true)}>
            <Menu />
          </IconButton>
        </Box>
      </Toolbar>

      {/* ===== Mobile Drawer ===== */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 260, padding: 2, backgroundColor: "#fff" },
        }}
      >
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h6" fontWeight="bold">
            Menu
          </Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <Close />
          </IconButton>
        </Box>

        <List>
          {[
            { text: "Products", path: "/products" },
            { text: "Sell", path: "/sell" },
            {
              text: `Cart (${totalItems})`,
              path: "/cart",
              badge: totalItems,
            },
            { text: "Account", path: "/account" },
          ].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary={item.text} />
                {item.icon && item.icon}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
