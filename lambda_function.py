import json
import boto3
import os
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
TABLE_NAME = os.environ.get('TABLE_NAME', 'VisitorCounter')
table = dynamodb.Table(TABLE_NAME)


def lambda_handler(event, context):
    try:
        # Atomically increment the visit counter stored under a fixed id
        response = table.update_item(
            Key={'id': 'site_visits'},
            UpdateExpression='ADD visit_count :inc',
            ExpressionAttributeValues={':inc': 1},
            ReturnValues='UPDATED_NEW'
        )

        new_count = int(response['Attributes']['visit_count'])

        body = {
            'message': 'Visit recorded successfully',
            'visit_count': new_count,
            'timestamp': datetime.utcnow().isoformat()
        }

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps(body)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
