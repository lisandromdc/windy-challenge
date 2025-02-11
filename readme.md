# Windy Challenge
This repository is separated in backend and frontend folders.

In order to make the full app work I recommend
- Follow Database installation steps
- Run api server (and keep it open)
- Run websocket server (and keep it open)
- Run frontend server (and keep it open)

Evaluation
- Go to http://localhost:5173/menu to start
- Test the api on it's own using Postman (import file is located in backend/testing directory)
- You can use this endpoint to test the live update with websockets:
  PUT '{{server}}/orders/updateStatus/{{orderId}}'
