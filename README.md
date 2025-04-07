# Akamai v3 Tools

A web application for working with Akamai v3 sensor data - encryption, decryption, and hash extraction. This tool helps developers and security researchers work with Akamai's bot detection system.

## Live Demo

Try the application live at: [https://akamai-v3-tools.vercel.app](https://akamai-v3-tools.vercel.app)

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

## License

MIT

## Author

- **GlizzyKingDreko** - [GitHub](https://github.com/glizzykingdreko)

## Acknowledgments

- [Akamai v3 Sensor Data Helper](https://github.com/glizzykingdreko/akamai-v3-sensor-data-helper) - NPM module for working with Akamai v3 sensor data 