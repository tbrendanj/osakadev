# osakadev

This is a site built on the premise of introducing developers from around the world 
to software jobs in Japan. The hope is for this to grow into a platform for consulting 
and recruitment.

## Stack

NextJS 16 (App Router, Typescript)
Drizzle ORM + `node-postgres` (`pg`)
PostgreSQL 16
Docker
Storybook

## Prerequisites

- Node.js 20+ (developed on 22)
- Docker Desktop (for the container workflows)

## Setup

```bash
npm install
cp .env.example .env.local      # Windows: copy .env.example .env.local
```

## Directories

app/lib/static - static data
app/lib/types - definitions for types written for this project
public/images - image assets from the site. There will be a CDN used for holding user-uploaded images (company logos, etc.) when the time comes
db - database things

## Local Testing

Test the site:

```bash
npm run docker:up
```

Test components:

```bash
npm run storybook
```

## Development Roadmap

TBD

Language toggle (eng-jp) - Requires support for storing data for two languages for the same job ids
Database access
Security audit
User accounts
- companies need to be able to add job listings
- candidates need to be able to add resumes
- both need to be able to create profiles for themselves
- CDN for image uploads
Skill courses?
Connect to GitHub for skill evaluations?
Skill assessments?