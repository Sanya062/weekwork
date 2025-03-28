let todos = [
    { text: 'abcd', done: true },
    { text: 'efgh', done: true },
    { text: 'ijkl', done: false }
]
let newArray = [{ text: 'i5555555555', done: false }]
let editingTodo = null;
let editingTodoText = '';
function loadTodos(todos) {
    const todoListUL = document.querySelector('.todo-list')
    const arr = []
    todos.forEach(function (todo, index) {
        arr.push(
            '<li class="' + (todo.done ? 'completed' : '') + (todo === editingTodo ? 'editing' : '') + '">' +
            '<div class="view">' +
            //编辑状态隐去
            '<input data-index="' + index + '" type="checkbox" class="toggle" ' + (todo.done ? 'checked' : '') + '>' +
            //已完成状态选中与否
            '<label data-index="' + index + '">' + todo.text + '</label>' +
            //读写内容
            '<button data-index="' + index + '" class="destory">删除</button>' +
            //删除内容
            '</div>' +
            '<input class="edit" type="text" value="' + todo.text + '">' +
            //编辑内容状态
            '</li>')
    })
    todoListUL.innerHTML = arr.join('')
    const txtEdits = document.querySelectorAll('.edit')
    txtEdits.forEach(function (txtEdits) {
        txtEdits.onblur = function () {
            editTodo(this)
        }
    })
    setCompletedBtn()
}
loadTodos(todos);

function backBin(newArray) {
    const recycleBin = document.querySelector('.recycle')
    const arr1 = []
    newArray.forEach(function (todo, index) {
        arr1.push(
            '<li class="' + (todo.done ? 'completed' : '') + (todo === editingTodo ? 'editing' : '') + '">' +
            '<div class="view">' +
            //编辑状态隐去
            '<input data-index="' + index + '" type="checkbox" class="toggle" ' + (todo.done ? 'checked' : '') + '>' +
            //已完成状态选中与否
            '<label data-index="' + index + '">' + todo.text + '</label>' +
            //读写内容
            '<button data-index="' + index + '" class="restore">复原</button>' +
            //删除内容
            '</div>' +
            '<input class="edit" type="text" value="' + todo.text + '">' +
            //编辑内容状态
            '</li>')
    })
    recycleBin.innerHTML = arr1.join('')
}
backBin(newArray);


const subScribe = document.querySelector('.subscribe');
const txtNewTodo = document.querySelector('.new-todo');
txtNewTodo.onkeyup = function (e) {
    if (e.key !== 'Enter') return;
    //不为回车时不插入
    todos.unshift({
        text: this.value,
        done: false
    })
    loadTodos(todos);
    this.value = ''
}

subScribe.addEventListener('click', function () {
    todos.unshift({
        text: txtNewTodo.value,
        done: false
    });
    loadTodos(todos);
    txtNewTodo.value = '';
});

const todoListUL = document.querySelector('.todo-list');
todoListUL.onclick = function (e) {
    if (e.target.matches('.destory')) {
        //判断点击的是删除按钮
        const index = e.target.dataset.index;
        //获取当前对象的数组对应的索引
        const element = todos[index]
        newArray.push(element)
        backBin(newArray);
        todos.splice(index, 1);
        //从该数组中删除
        loadTodos(todos);
    }
    if (e.target.matches('.toggle')) {
        const index = e.target.dataset.index;
        const todo = todos[index]
        todo.done = e.target.checked;
        loadTodos(todos)
    }
    const chkCount = document.querySelectorAll('.todo-list li .toggle').length
    const chkCheckedCount = document.querySelectorAll('.todo-list li .toggle:checked').length
    chkToggleAll.checked = (chkCount === chkCheckedCount)

}
const chkToggleAll = document.querySelector('.toggle-all')
chkToggleAll.onclick = function () {
    const that = this
    todos.forEach(function (todo) {
        todo.done = that.checked
    });
    loadTodos(todos);
}

todoListUL.ondblclick = function (e) {
    if (e.target.matches('.todo-list li label')) {
        let index = e.target.dataset.index;
        editingTodo = todos[index];
        editingTodoText = editingTodo.text
        loadTodos(todos)
    }
}


todoListUL.onkeyup = function (e) {
    if (!e.target.matches('.edit')) return
    if (e.key === 'Escape') {
        editingTodo = null;
        e.target.value = editingTodoText;
        loadTodos(todos)
    }
    if (e.key == 'Enter') {
        editTodo(e.target)
    }
}

function editTodo(txt) {
    if (txt.value.length === 0) {

    } else {
        editingTodo.text = txt.value.trim();
        editingTodo = null;
        loadTodos(todos)
    }

}
const btn = document.querySelector('.clear-completed');
function setCompletedBtn() {
    const count = todos.filter(function (todo) {
        return todo.done;
    }).length;
    const btn = document.querySelector('.clear-completed')
    if (count > 0) {
        btn.style.display = ''
        //显示清除已完成项目按钮
    } else {
        btn.style.display = 'none'    //直接在行内样式修改，不会对样式表内属性修改
        //隐藏按钮
    }
}

btn.onclick = function () {

    //filter 方法会遍历数组中的每个元素，针对每个元素执行一次提供的回调函数。
    // 若回调函数返回 true，则该元素会被包含在新数组中；
    // 若返回 false，则该元素会被排除。

    newArray.unshift(...todos.filter(function (todo) {
        //将完成项设置给数组newArray
        return todo.done
    }))

    todos = todos.filter(function (todo) {

        //将未完成项设置给数组todos
        return !todo.done
    })

    loadTodos(todos)
    backBin(newArray)
    //重新将todos元素加载到页面中
}

const recycleBin = document.querySelector('.recycle')
recycleBin.onclick = function (e) {
    if (e.target.matches('.restore')) {
        //判断点击的是删除按钮
        const index = e.target.dataset.index;
        //获取当前对象的数组对应的索引
        const element = newArray[index]
        todos.push(element)
        newArray.splice(index, 1);
        //从该数组中删除
        loadTodos(todos);
        backBin(newArray)
    }
    const chkCount = document.querySelectorAll('.todo-list li .toggle').length
    const chkCheckedCount = document.querySelectorAll('.todo-list li .toggle:checked').length
    chkToggleAll.checked = (chkCount === chkCheckedCount)
}
