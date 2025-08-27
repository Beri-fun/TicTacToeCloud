terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
}

provider "aws" {
#   region = "us-east-1"
}

resource "aws_instance" "frontend_server" {
  ami           = "ami-080e1f13689e07408"
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.security_frontend.id]
  key_name = "key_pair"
  subnet_id = aws_subnet.my_subnet.id
  associate_public_ip_address = true

  connection {
    type     = "ssh"
    user     = "ubuntu"
    private_key = file("~/Documents/key_pair.pem")
    host     = self.public_ip
  }

  provisioner "file" {
    source      = "../TicTacToe1"
    destination = "/home/ubuntu/"
  }

  provisioner "file" {
    source      = "../command.sh"
    destination = "/home/ubuntu/command.sh"
  }

  provisioner "remote-exec" {
    inline = ["echo '${aws_instance.backend_server.private_ip}' >> /home/ubuntu/backend_var.txt","sh /home/ubuntu/command.sh"]
  }

  tags = {
    Name = "FrontendAppXO"
  }
}

resource "aws_instance" "backend_server" {
  ami           = "ami-080e1f13689e07408"
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.security_backend.id]
  key_name = "key_pair"
  subnet_id = aws_subnet.my_subnet.id
  associate_public_ip_address = true

  tags = {
    Name = "BackendAppXO"
  }

  connection {
    type     = "ssh"
    user     = "ubuntu"
    private_key = file("~/Documents/key_pair.pem")
    host     = self.public_ip
  }

  provisioner "file" {
    source      = "../TicTacToe_back1"
    destination = "/home/ubuntu/"
  }

  provisioner "file" {
    source      = "../command_back.sh"
    destination = "/home/ubuntu/command_back.sh"
  }

  provisioner "remote-exec" {
    inline = ["sh /home/ubuntu/command_back.sh"]
  }
}

resource "aws_security_group" "security_frontend" {
  name        = "security_frontend"
  description = "Security group for connection to frontend"

  vpc_id = aws_vpc.my_vpc.id


  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress { 
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress { 
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "security_backend" {
  name        = "security_backend"
  description = "Security group for connection to backend"

  vpc_id = aws_vpc.my_vpc.id

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    security_groups = [aws_security_group.security_frontend.id]
    
  }
  
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress { 
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_vpc" "my_vpc" {
  cidr_block = "172.32.0.0/16"
}


resource "aws_internet_gateway" "my_igw" {
  vpc_id = aws_vpc.my_vpc.id
}

resource "aws_subnet" "my_subnet" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = "172.32.32.0/24"
}

resource "aws_route_table_association" "public_subnet_asso" {
 subnet_id      = aws_subnet.my_subnet.id
 route_table_id = aws_route_table.internet_route_table.id

}

resource "aws_route_table_association" "public_subnet_asso2" {
 subnet_id      = aws_db_subnet_group.subnet_db.id
 route_table_id = aws_route_table.internet_route_table.id

}

resource "aws_route_table" "internet_route_table" {
  vpc_id =  aws_vpc.my_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my_igw.id
  }
}

resource "aws_db_instance" "my_db" {
  allocated_storage    = 10
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  db_name              = "database-2"
  username             = "admin"
  password             = "YourPasswordHere"
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true
  db_subnet_group_name = aws_db_subnet_group.subnet_db.name


  tags = {
    Name = "RDS_DB"
  }
}

resource "aws_security_group" "security_rds_db" {
  name = "security_rds_db"

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] 
  }

  ingress {
    from_port   = 3306          
    to_port     = 3306
    protocol    = "tcp"
    security_groups = [aws_security_group.security_backend.id]

  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_subnet_group" "subnet_db" {
  name       = "rds_subnet_group"
  vpc_id     = aws_vpc.my_vpc.id
  subnet_ids = [aws_subnet.my_subnet.id]

}
