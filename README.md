<div align="center">

  <!-- Animated Cyberpunk Terminal Header matching v1tor2003-portfolio -->
  <a href="https://v1tor2003-portfolio.vercel.app">
    <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=22&duration=3200&pause=1000&color=10B981&center=true&vCenter=true&width=780&lines=%2F%2F+VITOR+PIRES+%E2%80%94+BACKEND+%26+CLOUD+ENGINEER;C%23+(.NET+8%2F9)+%C2%B7+TypeScript+(NestJS)+%C2%B7+Go+%C2%B7+AWS;Real-Time+IoT+Telemetry+%26+Event-Driven+Microservices" alt="Typing SVG" />
  </a>

  <p>I design and ship high-throughput microservices, real-time IoT telemetry pipelines, and idempotent payment systems.</p>

  <p>
    <a href="mailto:vitor.pr04@hotmail.com"><img src="https://img.shields.io/badge/Email-vitor.pr04%40hotmail.com-EA4335?style=flat-square&logo=minutemailer&logoColor=white" alt="Email" /></a>
    <a href="https://www.linkedin.com/in/pires-vitor/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-pires--vitor-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
    <a href="https://v1tor2003-portfolio.vercel.app" target="_blank"><img src="https://img.shields.io/badge/Portfolio-v1tor2003--portfolio.vercel.app-10B981?style=flat-square&logo=vercel&logoColor=black" alt="Portfolio" /></a>
    <img src="https://img.shields.io/badge/Status-Open_to_Remote_%26_Freelance-A855F7?style=flat-square" alt="Open to Remote & Freelance" />
  </p>
</div>

---

### ⚡ What I Build in Production

Most of my commercial code lives in private enterprise repositories, where I architect and maintain distributed backend systems:

- 🚁 **Mid-Level Backend Engineer at GTEEX Revolution (Nov 2025 – Present):**
  Building the distributed backend for a **real-time drone fleet management & command-dispatch platform** in **C# (.NET 8/9)**, **TypeScript (NestJS)**, and **AWS**.
  - Architected live telemetry ingestion pipelines (**AWS IoT Core → Amazon Kinesis → AWS Lambda / TimescaleDB**) handling high-velocity flight data.
  - Engineered decoupled event meshes over **Amazon SQS, SNS & EventBridge** with strict idempotency keys, exponential backoff retries, and **Dead-Letter Queue (DLQ)** redrive policies.
  - Eliminated peak-load concurrency bottlenecks using **Redis / Valkey** distributed locks, **DynamoDB**, and **SQL Server**, deployed via **Docker & AWS ECS** with **CloudWatch** observability.
- 💳 **Tech Lead & Backend .NET Engineer at ClosedFun (Remote, Nov 2024 – Nov 2025):**
  Led backend architecture in **ASP.NET Core (.NET 8)** using **Clean & Vertical Slice Architecture (CQRS)**. Engineered multi-gateway payment and billing pipelines (**Stripe, Mercado Pago, EfiPay**) with idempotent transaction processing, automated financial reconciliation, and **Prometheus + Grafana** monitoring.
- 🧪 **Reliability & Load Engineering:**
  I validate distributed workflows against real containerized dependencies with **Testcontainers**, enforce unit/integration suites in **xUnit / Vitest**, and stress-test p99 latency with **NBomber** and **Artillery**.

<details>
<summary><b>📐 Click to expand: Production IoT Telemetry & Event Mesh Architecture (GTEEX Revolution)</b></summary>
<br/>

```mermaid
flowchart LR
    subgraph Edge["Drone Fleet & Edge"]
        D["UAV / Drone Telemetry"]
    end

    subgraph AWS["AWS Cloud Ingestion & Event Mesh"]
        IOT["AWS IoT Core (MQTT)"]
        KIN["Amazon Kinesis Streams"]
        EB["EventBridge / SNS Fanout"]
        SQS["Amazon SQS + DLQ"]
    end

    subgraph Services["Core Microservices"]
        NET[".NET 8/9 Telemetry Engine (CQRS)"]
        NEST["NestJS Fleet Gateway (ABAC/RBAC)"]
    end

    subgraph Storage["Persistence & Hot Cache"]
        REDIS[("Redis / Valkey Lock & Cache")]
        TS[("TimescaleDB / PostgreSQL")]
        DYN[("Amazon DynamoDB")]
    end

    D -->|Real-Time Stream| IOT --> KIN --> NET
    D -->|Command & Control| NEST --> EB --> SQS --> NET
    NET --> REDIS
    NET --> TS
    NET --> DYN
```
</details>

---

