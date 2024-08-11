import { Box } from "@mui/material"
import Navbar from "components/Navbar"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <Box height="100%" width="100%">
      <Box>
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout