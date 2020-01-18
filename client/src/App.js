import React from 'react';
import './App.less'
import {useQuery,useMutation, gql} from "@apollo/client"


function App () {
  const GET = gql`
    query{
  login(name:"quang", password:"12345")
}
  `;
  const filter = {
    name: "quang",
    status: "BLOCKED"
  }
  const {data} = useQuery(GET, {
    variables: {
      data: JSON.stringify(filter),
      id: "5e21acf56485c31328c8ec8b"
    }
  })

  

  if(data) console.log(data);
 
  return (
   <div>Hello World</div>
    
  )
}
export default App