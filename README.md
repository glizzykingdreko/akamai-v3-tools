# Akamai V3 Tools

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fglizzykingdreko%2Fakamai-v3-tools)

A collection of tools for working with Akamai V3 cookies and sensor data.

## Live Demo

Access the live application at: [https://akamai-v3-tools.vercel.app](https://akamai-v3-tools.vercel.app)

## Features

- **Decrypt Payload**: Convert encrypted sensor data back to readable JSON format
- **Encrypt Payload**: Convert JSON data into encrypted format with script content and optional cookie hash
- **Extract Cookie Hash**: Parse cookie string and extract the bm_sz hash value

## Use Cases

- **Security Research**: Analyze and understand Akamai's bot detection mechanisms
- **Development**: Test and debug applications that interact with Akamai-protected sites
- **Web Scraping**: Understand and work with Akamai's anti-bot measures
- **Web Security**: Learn about modern bot detection techniques

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- [Akamai v3 Sensor Data Helper](https://github.com/glizzykingdreko/akamai-v3-sensor-data-helper) - NPM module for working with Akamai v3 sensor data

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/glizzykingdreko/akamai-v3-tools.git
cd akamai-v3-tools
```

2. Install dependencies
```bash
npm install --legacy-peer-deps
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy your application.

## Related Projects

- [Akamai v3 Sensor Data Helper](https://github.com/glizzykingdreko/akamai-v3-sensor-data-helper) - NPM module for working with Akamai v3 sensor data
- [Akamai v2 Decryptor](https://github.com/glizzykingdreko/akamai-v2-decryptor) - For Akamai v2 sensor data decryption

## Documentation

For a deep dive into how Akamai v3 sensor data works and how to use these tools effectively, check out my detailed article:
- [Akamai v3 Sensor Data: Deep Dive into Encryption, Decryption and Bypass Tools](https://medium.com/@glizzykingdreko/akamai-v3-sensor-data-deep-dive-into-encryption-decryption-and-bypass-tools-da0adad2a784)

## License

MIT

## Author

- **GlizzyKingDreko** - [GitHub](https://github.com/glizzykingdreko)

## Acknowledgments

- [Akamai v3 Sensor Data Helper](https://github.com/glizzykingdreko/akamai-v3-sensor-data-helper) - NPM module for working with Akamai v3 sensor data 