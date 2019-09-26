import React, { useEffect, useCallback, useState } from "react";
import { Title } from "react-admin";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Moment from "moment";
import ReactDataGrid from "react-data-grid";
import { extendMoment } from "moment-range";
import { getFirestore } from "../api/Firebase";

console.log(ReactDataGrid);

const moment = extendMoment(Moment);

export const Balance = () => {
  const previousMonth = moment().subtract("month", 1);
  const [balance, setBalance] = useState([]);

  const setUpState = useCallback(async () => {
    const { purchases, users } = await fetchData();
    setBalance(
      users.map(user => ({
        is: user.id,
        name: user.name,
        balance: getBalance(user.id, purchases)
      }))
    );

    async function fetchData() {
      const dbh = getFirestore();
      const purchasesQuerySnapshot = await dbh
        .collection("purchases")
        .where("date", ">", previousMonth.startOf("month").toDate())
        .where("date", "<", previousMonth.endOf("month").toDate())
        .get();
      const usersQuerySnapshot = await dbh.collection("users").get();
      return {
        purchases: purchasesQuerySnapshot.docs.map(normalizeFirebaseDoc),
        users: usersQuerySnapshot.docs.map(normalizeFirebaseDoc)
      };
    }
  }, [previousMonth]);

  useEffect(() => {
    setUpState();
  }, [setUpState]);

  function getBalance(userId, purchases) {
    return purchases
      .filter(purchase => purchase.user_id === userId)
      .reduce((currentValue, purchase) => currentValue + purchase.cost, 0);
  }

  return (
    <Card>
      <Title title="Paymets" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Blanace for {previousMonth.format("MMMM")}
        </Typography>
        <ReactDataGrid
          columns={[
            {
              key: "name",
              name: "User"
            },
            {
              key: "balance",
              name: "Balance"
            }
          ]}
          rowGetter={i => balance[i]}
          rowCount={balance.length}
          minHeight={150}
        />
      </CardContent>
    </Card>
  );
};

function normalizeFirebaseDoc(doc) {
  return { id: doc.id, ...doc.data() };
}
