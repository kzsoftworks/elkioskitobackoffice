import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Title, crudGetList } from "react-admin";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const mapStateToProps = state => ({
  purchases: state.admin.resources.purchases.data,
  users: state.admin.resources.users.data,
  purchasesLoadedOnce: state.admin.resources.purchases.list.loadedOnce,
  usersLoadedOnce: state.admin.resources.users.list.loadedOnce
});
const start = moment("2011-04-15", "YYYY-MM-DD");
const end = moment("2020-11-27", "YYYY-MM-DD");
const range = moment.range(start, end).toDate();

export const Payments = connect(
  mapStateToProps,
  { crudGetList }
)(props => {
  useEffect(() => {
    props.crudGetList(
      "users",
      { page: 1, perPage: 10000 },
      { field: "name", order: "DESC" },
      {}
    );
    props.crudGetList(
      "purchases",
      { page: 1, perPage: 10000 },
      { field: "date", order: "DESC" },
      {
        "date.>": moment("2011-04-15", "YYYY-MM-DD").toDate()
      }
    );
  }, []);

  console.log(props.purchases);

  return (
    <Card>
      <Title title="Paymets" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Lizard
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          Search
        </Button>
      </CardActions>
    </Card>
  );
});
