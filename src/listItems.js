import React, { useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import gql from "graphql-tag";

import names from "starwars-names";
var randomName = names.random();

const MUTATION = gql`
  mutation nuevo_cliente_insertar($nuevo_cliente: [cliente1_insert_input!]!) {
    insert_cliente1(objects: $nuevo_cliente) {
      affected_rows
    }
  }
`;

console.log(randomName);

export const MainListItems = props => {
  const [similarVenta] = useMutation(MUTATION);
  const handleClick = useCallback(() => {
    similarVenta({
      variables: {
        nuevo_cliente: {
          siguiente_posible_compra: "Postres y Postres",
          ultima_compra: "Don Jediondo",
          cliente: "David"
        }
      }
    });
  });
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Simular Compra" />
      </ListItem>
    </div>
  );
};

export const secondaryListItems = <div></div>;
