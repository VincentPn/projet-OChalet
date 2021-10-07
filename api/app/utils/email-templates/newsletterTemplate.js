module.exports = (user) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body style="height: 600px;">
  
    <header>
      <a href="https://ochalet-api.herokuapp.com/">O'chalet</a>
    </header>
  
    <main style="height: 100%; display:flex; flex-direction: column; justify-content: space-evenly; align-items: center;">
      <h1>Bonjour ${user.firstname} ${user.lastname}, profitez de nos offres exeptionnelles uniquement pour vous car vous etes special</h1>
      
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores magni odio sint nobis repellat veritatis architecto voluptatum cum unde dignissimos consectetur dolorum, eveniet beatae quis facilis. Molestiae tempore eveniet praesentium!</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum dolor, laudantium eligendi adipisci, ipsum odio earum consequatur, vel aut veritatis provident nostrum odit minus. Fuga autem est quam cum voluptatum.</p>
  
    </main>
  
    <footer style="line-height: 30%;">
      <p>O'chalet</p>
      <p>Mail: ochaleto@gmail.com</p>
      <p>Tel: 0178459620</p>
    </footer>
    
  </body>
  </html>
  `
}
