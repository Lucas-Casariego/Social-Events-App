import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useStore } from "../stores/store";
import { NavLink } from "react-router-dom";
import { useState } from "react";


const pages = ["Activities", "Create Activity"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavBar() {

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* we supply our styles as an object, so we open additional curly brackets outside the object, in the object we specify the properties */}
          <img
            src="/assets/logo.png"
            className="logo"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Typography
              className="logo"
              variant="h6"
              noWrap
              width={200}
              sx={{
                mr: 2,
                ml: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Reactivities
            </Typography>
          </NavLink>
          {/* Box: hamburger bar */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
              </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  component={NavLink}
                  to="/activities"
                  style={{ textDecoration: "none", color: "#212427" }}
                >
                  Activities
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  component={NavLink}
                  to="/createActivity"
                  style={{ textDecoration: "none", color: "#212427" }}
                >
                  Create Activity
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* Box: list of link in navbar (activities, Create Activity) */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavLink to="/activities" style={{ textDecoration: "none" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Activities
              </Button>
            </NavLink>
            <NavLink to="/createActivity" style={{ textDecoration: "none" }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => {
                  handleCloseNavMenu();
                }}
              >
                Create Activity
              </Button>
            </NavLink>
            <NavLink to="/errors" style={{ textDecoration: "none" }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => {
                  handleCloseNavMenu();
                }}
              >
                Errors
              </Button>
            </NavLink>
          </Box>
          {/* Box: user avatar (open settings) */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user image" src="/assets/user.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
