# Serverless Visitor Counter — AWS Lambda + API Gateway + DynamoDB + S3

## What it does
A static website (hosted on S3) has a button that calls a real backend (Lambda function)
every time it's clicked. The Lambda function increments a counter stored in DynamoDB and
returns the live count — proving a full serverless request/response cycle, not just a
static file being served.

## Architecture
```
Browser (S3 website)
     |
     |  fetch(API_URL)
     v
API Gateway (HTTP API)
     |
     v
AWS Lambda (Python)
     |
     v
DynamoDB table (VisitorCounter)
```

## 60-minute build timeline

### [0–10 min] Step 1: Create the DynamoDB table
1. AWS Console → search "DynamoDB" → **Create table**
2. Table name: `VisitorCounter`
3. Partition key: `id` (type: String)
4. Leave everything else default → **Create table**

### [10–25 min] Step 2: Create the Lambda function
1. AWS Console → search "Lambda" → **Create function**
2. Choose "Author from scratch"
3. Function name: `visitorCounterFunction`
4. Runtime: **Python 3.12**
5. Create function
6. In the code editor, delete the default code and paste the contents of `lambda_function.py` (in this folder)
7. Click **Deploy**

**Give Lambda permission to write to DynamoDB:**
8. Go to the function's **Configuration** tab → **Permissions**
9. Click the execution role link (opens IAM in a new tab)
10. Click **Add permissions → Create inline policy**
11. Switch to the JSON tab, paste the contents of `dynamodb-policy.json` (in this folder)
12. Name it `DynamoDBAccessPolicy` → Create policy

### [25–45 min] Step 3: Create the API Gateway
1. AWS Console → search "API Gateway" → **Create API**
2. Choose **HTTP API** → Build
3. Add integration: choose **Lambda**, select `visitorCounterFunction`
4. Configure route: Method `GET`, Resource path `/count`
5. Stage name: keep default (`$default`) → Next → Create
6. **Copy the "Invoke URL"** shown at the top (e.g. `https://abc123.execute-api.ap-south-1.amazonaws.com`)
   - Your full API endpoint will be: `<Invoke URL>/count`

**Enable CORS (so your website is allowed to call it):**
7. In your API → left menu → **CORS**
8. Configure:
   - Access-Control-Allow-Origin: `*`
   - Access-Control-Allow-Methods: `GET`
   - Access-Control-Allow-Headers: `content-type`
9. Save

### [45–55 min] Step 4: Update and upload the frontend
1. Open `script.js` in this folder
2. Replace `PASTE_YOUR_API_GATEWAY_URL_HERE` with your real endpoint:
   ```js
   const API_URL = "https://abc123.execute-api.ap-south-1.amazonaws.com/count";
   ```
3. Upload `index.html`, `style.css`, and the updated `script.js` to your existing S3 bucket
   (overwrite the old files — same bucket from before)

### [55–60 min] Step 5: Test end-to-end
1. Open your S3 website URL (from before)
2. Click "Greet Me" — it should show a live visitor count
3. Refresh the page a few times — the count should keep increasing
4. That confirms: Browser → API Gateway → Lambda → DynamoDB → back to Browser, all working

## What this demonstrates (say this in interviews/forms)
"I built a serverless visitor counter using AWS Lambda for compute, API Gateway to expose
an HTTP endpoint, and DynamoDB as a NoSQL database — with a static frontend on S3 calling
the API in real time. This covers compute, storage, database, and API management on AWS."

## Links to submit
- **Working demo/prototype link**: your S3 website URL
- **GitHub repo**: push this whole folder (no AWS keys are in this code, safe to commit)
