

const express=require("express")
// import { nanoid } from "nanoid"
// const todo_id=nanoid()
const app=express()

const Todos=require("./todos")

const PORT=8000

app.use(express.json())

const todos=new Todos()

// let todos=[]

app.get("/",(req,res)=>{
    res.send("YOu are on home page")
})
app.get("/todos",(req,res)=>{

   return res.send({
        todos:todos.getTodos()
    })
})
app.post("/add_todo",(req,res)=>{

    try{
    const {task}=req.body
    // const {task}=todo;
    //  console.log(task)
    todos.addTodo(task)
   return res.send("todo added")
    }
    catch(err){
        return res.send("something wrong")
    }
})
app.delete("/todo/:id",(req,res)=>{

    let {id}=req.params
    id=parseInt(id)
  try{

    todos.deleteTodo(id)
  }
   catch(err){
    return res.send("Todo not found")
   }
 
 return res.send("Item deleted successfully")

    
})

app.patch("/todos/:id",(req,res)=>{

    let {id}=req.params
    let {task}=req.body
    console.log(task)
    todos.patchTodo(id,task)
    
    return res.send("updated")

})


app.listen(PORT,()=>{
    console.log(`listening to the port ${PORT}`)
})