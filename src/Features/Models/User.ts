import { Reward } from "./Reward";
import { Transaction } from "./Transaction";

export class User {
    Name: string = '';
    ID: number= 0;
    Transactions: Transaction[] = [];
    Rewards: Reward[] = [];

    constructor() {
        
    }

    calculateRewards() {

        // Iterate over transactions and maintain a dictionary of Month and totalamount spend during that specific month.
        let monthlyAmountSpend: Map<number, number> = new Map<number, number>();

        for (const transactionItem of this.Transactions) {
            let pointsScored = this.getRewardPoints(transactionItem.Amount);
            let monthNumber = new Date(transactionItem.TransactionDate).getMonth() + 1;

            if (monthlyAmountSpend.has(monthNumber)) {
                let existingPoints: number | undefined  = monthlyAmountSpend.get(monthNumber);
                pointsScored +=  existingPoints === undefined ? 0 : existingPoints;
            }
            
            monthlyAmountSpend.set(monthNumber, pointsScored);     
        }

        // Perform evaulation of rewards based on the business rules.
        for (const iterator of monthlyAmountSpend.entries()) {
            this.Rewards.push({Month: iterator[0], PointsAwarded: iterator[1]})
        }
    }

    private getRewardPoints(amountSpent: number) {
        let total = 0;

        if (amountSpent > 50 && amountSpent < 100) {
            total = (amountSpent - 50) * 1; // reward a point
        }
        if (amountSpent > 100) {
            total = 50 + (amountSpent - 100) * 2; // reward 2 points above 100 and plus 50 already for crossing 100 points.
        }
        return total;
      };
}