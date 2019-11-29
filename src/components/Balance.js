import React, { useEffect, useCallback, useState } from "react";
import { Title } from "react-admin";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { getFirestore } from "../api/Firebase";

const moment = extendMoment(Moment);

export const Balance = () => {
//   const previousMonth = moment().subtract("month", 1);
  const [balance, setBalance] = useState([]);

  const setUpState = useCallback(async () => {
    const { purchases, users } = await fetchData();
    setBalance(
      users.map(user => ({
        id: user.id,
        name: user.name,
        previousBalance: getPreviousBalance(user.id, purchases),
        currentBalance: getCurrentBalance(user.id, purchases),
      }))
    );

    async function fetchData() {
      const dbh = getFirestore();
      const purchasesQuerySnapshot = await dbh
        .collection("purchases")
        // .where("date", ">", previousMonth.startOf("month").toDate())
        // .where("date", "<", previousMonth.endOf("month").toDate())
        .get();
      const usersQuerySnapshot = await dbh.collection("users").get();
      return {
        purchases: purchasesQuerySnapshot.docs.map(normalizeFirebaseDoc),
        users: usersQuerySnapshot.docs.map(normalizeFirebaseDoc)
      };
    }
  }, []);

  useEffect(() => {
    setUpState();
  }, [setUpState]);

  function getPreviousBalance(userId, purchases) {
    const today = new Date();
    const thisMonth = today.getUTCMonth();
    const thisYear = today.getUTCFullYear();

    return purchases
        .filter(purchase => purchase.user_id === userId)
        .filter(purchase =>
            thisMonth === 0
                ? purchase.date.toDate().getUTCMonth() === 11 && purchase.date.toDate().getUTCFullYear() === thisYear - 1
                : purchase.date.toDate().getUTCFullYear() === thisYear && purchase.date.toDate().getUTCMonth() === thisMonth - 1
        )
        .reduce((currentValue, purchase) => currentValue + purchase.cost, 0);
  }

  function getCurrentBalance(userId, purchases) {
    const today = new Date();
    const thisMonth = today.getUTCMonth();
    const thisYear = today.getUTCFullYear();

    return purchases
        .filter(purchase => console.log(purchase) || purchase.user_id === userId)
        .filter(purchase => purchase.date.toDate().getUTCFullYear() === thisYear && purchase.date.toDate().getUTCMonth() === thisMonth)
        .reduce((currentValue, purchase) => currentValue + purchase.cost, 0);
  }

  return (
    <Card>
      <Title title="Payments" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Balances
        </Typography>
        <table className="tablita">
          <thead>
            <tr>
              <th align="left">User</th>
              <th align="right">Balance for last month</th>
              <th align="right">Balance for this month</th>
            </tr>
          </thead>
          <tbody>
            {balance.map(row => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td align="right">{row.previousBalance}</td>
                <td align="right">{row.currentBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

function normalizeFirebaseDoc(doc) {
  return { id: doc.id, ...doc.data() };
}
