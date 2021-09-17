# Documentation

## AWS Services used

1. ECR
2. ECS
3. SES
4. CloudFormation
5. CloudWatch
6. EC2
7. S3
8. AWS Cloud9

## API endpoint

## Rebuild services

1. Go to IAM Management , then go to Roles under Access management section
2. Go to aws-elasticbeanstalk-service-role

Make sure it has these polices:

- AutoScalingFullAccess
- ElasticLoadBalancingFullAccess
- AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy
- AWSElasticBeanstalkEnhancedHealth
- AdministratorAccess-AWSElasticBeanstalk

3. Go to SES , add digitalmarketplace.sales@gmail.com as verified email ( Under Identity Management, go to Email Addresses and click verify a new email address)

Note: for verification, access this email account

- Email: digitalmarketplace.sales@gmail.com
- Password: ZfdSFNPnEXgC2aH
