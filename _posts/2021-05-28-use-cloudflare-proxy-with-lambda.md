---
title: Use Cloudflare proxy with Lambda
description: Integrate Lambda functions with custom domain & Cloudflare proxy
author: Thinh Tran
date: 2021-05-28 13:15:00 +0700
categories: [Tutorials]
tags: [cloudflare, aws]
---

1. Get the Origin Certificate from Cloudflare.

   - Go to your domain management page on Cloudflare.

   - Go to `SSL/TLS`, then change to the tab `Origin Server`. Click the button `Create Certificate`.

   - You should use default options and add 2 host names: `your-domain.com` & `*.your-domain.com`. Choose Pem format and save the Origin Certificate and the private key. Click the button `Ok` to create the certificate.

2. Import certificate into AWS and map it to a Lambda function.

   - Import the above certificate into AWS Certificate Manager with the certificate and the private key. For certificate chain, get Cloudflare Origin CA — RSA Root from [this link](https://support.cloudflare.com/hc/en-us/articles/115000479507-What-are-the-root-certificate-authorities-CAs-used-with-CloudFlare-Origin-CA-).

   - Setup a Lambda function and an API Gateway endpoint pointing to it at a specific stage (dev/prod).

   - In API Gateway Console, go to `Custom domain names`, create a new domain name. For example, `api.your-domain.com`, use the above certificate. Then map it to the API with a specific stage. Check its `API Gateway domain name` at the tab `Configurations`.

3. Configure Cloudflare

   - Point the domain (`api.your-domain.com`) to the `API Gateway domain name` in the above step with a CNAME record, **proxy enabled**.

   - Go to `SSL/TLS`, change `SSL/TLS encryption mode` to `Full`.

**Note**: It may take a while before you are able to access the lambda function with the custom domain.
