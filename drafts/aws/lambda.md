# Criar função para ligar e desligar servidores.

Acessar o recurso lambda e clicar em [criar nova função]. 

 - Criar do zero
 - Nome da função: stopEC2
 - Linguagem: Python 2.7

Criar função. 

Inserir script: 

STOP
``` 
import boto3
import sys, traceback
from datetime import datetime
from time import sleep

def stop_ec2_instances():
    start_time = datetime.now()

    # starting ec2 client
    ec2_client = boto3.client('ec2')

    regions = ec2_client.describe_regions()
    print("Teste")
    for region in regions['Regions']:
        try:
            print("Region: " + str(region['RegionName']))
            ec2_client = boto3.client('ec2', region_name=region['RegionName'])
            instances = ec2_client.describe_instances()
            instanceIds = list()
            
            for reservation in instances['Reservations']:
                for instance in reservation['Instances']:
                    if instance['State']['Name'] == "running" and not instance['Tags'] is None : 
                        for tag in instance['Tags']:
                            try:
                                if tag['Key'] == 'ScheduledStartStop' and tag['Value'] == 'True'    :
                                    instanceIds.append(instance['InstanceId'])
                            except:
                                print "Not expected error: ", traceback.print_exc()
                      
            if len(instanceIds) > 0 : 
                print "Stopping instances: " + str(instanceIds)
                ec2_client.stop_instances(InstanceIds=instanceIds, Force=False)                                                   
                                                            
        except:
            print "Not expected error:", traceback.print_exc()
                                                           
    end_time = datetime.now()
    took_time = end_time - start_time
    print "Total time of execution: " + str(took_time)    

def lambda_handler(event, context):
    print('Stopping instances... ')
    stop_ec2_instances()
```

START
```
import boto3
import sys, traceback
from datetime import datetime
from time import sleep

def start_ec2_instances():
    start_time = datetime.now()

    # starting ec2 client
    ec2_client = boto3.client('ec2')

    regions = ec2_client.describe_regions()

    for region in regions['Regions']:
        try:
            print("Region: " + str(region['RegionName']))
            ec2_client = boto3.client('ec2', region_name=region['RegionName'])
            instances = ec2_client.describe_instances()
            instanceIds = list()
            
            for reservation in instances['Reservations']:
                for instance in reservation['Instances']:
                    if instance['State']['Name'] == "stopped" and not instance['Tags'] is None : 
                        for tag in instance['Tags']:
                            try:
                                if tag['Key'] == 'ScheduledStartStop' and tag['Value'] == 'True'    :
                                    instanceIds.append(instance['InstanceId'])
                            except:
                                print "Not expected error: ", traceback.print_exc()
                      
            if len(instanceIds) > 0 : 
                print "Starting instances: " + str(instanceIds)
                ec2_client.start_instances(InstanceIds=instanceIds)                                                   
                                                            
        except:
            print "Not expected error:", traceback.print_exc()
                                                           
    end_time = datetime.now()
    took_time = end_time - start_time
    print "Total time of execution: " + str(took_time)    

def lambda_handler(event, context):
    print('Starting instances... ')
    start_ec2_instances()
```

Clicar em Implantar. 

Adicionar gatilho >> EventBrigde(CloudWatch Events) >> Criar regra

Aqui, voce deve colocar de acordo com a necessidade de agendamento. Lembre-se que, os horarios são todos em UTC.

Exemplo> 
cron(30 23 * * ? *)

Isso fará que o gatilho dispare as 23:30 PM UTC o equivalente a 20:30 BRT.

Ceder permissões ao script. Clique em [PERMISSIONAMENTO], clique no nome da função para ser redirecionado a tela do IAM.

Na tela do IAM, clique em anexar [politica]. Na tela seguinte, clique em [nova politica]. Use o construtor virtual e anexe as seguintes permissões:

```
"ec2:DescribeInstances",
"ec2:StartInstances",
"ec2:DescribeRegions",
"ec2:StopInstances
```
