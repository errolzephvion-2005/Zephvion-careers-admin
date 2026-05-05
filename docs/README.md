        </stop>
        <stop offset="25%" stop-color="#aaa">
          <animate attributeName="stop-color" values="#aaa;#ddd;#fff;#ddd;#aaa" dur="3s" repeatCount="indefinite"/>
        </stop>
        <stop offset="50%" stop-color="#ccc">
          <animate attributeName="stop-color" values="#ccc;#fff;#ddd;#fff;#ccc" dur="3s" repeatCount="indefinite"/>
        </stop>
        <stop offset="75%" stop-color="#aaa">
          <animate attributeName="stop-color" values="#aaa;#ddd;#fff;#ddd;#aaa" dur="3s" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" stop-color="#888">
          <animate attributeName="stop-color" values="#888;#fff;#888;#aaa;#888" dur="3s" repeatCount="indefinite"/>
        </stop>
      </linearGradient>
      <filter id="shadow-orange" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="3" dy="3" stdDeviation="0" flood-color="#FF5A1F"/>
        <feDropShadow dx="6" dy="6" stdDeviation="0" flood-color="#000000"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="800" height="140" fill="url(#diagonal-stripes)"/>
    <text x="400" y="65" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="bold" fill="#1E80E1" filter="url(#shadow-orange)" letter-spacing="-2">Zephvion</text>
    <text x="400" y="105" text-anchor="middle" font-family="monospace" font-size="18" fill="url(#silver-shimmer)" letter-spacing="6" font-weight="500">CAREERS ADMIN</text>
  </svg>
  
<!-- end header -->

  # Zephvion Careers Admin Portal
</div>

## Description
This system is the comprehensive Administrative Portal for the Zephvion Careers page. It provides a secure, industrial-grade dashboard for human resources and administrative staff to manage job postings, review candidate applications, and oversee the entire recruitment lifecycle.

## How to Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Portal**
   Open [http://localhost:3000](http://localhost:3000) in your browser. The admin portal is primarily located under `/dashboard` and `/login`.

## Environment Credentials

To run this project locally, you will need to set up a `.env.local` file in the root directory with the following variables connecting to your Supabase project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

*Note: Contact the lead developer or check your Supabase dashboard to obtain these credentials. Never commit your actual `.env.local` file to version control.*

## Documentation Navigation

Explore the modules below to learn more about specific features and routes within the Admin Portal:

- [Dashboard](./dashboard/README.md) - Overview of the main admin dashboard features.
- [Jobs](./jobs/README.md) - Job management, creation, and editing routes.
- [Application](./application/README.md) - Candidate application tracking and review features.
- [Database](./database/README.md) - Schema overview, queries, and RLS policies.
