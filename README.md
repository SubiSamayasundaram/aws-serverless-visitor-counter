# Serverless Visitor Counter

A simple serverless web application built using AWS services. The project demonstrates how a static website hosted on Amazon S3 interacts with a backend API to store and retrieve data in real time.

## Features

* Static website hosted on Amazon S3
* Backend developed with AWS Lambda (Python)
* HTTP API using Amazon API Gateway
* Visitor count stored in Amazon DynamoDB
* Fully serverless architecture

## Architecture

```text
Browser (S3 Website)
        │
        ▼
API Gateway
        │
        ▼
AWS Lambda
        │
        ▼
DynamoDB
```

## Technologies Used

* AWS S3
* AWS Lambda
* Amazon API Gateway
* Amazon DynamoDB
* AWS IAM
* Python
* HTML
* CSS
* JavaScript

## Project Structure

```text
├── index.html
├── style.css
├── script.js
├── lambda_function.py
├── dynamodb-policy.json
└── README.md
```

## Setup

1. Create a DynamoDB table named **VisitorCounter**.
2. Deploy the Lambda function using `lambda_function.py`.
3. Attach the IAM policy from `dynamodb-policy.json` to the Lambda execution role.
4. Create an HTTP API in API Gateway and connect it to the Lambda function.
5. Update the API URL in `script.js`.
6. Upload the frontend files (`index.html`, `style.css`, and `script.js`) to your S3 bucket.
7. Open the S3 website URL and test the visitor counter.

## Demo

* **Live Demo:** Add your S3 website URL here
* **API Endpoint:** Add your API Gateway endpoint here

## License

This project is for learning and educational purposes.
