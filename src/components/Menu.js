// in src/Menu.js
import React, { createElement } from "react";
import { connect } from "react-redux";
import { MenuItemLink, getResources } from "react-admin";
import { withRouter } from "react-router-dom";

const Menu = ({ resources, onMenuClick, logout }) => (
  <div>
    {resources.map(resource => (
      <MenuItemLink
        key={resource.name}
        to={`/${resource.name}`}
        primaryText={resource.options.label || resource.name}
        onClick={onMenuClick}
      />
    ))}
    <MenuItemLink to="/balance" primaryText="Balance" onClick={onMenuClick} />
  </div>
);

const mapStateToProps = state => ({
  resources: getResources(state)
});

export default withRouter(connect(mapStateToProps)(Menu));
