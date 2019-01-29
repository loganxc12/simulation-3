import React from "react";
import { withRouter, NavLink } from "react-router-dom";

function Nav(props) {
     const { pathname } = props.location;
     console.log(pathname);
     return pathname !== "/" ? (
          <div>
               <NavLink to="/dashboard" activeClassName="selected"><button>Home</button></NavLink>
               <NavLink to="/new" activeClassName="selected"><button>New Post</button></NavLink>
               <NavLink to="/" activeClassName="selected" exact><button>Logout</button></NavLink>
          </div>
     ) : null;
}

export default withRouter(Nav);