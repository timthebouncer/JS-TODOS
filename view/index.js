function formatDate(d){
  let HH = d.getHours()+'';
  let mm = d.getMinutes()+'';
  let ss = d.getSeconds()+'';

  return HH.padStart(2, '0') + ":" + mm.padStart(2, '0') + ":" + ss.padStart(2, '0');
}

function hideButton(){
  const editBtn = document.querySelectorAll('.edit-btn')
  editBtn.forEach(item=>item.classList.add('vanish'))
  const completeBtn = document.querySelectorAll('.complete-btn')
  completeBtn.forEach(item=>item.classList.add('vanish'))
}

;(() => {
  let tabButton = [{
    tabName: "待處理", id: 1
  },
    {
      tabName: "封存", id: 2
    },
    {
      tabName: "已完成", id: 3
    }]

  let el = document.querySelector('.tab-btn-wrapper');
  el.innerHTML += tabButton.map(x => `<button class="tab-btn">${x.tabName}</button>`).join('')
  el.addEventListener('click', (ev) => {
    const i = [...el.children].findIndex(e => e === ev.target)

    switch (i){
      case 0:
        document.querySelector('.table-wrapper-operation').classList.remove('vanish')
        Todo(data.filter(item => item.status === true && item.finish === false))

      break;
      case 1:
        document.querySelector('.table-wrapper-operation').classList.add('vanish')
        Todo(data.filter(item => item.status === false))

        //隱藏編輯及完成按鈕
        hideButton()
        //在刪除按鈕前新增還原按鈕
        const refNode = document.querySelectorAll('.deleteBtn')

        const allBtn = document.querySelectorAll('.all-btn')
       ;[...allBtn].forEach((item, i)=> {
        const newBtn = document.createElement("button")
        newBtn.addEventListener('click',(e)=>{
          alert(313)
        })
        newBtn.innerHTML = "還原"
        item.insertBefore(newBtn, refNode[i])
      })

        break;

      case 2:
        document.querySelector('.table-wrapper-operation').classList.add('vanish')
        Todo(data.filter(item => item.finish === true))
        const tr = document.querySelectorAll('.table-content')
        tr.forEach(item => item.classList.add('finishLine'))
        hideButton()

        const refNodes = document.querySelectorAll('.deleteBtn')

        const allBtns = document.querySelectorAll('.all-btn')
        ;[...allBtns].forEach((item, i)=> {
        const newBtn = document.createElement("button")
        newBtn.addEventListener('click', (e) => {

         const cancel = data.findIndex((item,index)=> item.id === data[index].id)
          console.log(cancel)

            data[cancel].finish=false
            document.querySelector('.table-content').remove()
          // data.forEach((item,index)=> {
          //   if(i === index){
          //   console.log(item, i , index)
          //   item.finish = false
          // }
          // })
        })
        newBtn.innerHTML = "取消"
        item.insertBefore(newBtn, refNodes[i])
      })

        break;
    }

  })



  let data = [];
  let id = 1;
////新增
  document.getElementById('submit-btn').addEventListener('click', addData);
  function addData(e) {
    e.preventDefault()
    let input = document.getElementById('name').value
    if(input === ""){
      alert("請輸入代辦事項")
    }else {
      let todo = {
        id: id++,
        name: input,
        createTime: new Date(),
        completeTime: 2222,
        status: true,
        finish:false
      };
      data.push(todo)
      Todo(data.filter(item => item.status === true && item.finish === false))
      document.getElementById('name').value = ""
    }
  }

  function Todo(data) {

    const els = document.querySelector(".content-list");
    //切片(緩存---性能較好)
    const fragment = document.createDocumentFragment()
    data.forEach((value, index) => {
      const tr = document.createElement('tr')
      tr.classList.add('table-content')

      tr.innerHTML =
        `<td>${value.id}</td>
          <td class="editName">${value.name}</td>
          <td>${formatDate(value.createTime)}</td>
          <td>${value.completeTime}</td>
          <td class="all-btn">
          <button class="edit-btn">編輯</>
          <button class="complete-btn">完成</>
          <button class="deleteBtn">刪除</>
          </td>`

        //編輯
      tr.querySelector('.edit-btn').addEventListener('click',editData);
      function editData(){
        const edit = tr.querySelector('.editName').innerHTML = "<input class='enter' />"
        if(edit){
          tr.querySelector('.enter').addEventListener('keydown',function(e){
            if(e.key === "Enter"){
              tr.querySelector('.editName').innerHTML = "<td class='editName' />"
              tr.querySelector('.editName').innerText = e.target.value
            }
          })
        }
      }

      //完成
      tr.querySelector('.complete-btn').addEventListener('click',completeBtn)
      function completeBtn(){

        const finish  = data.findIndex(item => {
          return item.id === value.id
        })
        console.log(~finish)
        if(~finish){
          data.map(item=>{
            item.finish = true
          })
          els.removeChild(tr)
        }
      }

      //封存
      tr.querySelector('.deleteBtn').addEventListener('click', (e) => {

        let deleteId = data.findIndex(item => {
         return item.id === value.id

        })
        if(~deleteId){
          data.map(item => {
            item.status = false
          })
          els.removeChild(tr)
        }
        // data = [...data]
      })


      //刪除
      // tr.querySelector('.deleteBtn').addEventListener('click', (e) => {
      //
      //   els.removeChild(tr)
      //   let deleteId = data.findIndex(item=>{
      //     return item.id === value.id
      //   })
      //   if(~deleteId){
      //     data.splice(deleteId,1)
      //   }
      // })


      fragment.append(tr)
    })
    els.innerHTML = "";
    els.append(fragment)
  }
})()



