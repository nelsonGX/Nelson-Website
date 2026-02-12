## Nelson's Website
This is the personal website for nelsonGX. You can view it live at https://nelsongx.com
## Contributing
Just do whatever you want and give me a pr lol
## Deploy To Cloud
### Vercel
You can deploy this website to Vercel easily by forking this repo and connecting it to Vercel.
### Cloudflare Pages
It's quite complicated, but I can help you:
1. Fork this repo
2. Go to Cloudflare Dashboard and click the "+ Add" button, then select "Pages"
3. Choose "Import an existing Git repository"
4. Select your forked repo
5. At "Framework preset", choose "Next.js" (Not static HTML!) with default settings
6. Click "Save and Deploy" then watch it build
7. It will build success but the site won't work because you didn't set nodejs_compact setting. To fix this, go to "Settings" -> "Runtime" -> edit "Compatibility flags" -> add "nodejs_compat" flag -> save
8. Then you will have to redeploy the site by going to "Deployments" tab and find the latest build, then click "Retry Deployment"
9. It should work!
## License
MIT License. Feel free to make your own site with this :D with credit is much appreciated. See LICENSE file for more details.