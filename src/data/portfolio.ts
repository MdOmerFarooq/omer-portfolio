export type Experience = {
  period: string;
  role: string;
  company: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    period: "Jul 2025 – Jun 2026",
    role: "Senior Engineer",
    company: "Movate Technologies",
    bullets: [
      "Provisioned cloud infrastructure with Terraform and Ansible and built CI/CD workflows for Kubernetes deployments, improving deployment consistency and reducing release effort.",
      "Built and maintained GitHub Actions pipelines that eliminated 70% of manual deployment work and made application delivery more repeatable.",
      "Designed highly available AWS environments across multiple Availability Zones, combining public, private and isolated subnets, NAT Gateways, Auto Scaling and RDS to handle changing workloads without manual intervention.",
    ],
  },
  {
    period: "Sep 2023 – Jul 2025",
    role: "Engineer",
    company: "Movate Technologies",
    bullets: [
      "Owned monitoring and alerting across Linux, macOS and Windows environments, investigating incidents and turning findings into structured RCAs and post-mortems.",
      "Resolved a wide-impact Linux VM outage affecting 100+ users by tracing configuration drift and shipping a rollback fix four hours before the upstream engineering team's resolution.",
      "Automated package management, service operations, diagnostics and reporting workflows with Bash, reducing repetitive operational work across multi-OS environments.",
    ],
  },
  {
    period: "Nov 2019 – Mar 2020",
    role: "Intern",
    company: "AAM Geo Spatial Tech Private Limited",
    bullets: [
      "Supported day-to-day systems and IT operations, including workstation setup, software installation, user access and basic hardware and network troubleshooting.",
      "Assisted with diagnosing technical issues and escalating incidents to the appropriate teams to help keep internal operations running smoothly.",
      "Maintained technical documentation and supported routine system administration tasks across the organization's computing environment.",
    ],
  },
];

export const skills: string[] = [
  "AWS",
  "Terraform",
  "Kubernetes",
  "Docker",
  "GitHub Actions",
  "CI/CD",
  "Infrastructure as Code",
  "Python",
  "Linux",
  "Ansible",
  "Cloud Security",
  "IAM",
  "Networking",
  "Monitoring",
  "Observability",
  "Prometheus",
  "Grafana",
  "Automation",
  "Configuration Management",
  "Containerization",
  "High Availability",
  "Scalability",
  "Incident Response",
  "SRE Practices",
  "Bash",
  "Git",
  "Jenkins",
  "Azure",
  "GCP",
  "ELK Stack",
  "Logging",
  "Alerting",
  "TCP/IP",
  "DNS",
  "HTTP",
  "SSH",
  "VPN",
  "Troubleshooting",
];

export type Project = {
  name: string;
  description: string;
  github?: string;
  blog?: string;
};

export const projects: Project[] = [
  {
    name: "Production-Grade 3-Tier AWS Architecture",
    description:
      "A production-style AWS environment built from the ground up with Terraform. It uses a multi-AZ network, public/private/isolated subnets, dual NAT Gateways, Auto Scaling, RDS PostgreSQL, Secrets Manager and CloudWatch — designed around availability, security and predictable operations.",
    github:
      "https://github.com/MdOmerFarooq/Production-Grade-3-Tier-AWS-Architecture-using-Terraform",
  },
  {
    name: "Zero-Downtime Rolling Patch System",
    description:
      "Linux patching shouldn't mean taking the application down. This Ansible workflow removes instances from an AWS ALB, drains existing connections, patches and reboots one node at a time, then puts it back into service only after health checks pass.",
    github: "https://github.com/MdOmerFarooq/Zero-Downtime-Rolling-Patch",
  },
  {
    name: "Serverless EBS Snapshot Cleanup",
    description:
      "EBS snapshots can quietly accumulate long after the resources they came from are gone. This serverless cleanup pipeline uses Lambda, Boto3 and EventBridge to identify orphaned snapshots and remove them automatically, with CloudWatch handling visibility and alerting.",
    github: "https://github.com/MdOmerFarooq/aws-ebs-snapshot-cleanup",
  },
  {
    name: "Boto3 Infrastructure Provisioning",
    description:
      "A Python-based approach to provisioning AWS infrastructure through Boto3 instead of relying on repetitive manual setup. The goal is simple: turn infrastructure operations into code that can be repeated, reviewed and run consistently.",
    github: "https://github.com/MdOmerFarooq/AWS-Infra-Automation-using-Boto3",
  },
];
