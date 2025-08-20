export default class ActionManager {
  constructor() {
    this.actions = [];
    this.balance = 0;
    try {
      let storedActions = localStorage.getItem('actions');
      if (storedActions) {
        let parsed = JSON.parse(storedActions);
        if (Array.isArray(parsed)) {
          this.actions = parsed;
        }
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
    this.calcBalance();
  }
  addAction(action) {
    this.actions.push(action);
    this.calcBalance();
        localStorage.setItem('actions', JSON.stringify(this.actions));

  }
  deleteAction(id) {
    let indexToRemove = this.actions.findIndex((action) => {
     return action.id == id;
    });
    this.actions.splice(indexToRemove, 1);
    this.calcBalance();
    localStorage.setItem('actions', JSON.stringify(this.actions));

  }
  updateAction(id, newAmount) {
    let indexToUpdate = this.actions.findIndex((action) => action.id == id);
    this.actions[indexToUpdate].amount = newAmount;
    if (newAmount < 0) this.actions[indexToUpdate].type = 'expense';
    else this.actions[indexToUpdate].type = 'income';
    this.calcBalance();
    localStorage.setItem('actions', JSON.stringify(this.actions));

  }
  calcBalance() {
    this.balance = this.actions.reduce(
      (total, currVal) => total + currVal.amount,
      0
    );
  }
}
