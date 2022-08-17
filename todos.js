const fs=require("fs")

class Todos{
    constructor(){
           fs.readFile("./todos.json",(err,data)=>{
             data=JSON.parse(data)
             console.log(data)
             this.todos=data
           })
           
    }

    syncTodoJson(){
   fs.writeFile("./todos.json",JSON.stringify(this.todos,null),(err)=>{
    console.log(err);
   })
    }

   getTodos(){
    return this.todos;
   }

    addTodo(task){
        let max=0
        this.todos.forEach(todo=>{
            max=Math.max(max,todo.id)
        })
         let data={
            id:max+1,
            task,
            time:new Date(),
           
         }
        this.todos.push(data)

        this.syncTodoJson()
    }


    deleteTodo(id){
        let index=null

        this.todos.forEach((todo,i)=>{
    
            if(todo.id==id){
                index=i
            }
        })

        if(index===null){
            throw new Error("Doesn't Exist")
         
        }
        this.todos.splice(index,1)

       this.syncTodoJson()
    //    fs.write(JSON.stringify(this.todos))
    
    }

    patchTodo(id,task){
        let index=null

        this.todos.forEach((todo,i)=>{
    
            if(todo.id==id){
                index=i
            }
        })
        console.log(index)
        this.todos[index].task=task
        this.syncTodoJson()
    }
}

module.exports=Todos