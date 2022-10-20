const express = require('express');
const path = require('path')
const app = express();
const {v4} = require('uuid')
let CONTACTS = [
	{id:v4(),name:'Dmitry',value:'12312312',marked: false},
]
app.use(express.json())
app.get('/api/contacts',(req,res)=>{
	res.status(200).json(CONTACTS);
});
app.post('/api/contacts',(req,res)=>{
	console.log(req.body);
	const contact = {...req.body, id: v4(), marked: false}
	CONTACTS.push(contact)
	res.status(201).json(contact)
})
app.delete('/api/contacts/:id',(req,res)=>{
	CONTACTS = CONTACTS.filter(c=>c.id!==req.params.id);
	res.status(200).json({message: 'Контакт удален'})
})
app.put('/api/contacts/:id',(req,res)=>{
	const idx = CONTACTS.findIndex(c=>c.id===req.params.id)
	CONTACTS[idx] = req.body;
	res.status(200).json(CONTACTS[idx])
})

app.use(express.static(path.resolve(__dirname,'client')))

app.get('*', (req,res)=>{
	res.sendFile(path.resolve(__dirname,'client','index.html'))
})

app.listen(3000,()=>console.log('Started on port 3000...'))