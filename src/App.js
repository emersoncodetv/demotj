import React from "react";
import Dashboard from "./Dashboard";

import { useSubscription } from "@apollo/react-hooks";

import gql from "graphql-tag";

const COMMENTS_SUBSCRIPTION = gql`
  subscription {
    cliente1 {
      cliente_id
      cliente
      fecha
      siguiente_posible_compra
      ultima_compra
    }
  }
`;

function DontReadTheComments({ repoFullName }) {
  const {
    data,
    // data: { cliente1 },
    loading
  } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: {
      // nuevo_cliente: {
      //   siguiente_posible_compra: "Postres y Postres",
      //   ultima_compra: "Don Jediondo",
      //   cliente: "David Sandoval"
      // }
    }
  });

  console.log(data);
  return !loading && <Dashboard clientes={data.cliente1} />;
}

const App = props => {
  // useSubscription(SUBSCRIPTION);

  return (
    <div>
      <DontReadTheComments />
      {/* <Dashboard /> */}
    </div>
  );
};

export default App;