### 🚀 Featured Open-Source & Reference Projects

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h4>💳 <a href="https://github.com/v1tor2003/abstract-payments">abstract-payments</a></h4>
      <p>
        <img src="https://img.shields.io/badge/C%23-.NET_10-512BD4?style=flat-square&logo=dotnet&logoColor=white" />
        <img src="https://img.shields.io/badge/Clean_Architecture-DDD-10B981?style=flat-square" />
        <img src="https://img.shields.io/github/license/v1tor2003/abstract-payments?style=flat-square&color=zinc" />
      </p>
      <p>Unified C# payment gateway abstraction framework supporting <b>Pix, Stripe, Mercado Pago, and EfiPay</b>. Isolates financial domain logic from provider SDK breaking changes via Strategy/Factory adapters and automated webhook signature verification.</p>
    </td>
    <td width="50%" valign="top">
      <h4>⚡ <a href="https://github.com/v1tor2003/command-api">@v1tor2003/command-api</a></h4>
      <p>
        <img src="https://img.shields.io/badge/TypeScript-Zero_Deps-3178C6?style=flat-square&logo=typescript&logoColor=white" />
        <img src="https://img.shields.io/badge/Pattern-CQRS_Command-10B981?style=flat-square" />
        <img src="https://img.shields.io/github/license/v1tor2003/command-api?style=flat-square&color=zinc" />
      </p>
      <p>Lightweight, zero-dependency, transport-agnostic TypeScript HTTP client implementing the <b>Command Pattern</b> with strictly-typed <code>Result&lt;T, E&gt;</code> unwrapping and pluggable test transports.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h4>🎓 <a href="https://github.com/v1tor2003/timeless">timeless</a> & <a href="https://github.com/v1tor2003/sinform-wc-api">sinform-wc-api</a></h4>
      <p>
        <img src="https://img.shields.io/badge/Node.js-TypeScript-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
        <img src="https://img.shields.io/badge/Workshop-SINFORM_UESC-F59E0B?style=flat-square" />
      </p>
      <p>Multi-service Node.js monorepo (HTTP API + file server) and REST architecture foundations built to teach advanced backend engineering workshops at <b>SINFORM 2025 & 2026 (UESC)</b>.</p>
    </td>
    <td width="50%" valign="top">
      <h4>🖥️ <a href="https://v1tor2003-portfolio.vercel.app">Cyberpunk Interactive Portfolio</a></h4>
      <p>
        <img src="https://img.shields.io/badge/Next.js_16-TypeScript-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
        <img src="https://img.shields.io/badge/Architecture-Enterprise_Case_Studies-A855F7?style=flat-square" />
      </p>
      <p>Interactive developer portfolio featuring deep-dive architectural case studies from my enterprise work and live Git telemetry.</p>
    </td>
  </tr>
</table>

---

### 🛠️ Production Tech Stack

<div align="center">
  <p>
    <img src="https://skillicons.dev/icons?i=cs,dotnet,ts,nestjs,nodejs,go,java,spring,aws,docker,postgres,redis,dynamodb,mongodb&perline=14" alt="Tech Stack Icons" />
  </p>
</div>

| Domain | Technologies |
| :--- | :--- |
| **Backend & Runtimes** | `C#` · `.NET 8/9` · `ASP.NET Core` · `TypeScript` · `NestJS` · `Node.js` · `Go` · `Java (Spring Boot)` |
| **AWS & Cloud Infra** | `AWS IoT Core` · `Kinesis` · `SQS & SNS` · `EventBridge` · `ECS` · `Lambda` · `S3 & Glacier` · `SES` · `Docker` · `GitHub Actions` |
| **Data & Distributed State** | `PostgreSQL` · `TimescaleDB` · `SQL Server` · `DynamoDB` · `Redis / Valkey` · `MongoDB` · `Supabase` |
| **Architecture & Quality** | `Clean Architecture` · `Vertical Slice` · `DDD` · `CQRS` · `Testcontainers` · `NBomber` · `Artillery` · `xUnit` · `Vitest` · `Prometheus & Grafana` |

---

### 📈 Enterprise Git Activity

> My personal open-source commits are shown in GitHub's native graph below. This matrix tracks my daily **Enterprise & Private Organization commits** (`@vitor-pires_tecnosul`), synced with [v1tor2003-portfolio.vercel.app](https://v1tor2003-portfolio.vercel.app).

<div align="center">
  <img src="./assets/enterprise-contributions.svg" width="100%" alt="Enterprise Git Activity Matrix" />
  <br/><br/>
  <img src="https://raw.githubusercontent.com/v1tor2003/v1tor2003/output/snake.svg" width="100%" alt="Personal Contribution Snake" />
</div>

---

### 🤝 Let's Build Together (Remote Roles & Freelance)

I'm finishing my **B.Sc. in Computer Science at UESC** while working as a Mid-Level Backend Engineer, and I'm available for:
- 🌍 **Remote Backend / Cloud Engineering roles** (`.NET`, `TypeScript / NestJS`, `AWS`).
- 🛠️ **Freelance & Consulting projects** — payment gateway integrations (`Stripe`, `Pix`, `Mercado Pago`), event-driven microservices, real-time IoT/messaging pipelines, and backend performance tuning.

<div align="center">
  <a href="mailto:vitor.pr04@hotmail.com"><img src="https://img.shields.io/badge/Email_Me-vitor.pr04%40hotmail.com-EA4335?style=for-the-badge&logo=minutemailer&logoColor=white" alt="Email" /></a>
  <a href="https://www.linkedin.com/in/pires-vitor/" target="_blank"><img src="https://img.shields.io/badge/Connect_on_LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://v1tor2003-portfolio.vercel.app" target="_blank"><img src="https://img.shields.io/badge/Explore_Full_Portfolio-10B981?style=for-the-badge&logo=vercel&logoColor=black" alt="Portfolio" /></a>
</div>
