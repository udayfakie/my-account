import Action from './classes/Action.js';
import ActionManager from './classes/ActionManager.js';

let manager = new ActionManager();


function showActionTable() {
  document.getElementById('actions').innerHTML = '';
  for (let action of manager.actions) {
    document.getElementById('actions').innerHTML += ` 
    <tr class=${action.type === 'income' ? 'text-success' : 'text-danger'}
    >
    <td >${action.description}</td>
    <td>${action.amount}</td>
    <td  onclick="deleteAction(${action.id})" ><i class="fa-solid fa-trash"></i></td>
    <td onclick="updateAmount(${action.id})"><i class="fa-solid fa-pen-to-square"></i></td>
    </tr>`;
  }
  document.querySelector('.alert').innerHTML = `Balance: ${manager.balance}`;
}

window.addNewAction = () => {
  let type = document.getElementById('type').value;
  let description = document.getElementById('description').value;
  let amount = document.getElementById('amount').value;
  manager.addAction(new Action(type, description, amount));
  showActionTable();
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';

  if(description === '') {
    alert("Please fill the field")
    this.deleteAction()
  }
};

window.updateAmount = (actionId) => {
  let newAmount = prompt('Enter New Amount Please: ');
  if (newAmount == null || newAmount == '') alert('Sorry wrong input');
  else {
     manager.updateAction(actionId, +newAmount);
     showActionTable();
  }
};

window.deleteAction =(deleteId) =>{
    if(confirm("Are you sure")){
        manager.deleteAction(deleteId)
        showActionTable()
    }
}
localStorage.setItem('action',JSON.stringify())
showActionTable();