//Frank解法

// (() => {
//   let tabButton = [{
//     tabName: "待處理", id: 1
//   },
//     {
//       tabName: "封存", id: 2
//     },
//     {
//       tabName: "已完成", id: 3
//     }]
//
//   let el = document.querySelector('.tab-btn');
//   el.innerHTML += tabButton.map(x => `<button>${x.tabName}</button>`).join('')
//
//
//   let data = []
// ////新增
//   document.getElementById('submit-btn').addEventListener('click', addData);
//
//   function addData(e) {
//     e.preventDefault()
//     let input = document.getElementById('name').value
//     let todo = {
//       id: 1,
//       name: input,
//       createTime: 1111,
//       completeTime: 2222
//     };
//     data.push(todo)
//     aaa()
//     document.getElementById('name').value = ""
//   }
//
//   function aaa() {
//     const els = document.querySelector(".content-list");
//     //切片(緩存---性能較好)
//     const fragment = document.createDocumentFragment()
//     data.forEach((value, index) => {
//       const random = Math.random()
//       return ((i, r) => {
//         const tr = document.createElement('tr')
//         tr.innerHTML =
//           `<td>${value.id}</td>
//             <td>${value.name}</td>
//             <td>${value.createTime}</td>
//             <td>${value.completeTime}</td>
//             <td>
//             <button class="edit-btn">編輯</>
//             <button class="complete-btn">完成</>
//             <button class="deleteBtn">刪除</>
//             </td>`
//         console.log(value._r)
//         value._r = r
//         ////刪除
//         tr.querySelector('.deleteBtn').addEventListener('click', () => {
//           els.removeChild(tr)
//           data.splice(data.findIndex(e => e._r === r), 1)
//         })
//         fragment.append(tr)
//       })(index, random)
//     })
//     els.innerHTML = "";
//     els.append(fragment)
//   }
// })()

//另一種寫法
// const item = e.target
// if(item.classList[0] === 'deleteBtn' ){
//   const todo = item.parentElement;
//   todo.classList.add('fall')
//   addEventListener('transitionend',function (){
//     todo.remove()
//   })
// }














































































