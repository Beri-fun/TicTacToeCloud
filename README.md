# TicTacToe

The repository contains the project which I did for my university's classes.

The app is ready to be used in cloud - ready to deploy using the terrafom and AWS 

or you can use it locally using docker.

## TicTacToeCloud

In main.tf file there are all information needed to deploy the TicTacToe app to the cloud to play with another person online.
The terraform file contians commend to build: two instances of EC2 machines, database, security groups with ports, a virtual private cloud, a subnet for the instances, an internet gateway and a routing table.

The private_key.pem file is needed to log in via SSH to the machine that Terraform creates.

Now the network traffic is set to accept all ip adresses in and out. To make it more secure before deployment you can set your own range.

### How to start app
It was run on Ubuntu 22.04.

You need an account on AWS cloud, installed docker and terraform.

```
$ \path\to\this\repo terraform apply
```

After a successfull deployment the new ip adres will be set to the TicTacToe app and you will be able to start playing the game.


## TicTacToeLocal

This app allows to play Tic Tac Toe game locally on the same computer with another person. This solution is using docker.

### How to start app
It was run on Ubuntu 22.04.

Install Docker.
Go to the folder with this repository and run:
```
$ \path\to\this\repo> docker compose up
```

This command will build the docker images and run apps.

Then go to http://localhost:8000 in your browser and start using the app.
Next player can join using the same url and selecting different name.

## Gallery

<img width="1851" height="938" alt="1_kopia" src="https://github.com/user-attachments/assets/a3db4838-2464-4ab8-a678-64990b9dad12" />
<img width="1851" height="938" alt="image" src="https://github.com/user-attachments/assets/257a38d5-32a5-47ad-96c0-32b574c7e9bf" />
<img width="1851" height="938" alt="image" src="https://github.com/user-attachments/assets/77695c69-a7ac-4737-bf6b-991fc353cb98" />
<img width="1851" height="938" alt="image" src="https://github.com/user-attachments/assets/60032941-82ac-4842-84b0-645827fa1d76" />



