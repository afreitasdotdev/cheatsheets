# AWS EXPERT COMMANDS // CONCEPTS

## EXPORT AWS KEYS

export AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id --profile devops-southsystem)
export AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key --profile devops-southsystem)
