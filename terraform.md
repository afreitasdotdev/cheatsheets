# Todo

Add tips and examples


data = usa recurso existente
resource = cria novo recurso

# Adicionar regra de entrada na criação da ec2

resource "aws_security_group_rule" "jenkins-port" {
  type              = "ingress"
  from_port         = 8081
  to_port           = 8081
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = var.AWS_SG_ID
}

# Create ec2 instance

resource "aws_instance" "server" {
  ami                              = var.EC2_AMI
  instance_type                    = var.EC2_TYPE
  count                            = "3"
  associate_public_ip_address      = true
  key_name                         = var.SSH_KEY
  subnet_id                        = var.AWS_SUBNET
  security_groups                  = var.AWS_SG
  
  tags          = {
    Name        = var.EC2_NAME
    Environment = var.TAG
  }


# CUSTOM INIT

terraform_v12 init -backend-config="bucket=payer-bucket" -backend-config="key=mongo-dev/terraform.tfstate" -backend-config="region=us-east-1" -backend-config="profile=payer" -force-copy
