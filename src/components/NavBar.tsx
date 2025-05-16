import * as React from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthData } from "../context/AuthContext";

const pages = ["Reference", "Spells", "Warbands", "Campaigns"];
const settings = [
  { page: "Profile", route: "users/profile" },
  // { page: "Dashboard", route: "users/dashboard" },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const location = useLocation();

  const { user, logout } = useAuthData();
  const nav = useNavigate();

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

  const handleNavigate = (page: string) => {
    handleCloseNavMenu();
    nav(page.toLowerCase());
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0C1F2B" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            onClick={() => {
              handleNavigate("/");
            }}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            FrostGrave
          </Typography>

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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => {
              nav("/");
            }}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            FrostGrave
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              const isActive = page === location.pathname.split("/")[1];

              return (
                <Button
                  key={page}
                  onClick={() => {
                    handleNavigate(page);
                  }}
                  sx={{
                    my: 2,
                    color: isActive ? "primary.main" : "white",
                    display: "block",
                  }}
                >
                  {page}
                </Button>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Typography>Welcome, {user.username}!</Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.username} src={user.avatar} />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Box sx={{ display: "flex" }}>
                <Button
                  onClick={() => {
                    nav("/users/login");
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Log In
                </Button>
                <Button
                  onClick={() => {
                    nav("/users/register");
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Register
                </Button>
              </Box>
            )}
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
              {!user && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>Log In</Typography>
                </MenuItem>
              )}
              {user &&
                settings.map((setting) => (
                  <MenuItem
                    key={setting.page}
                    onClick={() => {
                      nav(setting.route);
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting.page}
                    </Typography>
                  </MenuItem>
                ))}
              {user && (
                <MenuItem
                  onClick={() => {
                    logout();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>Log Out</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
