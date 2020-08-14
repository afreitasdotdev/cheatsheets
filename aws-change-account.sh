#!/bin/bash

while [ "$1" != "" ]; do
    case $1 in
        payer )
            echo "
            export AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id --profile payer)
            export AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key --profile payer)
	    terraform init -backend-config="bucket=payer-bucket" -backend-config="key=payer-eks-nlb" -backend-config="region=us-east-1" -backend-config="profile=payer" -force-copy
            "
            exit
        ;;
        devops )
            export AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id --profile devops-southsystem)
            export AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key --profile devops-southsystem)

            exit
        ;;
        south )
            export AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id --profile southsystem)
            export AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key --profile southsystem)
            exit
        ;;
    esac
    shift
done
