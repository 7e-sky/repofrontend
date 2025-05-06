import React from "react";
import { AppBar, Hidden, Toolbar } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import clsx from "clsx";
import NavbarMobileToggleButton from "app/fuse-layouts/shared-components/NavbarMobileToggleButton";
import LogoPortail from "app/fuse-layouts/shared-components/LogoPortail";
import { useSelector } from "react-redux";
import UserMenu from "app/fuse-layouts/shared-components/UserMenu";
import history from "@history";
import Search from "../../../main/portail/Search/Search";
import PSecteurs from "app/fuse-layouts/shared-components/PSecteurs";
const useStyles = makeStyles((theme) => ({
  separator: {
    width: 1,
    height: 64,
    backgroundColor: theme.palette.divider,
  },
}));

function ToolbarLayout3(props) {
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const toolbarTheme = useSelector(({ fuse }) => fuse.settings.toolbarTheme);
  const classes = useStyles(props);
  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
        <Toolbar className="container p-0 lg:px-24">
          {config.navbar.display && (
            <Hidden lgUp>
              <NavbarMobileToggleButton className="w-64 h-64 p-0" />
              <div className={classes.separator} />
            </Hidden>
          )}

          <Hidden mdDown>
            <div className={clsx("flex flex-shrink-0 items-center")}>
              <LogoPortail />
            </div>
          </Hidden>
          <div className="flex flex-shrink items-center">
            <PSecteurs />
          </div>
            <Hidden mdDown>
          <Typography className="uppercase font-bold ml-24"color="primary">
          <a
                href="https://www.boopursal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-button"
              >
                <img src="assets/images/logos/icon.png" alt="Boopursal" style={{ height: '20px', marginRight: '8px' }} />
                <span>Boopursal</span>
              </a>
            
          

          </Typography>
          </Hidden>

          <div className="flex flex-1">
            <Hidden xsDown>
              {history.location && history.location.pathname === "/" ? (
                ""
              ) : (
                <Search className="mx-16 lg:mx-24" variant="basic" />
              )}
            </Hidden>
          </div>

          <div className="flex">
            <Hidden smUp>
              {history.location && history.location.pathname === "/" ? (
                ""
              ) : (
                <Search />
              )}

              <div className={classes.separator} />
            </Hidden>
            <UserMenu />

            <Hidden mdDown>
              <div className={classes.separator} />
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default ToolbarLayout3;
