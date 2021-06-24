import { User } from "../Models/User";

 class Load {

   public static getUsers() : User[] {
    let user1 = new User();

     user1.Name = 'User1';
     user1.ID = 1;
  user1.Transactions = [
    {
      TransactionDate: "01-01-2021",
      Amount: 120,
      CardType: 'Credit Card Visa'
    },
    {
      TransactionDate: "01-21-2021",
      Amount: 120,
      CardType: 'Credit Card Visa'
    },
    {
      TransactionDate: "02-01-2021",
      Amount: 500,
      CardType: 'Credit Card Visa'
    },
    {
      TransactionDate: "02-01-2021",
      Amount: 69,
      CardType: 'Credit Card Visa'
    }
  ];

let user2 = new User();

     user2.Name = 'User2';
     user2.ID = 2;
  user2.Transactions = [
    {
      TransactionDate: "01-01-2021",
      Amount: 120,
      CardType: 'Credit Card Visa'
    },
    {
      TransactionDate: "02-01-2021",
      Amount: 69,
      CardType: 'Credit Card Visa'
    }
  ];


return [
  user1,
  user2
];
  }


}



export default Load;
