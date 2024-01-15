import express from "express";
import bodyParser from "body-parser";

function Blog(n,c) {
    this.name = n,
    this.content = c,
    this.date = currentDate
  }

function getCurrentDate() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();

  return `${day} ${month} ${year}  ${hour}:${minute}`;
}

const app = express();
const port = 3000;
var blogArray = [];
const currentDate = getCurrentDate();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  if(blogArray.length > 0){
    res.render("home.ejs",{
      blogBody : blogArray,
      numberOfblogs : blogArray.length
    })
  }else{
    res.render("index.ejs");
  }
  
});

app.post("/submit",(req,res)=>{
    blogArray.push(new Blog(req.body.name,req.body.content))
    res.render("home.ejs",{
      blogBody : blogArray,
      numberOfblogs : blogArray.length
    })
})

app.post("/delete",(req,res)=>{
  console.log(req.body.buttonClass);
  blogArray.splice(req.body.buttonClass,1)
  res.render("home.ejs",{
    blogBody : blogArray,
    numberOfblogs : blogArray.length
  })

})

app.post("/editStart",(req,res)=>{
  console.log(req.body.buttonClass);
  let blogId = req.body.buttonClass;
  res.render("edit.ejs",{
    blogBody : blogArray[blogId],
    blogId : blogId
  })

})

app.post("/editEnd",(req,res)=>{
  console.log(req.body);
  blogArray[req.body.buttonClass].name = req.body.name;
  blogArray[req.body.buttonClass].content = req.body.content;
  res.render("home.ejs",{
    blogBody : blogArray,
    numberOfblogs : blogArray.length
  })
})

app.post("/viewBlog",(req,res)=>{
  res.render("viewblog.ejs",{
    blogBody : blogArray[req.body.buttonClass]
  })
  console.log(req.body.buttonClass);


})

app.post("/home",(req,res) =>{
  res.render("home.ejs",{
    blogBody : blogArray,
    numberOfblogs : blogArray.length
  })
})


app.listen(port,function (){
    console.log(`listneing on ${port}.`)
})