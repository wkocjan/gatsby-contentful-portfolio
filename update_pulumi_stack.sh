echo "Updating Pulumi Stack"

# Download dependencies and build
npm install
npm run build

# Update the stack
pulumi stack select acme/website-production
pulumi up --yes
