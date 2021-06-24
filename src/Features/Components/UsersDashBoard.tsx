import React from "react";
import { User } from "../Models/User";
import Months from "../Constants/CalendarMonths";
import { Reward } from "../Models/Reward";
import Load from "../MockData/UserTransactions";
import { Transaction } from "../Models/Transaction";
import "./UsersDashBoard.css";

type stateType = {
  Users: User[];
  ShowRewards: boolean;
  ShowTransactions: boolean;
};

class UsersDashBoard extends React.Component<{}, stateType> {
  constructor(props: any) {
    super(props);
    this.state = { Users: [], ShowRewards: false, ShowTransactions: false };
    this.loadUsers = this.loadUsers.bind(this);
    this.loadRewards = this.loadRewards.bind(this);
  }

  loadUsers = () => {
    let UserTransactions = Load.getUsers();

    this.setState({
      Users: UserTransactions,
      ShowTransactions: !this.state.ShowTransactions,
      ShowRewards: false,
    });
  };

  loadRewards = () => {
    let UserTransactions = Load.getUsers();

    UserTransactions.forEach((x) => {
      x.calculateRewards();
    });

    this.setState({
      Users: UserTransactions,
      ShowRewards: !this.state.ShowRewards,
    });
  };

  private renderTransaction = (transaction: Transaction) => {
    return (
      <React.Fragment>
        <div>{`Transaction performed on ${transaction.TransactionDate} - amount ${transaction.Amount}`}</div>
      </React.Fragment>
    );
  };

  private renderRewards = (reward: Reward) => {
    let monthName = Months[reward.Month - 1];
    return (
      <React.Fragment>
        <div>{`Reward points earned for the month of ${monthName} - ${reward.PointsAwarded}`}</div>
      </React.Fragment>
    );
  };

  public render() {
    return (
      <React.Fragment>
        <div className="title">Welcome!!!</div>
        <div>User Transactions and Rewards Dashboard</div>

        <div>
          <button onClick={this.loadUsers}> Load user transactions </button>
        </div>

        {this.state.Users.length > 0 && this.state.ShowTransactions && (
          <React.Fragment>
            <div className="title">Users and Transactions summary</div>
            <div className="transactions">
              {this.state.Users.map((u) => {
                return (
                  <div>
                    <div className="title">{`Transactions for userID ${u.ID}`}</div>
                    {u.Transactions.map((t) => {
                      return this.renderTransaction(t);
                    })}
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        )}

        <div>
          <button onClick={this.loadRewards}> Load user rewards </button>
        </div>

        {this.state.Users.length > 0 && this.state.ShowRewards && (
          <React.Fragment>
            <div className="title">Users and Rewards summary</div>
            <div className="rewards">
              {this.state.Users.map((u) => {
                return (
                  <div>
                    <div className="title">{`Monthly Total rewards for userID ${u.ID}`}</div>
                    {u.Rewards.map((r) => {
                      return this.renderRewards(r);
                    })}
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default UsersDashBoard;
