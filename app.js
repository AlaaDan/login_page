import express, { request, response } from 'express';
const app = express();
const PORT = 8000;

app.use(express.json())

const users = [
    {
        name: 'Alaa',
        email: 'audio-net@hotmail.com',
        password: '264778'
    }
];

app.get('/', (request, response) =>{
    response.json(users)
    
});

app.get('/api/signup', (request, response)=>{
    response.send("<h1>Welcome to signup page </h1>")

})

app.get('/api/login', (request, response)=>{
    response.send("<h1>Welcome to login page </h1>")

})
app.post('/api/signup', (request, response)=>{
    const usersobj = request.body;
    
    const results = {
        success: true,
        usernameExists: false,
        emailExists: false
    }
    if (usersobj.hasOwnProperty('name') &&
        usersobj.hasOwnProperty('email') &&
        usersobj.hasOwnProperty('password')){
            users.forEach(user =>{
                if (user.name === usersobj.name){
                    results.success = false
                    results.usernameExists = true
                    console.log(`The user ${user.name} already exests`)
                }
                if(user.email === usersobj.email){
                    results.success = false
                    results.emailExists = true
                    console.log(`The email ${user.email} already exests`)

                }

            })
        }
    else{
        users.push(usersobj)
    }
    response.json(results)  

});

app.post('/api/login', (request, response)=>{
    const usersobj = request.body;
    
    const results = {
        success: false,
        usernameExists: '',
    }
    if (usersobj.hasOwnProperty('name') &&
        usersobj.hasOwnProperty('password')){
            users.forEach(user =>{
                if (user.name === usersobj.name &&
                    user.password === usersobj.password){
                    results.success = true
                    results.usernameExists = user.name
                }
            })
        }
    response.json(results)
})




app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT} started!`)
})