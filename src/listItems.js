import React, { useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import gql from "graphql-tag";
import axios from "axios";

import names from "starwars-names";
var randomName = names.random();

const MUTATION = gql`
  mutation nuevo_cliente_insertar($nuevo_cliente: [cliente1_insert_input!]!) {
    insert_cliente1(objects: $nuevo_cliente) {
      affected_rows
    }
  }
`;

const NOTIFICATION = gql`
  mutation nuevo_notificacion($notificacion: [notificacion_insert_input!]!) {
    insert_notificacion(objects: $notificacion) {
      affected_rows
    }
  }
`;

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Used like so
var triggerCompra = ["Zara", "Don Jediondo", "Adidas kids", "Yogen Fruz", "Crepes and Waffles"];
// arr = shuffle(arr);
// console.log(arr);
// console.log(randomName);

export const MainListItems = props => {
  const [similarVenta] = useMutation(MUTATION);
  const [sendNotification] = useMutation(NOTIFICATION);

  const handleClick = useCallback(() => {
    let arr = shuffle(triggerCompra);
    axios
      .post("http://129.213.97.187:3000/nextBuy", {
        buy: arr[0]
      })
      .then(function(response) {
        similarVenta({
          variables: {
            nuevo_cliente: {
              siguiente_posible_compra: response.data.title["1"],
              ultima_compra: arr[0],
              cliente: names.random(),
              probabilidad: response.data.cosine_sim["1"],
              notificacion: response.data.cosine_sim["1"] > 0.9 ? "SMS" : ""
            }
          }
        });

        if (response.data.cosine_sim["1"] > 0.9) {
          sendNotification({
            variables: {
              notificacion: {
                notificacion: "SMS"
              }
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error);
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
