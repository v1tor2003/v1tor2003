<div align="center">

  <a href="https://v1tor2003-portfolio.vercel.app">
    <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=22&duration=3200&pause=1000&color=FFFFFF&center=true&vCenter=true&width=780&lines=Vitor+Pires+-+Backend+Software+Engineer;.NET+%C2%B7+NestJS+%C2%B7+AWS;Distributed+Systems+%26+Event-Driven+Architecture" alt="Typing SVG" />
  </a>

  <p>Computer Science graduate and Backend Software Engineer specializing in high-throughput microservices, event-driven and messaging architectures, cloud infrastructure, observability, and load/integration testing. Open to remote opportunities and freelance projects across backend, cloud, messaging, and system reliability.</p>

  <p>
    <a href="mailto:vitor.pr04@hotmail.com"><img src="https://img.shields.io/badge/Email-vitor.pr04%40hotmail.com-EA4335?style=flat-square&logo=minutemailer&logoColor=white" alt="Email" /></a>
    <a href="https://www.linkedin.com/in/pires-vitor/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-pires--vitor-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
    <a href="https://v1tor2003-portfolio.vercel.app" target="_blank"><img src="https://img.shields.io/badge/Portfolio-v1tor2003--portfolio.vercel.app-111111?style=flat-square&logo=vercel&logoColor=white" alt="Portfolio" /></a>
  </p>
</div>

---

### What I Build in Production

Most of my commercial code lives in private enterprise repositories, where I architect and maintain distributed backend systems:

- **Mid-Level Backend Engineer at GTEEX Revolution (Nov 2025 – Present):**
  Building the distributed backend for a **real-time drone fleet management & command-dispatch platform** in **C# (.NET 8/9)**, **TypeScript (NestJS)**, and **AWS**.
  - Architected live telemetry ingestion pipelines (**AWS IoT Core → Amazon Kinesis → AWS Lambda / TimescaleDB**) handling high-velocity flight data.
  - Engineered decoupled event meshes over **Amazon SQS, SNS & EventBridge** with strict idempotency keys, exponential backoff retries, and **Dead-Letter Queue (DLQ)** redrive policies.
  - Eliminated peak-load concurrency bottlenecks using **Redis / Valkey** distributed locks, **DynamoDB**, and **SQL Server**, deployed via **Docker & AWS ECS** with **CloudWatch** observability.

<details>
<summary><b>Click to expand: Production IoT Telemetry & Event Mesh Architecture (GTEEX Revolution)</b></summary>
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

### Production Tech Stack

<div align="center">
  <p>
    <img src="https://skillicons.dev/icons?i=cs,dotnet,ts,nestjs,nodejs,java,spring,aws,docker,postgres,redis,dynamodb,mongodb&perline=13" alt="Tech Stack Icons" />
  </p>
</div>

| Domain | Technologies |
| :--- | :--- |
| **Backend & Runtimes** | `C#` · `.NET 8/9` · `ASP.NET Core` · `TypeScript` · `NestJS` · `Node.js` · `Java (Spring Boot)` |
| **AWS & Cloud Infra** | `AWS IoT Core` · `Kinesis` · `SQS & SNS` · `EventBridge` · `ECS` · `Lambda` · `S3 & Glacier` · `SES` · `Docker` · `GitHub Actions` |
| **Data & Distributed State** | `PostgreSQL` · `TimescaleDB` · `SQL Server` · `DynamoDB` · `Redis / Valkey` · `MongoDB` · `Supabase` |
| **Architecture & Quality** | `Clean Architecture` · `Vertical Slice` · `DDD` · `CQRS` · `Testcontainers` · `NBomber` · `Artillery` · `xUnit` · `Vitest` · `Prometheus & Grafana` |

---

### Enterprise Git Activity

> Tracks my daily Enterprise & Private Organization commits (`@vitor-pires_tecnosul`), synced with [v1tor2003-portfolio.vercel.app](https://v1tor2003-portfolio.vercel.app).

<div align="center">
  <img src="./assets/enterprise-contributions.svg" width="100%" alt="Enterprise Git Activity Matrix" />
</div>

### Personal Git Activity

<div align="center">
  <img src="https://raw.githubusercontent.com/v1tor2003/v1tor2003/output/snake.svg" width="100%" alt="Personal Contribution Snake" />
</div>
