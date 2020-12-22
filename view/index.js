let tabButton=[{
  tabName:"待處理", id:1
},
  {
    tabName:"封存", id:2
  },
  {tabName:"已完成", id:3
  }]

let el = document.querySelector('.tab-btn');
el.innerHTML += tabButton.map(x => `<button>${x.tabName}</button>`).join('')


let data=[]

document.getElementById('submit-btn').addEventListener('click', addData);
function addData(e){
  e.preventDefault()
  let input = document.getElementById('name').value
  let todo ={
    id:1,
    name: input,
    createTime: 1111,
    completeTime:2222
  };
  data.push(todo)
  aaa()
}

function aaa(){
  let tableData = data.map(function(value){
    return (
      `<tr>
    <td>${value.id}</td>
    <td>${value.name}</td>
    <td>${value.createTime}</td>
    <td>${value.completeTime}</td>
    <td><button class="fancy-btn">編輯</>
    <button class="fancy-btn">完成</>
    <button class="fancy-btn">刪除</></td>
</tr>`
    );
  }).join('');
  let els = document.querySelector(".content-list");
  els.innerHTML = tableData;
}

