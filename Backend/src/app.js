import express from "express";
import cors from 'cors';

const app = express();
app.get('/',(req,res)=>{
    res.send("<h1>Home Page</h1>")
})

export { app };
