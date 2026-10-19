---
title: Bui Nam Trung — Resume
---

<div class="cv-head">
  <span class="cv-loc">Ho Chi Minh City</span>
  <span class="cv-name">Bui Nam Trung</span>
  <span class="cv-contact">namtrung18101996@gmail.com<br>0784616288<br><a href="https://www.linkedin.com/in/trungbn1810/">linkedin.com/in/trungbn1810</a></span>
</div>

## Summary

- Over 8 years of frontend-focused fullstack experience, strongest in React and TypeScript.
- Strong in reusable UI components and clean, maintainable interfaces with TypeScript, HTML/CSS, Redux, Ant Design, Bootstrap, Material UI, and Tailwind.
- Also experienced in building APIs and services with Golang and Ruby on Rails.
- Use Claude Code and Cursor in an AI-assisted development lifecycle. The assistant drafts the solution, design, code, and review. People check and approve each step.
- Researched and applied AI SDLC on delivery work. Each step is drafted with AI and approved by a person before the work moves on.
- Good English communication skills with solid problem-solving and self-management abilities.

## Languages ,Technologies and Soft skills

- TypeScript, JavaScript, HTML, CSS, Ruby, Golang, C++.
- ReactJS, Redux Saga, Redux Toolkit, Ant Design, Storybook, Ext JS, Docusaurus, Ruby on Rails, PostgreSQL, MySQL, Kafka, Redis, OpenSearch, Docker, Claude Code, Cursor, Neo Vim.
- English skill, Problem solving skill, Critical thinking skill, Self-management skill.

## Technical Experience

### Projects

- **EDI Authority** (2025-Present): A system that receives purchase orders from hospitals and acknowledgements from suppliers, compares each line, and shows differences in price, quantity, unit of measure, and item number. Buyers use one screen to assign these problems and decide how to fix them. The React screen, Go API, and EDI file service connect through Kafka and OpenSearch. (React, TypeScript, Storybook, Docusaurus, Go, Gin, PostgreSQL, Kafka, OpenSearch).
- **MIMS** (2019-2025): Meperia Implant Management Solution(MIMS) - a system that automates the bill-only and consignment process, combining both provider and supplier into a single portal. The benefits are item/pricing transparency, mitigation of product recalls and expiration, and accurate contract pricing. (ReactJS, Redux Saga, Antd Design, Ruby on Rails, Golang Elasticsearch).
- **Market Intelligence** (Aug 2018 – Dec 2018): Support statistical analysis of product prices from suppliers, helping hospitals find the best prices on the market (Ext JS, Ruby on Rails, Elasticsearch).

## Employment

<div class="cv-entry"><span>Software Engineer</span><span>Bestarion</span><span>2019-Present</span></div>

- Built the MIMS system with React, Ruby on Rails, and Elasticsearch. Providers and suppliers use one portal for bill-only and consignment: charge capture of patient-specific items used in surgical cases, recall management of implanted items, and vendor inventory.
- Order, price, and consignment data is synced into Elasticsearch so users can search items and contract prices. I kept the sync job and the Rails API running after release, and checked search results when data looked wrong.
- Built React screens and reusable components with Redux and Ant Design. Designed the database and wrote REST APIs in Ruby on Rails.
- Wrote unit tests with RSpec, Faker, and Factory Bot. Used Docker and Elasticsearch to sync data and make product search faster.
- Read the specification, estimated the work, and turned requirements into features with the team. Raised problems early when something could affect quality.
- Since 2025, I have worked on EDI Authority. The frontend is a React and TypeScript application. I used Storybook to build and review UI components before they go into the app. The backend is a Go service. I built OpenSearch so buyers can search purchase orders and exceptions. Sign-in and item and contract data come from the existing hospital system.
- I supported the live EDI Authority system: checked failed jobs, search indexing, and API errors, and followed the release checklist before each production deploy.
- The service is designed for 50–200 concurrent users, starting at about 3,500 transactions a day and growing to about 28,000 a day over three years. A third-party transaction is acknowledged within 300 ms, including bursts of up to 100 files. Purchase orders, acknowledgements, shipping notices, and invoices are each processed at 250 lines within 30 seconds, from API receipt into the database. Buyer pages become interactive in under 3 seconds, and core actions finish in 2–3 seconds.
- Access is authenticated with role-based permissions and can use OAuth 2.0 or OpenID Connect. Traffic uses TLS 1.2 or higher, and sensitive data at rest uses AES-256.
- Wrote a documentation site with Docusaurus for the EDI Authority system. It explains the architecture and how to build and test features, so developers, business analysts, and testers can read the same guide. The site runs with Docker and nginx, and can export pages to PDF.
- Used Claude Code and Cursor in an AI-assisted development lifecycle on EDI Authority. The assistant drafts the solution, design, code, and review. People check and approve each step before the work continues.
- Joined technical discussions with the team and gave product demos to customers.

<div class="cv-entry"><span>Software Engineer, Intern</span><span>Larion</span><span>Aug 2018 – Dec 2018</span></div>

- Work under the Agile Scrum framework.
- Follow improvement suggestions from technical lead, other developers based on code review.
- Build the front end with Ext JS.
- Write API with Ruby on Rails.
- Use Elasticsearch to store data and show insights.



## Education

<div class="cv-entry"><span>Ho Chi Minh City</span><span>HUTECH University</span><span>2014 – 2018</span></div>

- Bachelor of Information Technology, GPA: 3.1
- Undergraduate Coursework: Operating Systems; Databases; Algorithms; Programming Languages; C++, Java, .NET
- Graduate Coursework: Computer Architecture; Algorithms; Comparison of Learning Algorithms; AngularJS, Sails JS
