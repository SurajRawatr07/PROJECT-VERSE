import { ProjectItem, ProjectDomain } from '../types';

export const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    passportId: 'PV-2025-IITB-CS089',
    title: 'AeroSync: Edge-Neuromorphic Drone Swarm Guidance',
    tagline: 'Sub-millisecond visual-inertial odometry for search & rescue swarms without GPS.',
    description: 'An open academic framework for collaborative multi-agent micro-UAV navigation in GPS-denied disaster environments. Continues research pioneered by the 2024 robotics batch.',
    domain: 'Autonomous Systems & Robotics',
    techStack: ['C++', 'ROS 2', 'PyTorch', 'NVIDIA Jetson', 'PX4 Autopilot', 'CUDA'],
    institution: 'IIT Bombay • Dept of Computer Science',
    department: 'Autonomous Robotics Laboratory',
    academicYear: '2025 – 2026',
    status: 'Verified',
    coverGradient: 'from-blue-900/60 via-indigo-950/40 to-slate-900',
    featured: true,
    githubStars: 342,
    githubCommits: 840,
    lineageBatchesCount: 3,
    openRoles: ['Perception Engineer', 'SLAM Specialist', 'Embedded Firmware'],
    contributors: [
      {
        name: 'Devansh Kulkarni',
        role: 'Team Lead & SLAM Pipeline',
        institution: 'IIT Bombay',
        batch: 'B.Tech \'25',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        githubHandle: 'devanshk-slam',
        commitsCount: 384
      },
      {
        name: 'Aarohi Sen',
        role: 'Edge AI & Spiking Neural Nets',
        institution: 'IIIT Hyderabad',
        batch: 'M.Tech \'26',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        githubHandle: 'aarohi-snns',
        commitsCount: 260
      },
      {
        name: 'Marcus Vance',
        role: 'PX4 Flight Control Integrator',
        institution: 'BITS Pilani',
        batch: 'B.E. \'25',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        githubHandle: 'mvance-px4',
        commitsCount: 196
      }
    ],
    lineage: [
      {
        year: '2024',
        batchName: 'Batch 2024 Alpha (Original Foundation)',
        institution: 'IIT Bombay',
        leadContributors: ['Rohit Varma', 'Devansh Kulkarni'],
        keyMilestones: [
          'Initial single-drone visual odometry on Jetson Nano',
          'Academic paper accepted at IEEE ICRA Student Symposium',
          'Basic ROS 1 nodes for optical flow estimation'
        ],
        commits: 290,
        pullRequests: 32,
        activeStatus: 'Completed',
        summary: 'Proved the fundamental feasibility of neuromorphic event-camera processing on low-power compute.'
      },
      {
        year: '2025',
        batchName: 'Batch 2025 Beta (Swarm Mesh & ROS 2 Port)',
        institution: 'IIT Bombay & IIIT Hyderabad',
        leadContributors: ['Devansh Kulkarni', 'Aarohi Sen', 'Marcus Vance'],
        keyMilestones: [
          'Complete rewrite in modern C++20 and ROS 2 Humble',
          'Mesh radio protocol for 8-agent swarm spatial consensus',
          'Hardware-in-the-loop simulation testbench'
        ],
        commits: 550,
        pullRequests: 84,
        activeStatus: 'Current',
        summary: 'Transformed single-node proof-of-concept into a resilient cross-institution collaborative swarm architecture.'
      },
      {
        year: '2026',
        batchName: 'Batch 2026 Candidate (Target Roadmap)',
        institution: 'IIT Bombay, BITS Pilani & CMU Robotics',
        leadContributors: ['Seeking Next Batch Leads'],
        keyMilestones: [
          'Outdoor forest canopy deployment test',
          'Ultra-wideband (UWB) relative ranging sensor fusion',
          'Edge TensorRT model distillation'
        ],
        commits: 0,
        pullRequests: 0,
        activeStatus: 'Upcoming Roadmap',
        summary: 'Open call for 2026 capstone teams to inherit validated flight stacks and execute live search & rescue trials.'
      }
    ],
    passport: {
      passportId: 'PV-2025-IITB-CS089',
      qrHash: '0x8f2d1e90bca41398c8f0412891f7a08b98172901cebf',
      projectName: 'AeroSync: Edge-Neuromorphic Drone Swarm Guidance',
      tagline: 'Sub-millisecond visual-inertial odometry for search & rescue swarms.',
      institution: 'Indian Institute of Technology Bombay',
      department: 'Autonomous Systems & Artificial Intelligence Cluster',
      academicYear: '2025 – 2026 Academic Session',
      originalBatch: 'Batch 2024 (Class of \'24)',
      currentBatch: 'Batch 2025 (Class of \'25 / \'26)',
      status: 'Verified',
      license: 'Apache 2.0 Academic License',
      techStack: ['C++20', 'ROS 2 Humble', 'PyTorch', 'CUDA 12', 'PX4 Autopilot', 'Zenoh Mesh'],
      githubRepo: 'projectverse-academic/aerosync-swarm-guidance',
      totalCommits: 840,
      activeContributors: 6,
      mergedPRs: 116,
      codeHealthScore: 98,
      testCoverage: 92,
      stars: 342,
      forks: 78,
      facultyReviewer: {
        name: 'Dr. Siddharth Anand',
        designation: 'Professor & Head of Aerial Robotics Lab',
        department: 'Dept of Computer Science & Engineering',
        institution: 'IIT Bombay',
        score: 9.6,
        reviewText: 'Exceptional continuation across batches. The migration to ROS 2 and cross-institutional collaboration with IIIT Hyderabad validates real distributed engineering rigor. Hardware telemetry results independently reproduced.',
        verifiedAt: 'October 18, 2025',
        signatureHash: 'SIG-VERIFIED-FACULTY-IITB-CS-98410294'
      },
      institutionalValidationCode: 'INST-AUTH-IITB-DEAN-ACAD-2025-99218',
      rubricScores: {
        novelty: 9.8,
        technicalRigor: 9.6,
        documentation: 9.4,
        continuityPotential: 9.9
      }
    }
  },
  {
    id: 'proj-2',
    passportId: 'PV-2025-MIT-BIO042',
    title: 'SynthaGene: Privacy-Preserving Genomic Variant Classifier',
    tagline: 'Zero-knowledge proofs for federated rare oncology mutation discovery.',
    description: 'Enables oncology research hospitals to run joint federated variant interpretation without exposing patient raw DNA sequences. Built upon cryptographic foundations started in 2024.',
    domain: 'Healthcare & Biotech',
    techStack: ['Rust', 'Circom', 'Python', 'FastAPI', 'Next.js', 'WebAssembly', 'ZK-SNARKs'],
    institution: 'MIT • Computational Biology & CSAIL',
    department: 'Health Sciences and Cryptography Group',
    academicYear: '2025 – 2026',
    status: 'Verified',
    coverGradient: 'from-teal-950/60 via-slate-900 to-emerald-950/30',
    featured: true,
    githubStars: 418,
    githubCommits: 620,
    lineageBatchesCount: 2,
    openRoles: ['Circom Circuit Auditor', 'Bioinformatics Pipeline Dev', 'Clinical Data Liaison'],
    contributors: [
      {
        name: 'Elena Rostova',
        role: 'Lead Cryptographer',
        institution: 'MIT CSAIL',
        batch: 'M.S. \'25',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        githubHandle: 'elena-zkbio',
        commitsCount: 310
      },
      {
        name: 'Kavya Pillai',
        role: 'Bioinformatics & VCF Parsers',
        institution: 'Stanford BioE',
        batch: 'Ph.D. Candidate',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        githubHandle: 'kavyap-genomics',
        commitsCount: 215
      }
    ],
    lineage: [
      {
        year: '2024',
        batchName: 'Batch 2024 Genesis',
        institution: 'MIT CSAIL',
        leadContributors: ['Elena Rostova', 'Dr. Liam Harris'],
        keyMilestones: [
          'Initial Groth16 circuit for 50-variant SNP match',
          'Benchmark published in bioRxiv preprint'
        ],
        commits: 210,
        pullRequests: 28,
        activeStatus: 'Completed',
        summary: 'Proved algorithmic feasibility of evaluating DNA mutation constraints without decrypting sequences.'
      },
      {
        year: '2025',
        batchName: 'Batch 2025 Production ZK (Current)',
        institution: 'MIT & Stanford',
        leadContributors: ['Elena Rostova', 'Kavya Pillai'],
        keyMilestones: [
          'Scalable Plonky2 rollup for 100,000 whole-genome variants',
          'WebAssembly in-browser prover reducing memory footprint by 80%',
          'HIPAA compliant simulated hospital node network'
        ],
        commits: 410,
        pullRequests: 62,
        activeStatus: 'Current',
        summary: 'Scaled the mathematical proof system to handle industrial whole-exome sequencing workloads.'
      }
    ],
    passport: {
      passportId: 'PV-2025-MIT-BIO042',
      qrHash: '0x3c71a9e88d0172bfac5510294eec128710fa90812674',
      projectName: 'SynthaGene: Privacy-Preserving Genomic Variant Classifier',
      tagline: 'Zero-knowledge proofs for federated rare oncology mutation discovery.',
      institution: 'Massachusetts Institute of Technology',
      department: 'Computational Biology & Computer Science (CSAIL)',
      academicYear: '2025 – 2026 Academic Session',
      originalBatch: 'Batch 2024',
      currentBatch: 'Batch 2025',
      status: 'Verified',
      license: 'MIT Open Research License',
      techStack: ['Rust', 'Circom 2.1', 'Plonky2', 'Wasm', 'Python', 'FastAPI'],
      githubRepo: 'projectverse-academic/synthagene-zk-genomics',
      totalCommits: 620,
      activeContributors: 4,
      mergedPRs: 90,
      codeHealthScore: 99,
      testCoverage: 96,
      stars: 418,
      forks: 52,
      facultyReviewer: {
        name: 'Dr. Kimberly Vance',
        designation: 'Chair of Genomic Data Privacy',
        department: 'Broad Institute & MIT CSAIL',
        institution: 'MIT',
        score: 9.8,
        reviewText: 'Remarkable integration of zero-knowledge cryptography with real clinical genomics workflows. Mathematical security proofs verified with independent test harnesses.',
        verifiedAt: 'November 04, 2025',
        signatureHash: 'SIG-VERIFIED-FACULTY-MIT-BIO-48194012'
      },
      institutionalValidationCode: 'INST-AUTH-MIT-BIO-2025-001948',
      rubricScores: {
        novelty: 9.9,
        technicalRigor: 9.8,
        documentation: 9.7,
        continuityPotential: 9.8
      }
    }
  },
  {
    id: 'proj-3',
    passportId: 'PV-2025-BITS-PWR015',
    title: 'VoltaGrid: Decentralized Microgrid Peer Energy Market',
    tagline: 'Sub-second peer-to-peer solar trading with automated frequency balancing.',
    description: 'Hardware-integrated smart inverter telemetry and consensus protocol for campus rooftop solar microgrids. Tested on a live 50kW testbed across two university dormitories.',
    domain: 'Clean Energy & IoT',
    techStack: ['Go', 'Solidity', 'C', 'ESP32', 'InfluxDB', 'Grafana', 'MQTT', 'Docker'],
    institution: 'BITS Pilani • Electrical & Electronics Dept',
    department: 'Smart Energy & Renewable Systems Group',
    academicYear: '2025 – 2026',
    status: 'Verified',
    coverGradient: 'from-amber-950/40 via-slate-900 to-indigo-950/50',
    featured: false,
    githubStars: 215,
    githubCommits: 490,
    lineageBatchesCount: 2,
    openRoles: ['Smart Contract Security Auditor', 'Embedded Firmware Engineer'],
    contributors: [
      {
        name: 'Rohan Deshmukh',
        role: 'Power Electronics & IoT Firmware',
        institution: 'BITS Pilani',
        batch: 'B.E. \'25',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        githubHandle: 'rohand-grid',
        commitsCount: 280
      },
      {
        name: 'Nisha Sundaram',
        role: 'Distributed Settlement & State Machine',
        institution: 'IIT Delhi',
        batch: 'B.Tech \'26',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        githubHandle: 'nisha-contracts',
        commitsCount: 210
      }
    ],
    lineage: [
      {
        year: '2024',
        batchName: 'Batch 2024 Phase 1',
        institution: 'BITS Pilani',
        leadContributors: ['Rohan Deshmukh', 'Prof. H. R. Iyer'],
        keyMilestones: [
          'ESP32 smart meter hardware fabrication',
          'MQTT broker with sub-50ms round-trip telemetry'
        ],
        commits: 180,
        pullRequests: 22,
        activeStatus: 'Completed',
        summary: 'Created real physical meter hardware prototypes installed in academic hostel blocks.'
      },
      {
        year: '2025',
        batchName: 'Batch 2025 Phase 2 (Live Market)',
        institution: 'BITS Pilani & IIT Delhi',
        leadContributors: ['Rohan Deshmukh', 'Nisha Sundaram'],
        keyMilestones: [
          'Automated clearing auction running every 15 minutes',
          'Hardware anti-tamper cryptographic chip attestation',
          'Live energy savings dashboard with 4.2 kW/h peak balancing'
        ],
        commits: 310,
        pullRequests: 48,
        activeStatus: 'Current',
        summary: 'Integrated multi-college settlement logic and physical campus grid load shedding.'
      }
    ],
    passport: {
      passportId: 'PV-2025-BITS-PWR015',
      qrHash: '0x19a84b029f847102eef51928374901ac871928370129',
      projectName: 'VoltaGrid: Decentralized Microgrid Peer Energy Market',
      tagline: 'Sub-second peer-to-peer solar trading with automated frequency balancing.',
      institution: 'Birla Institute of Technology and Science, Pilani',
      department: 'Electrical, Electronics & Instrumentation Engineering',
      academicYear: '2025 – 2026 Academic Session',
      originalBatch: 'Batch 2024',
      currentBatch: 'Batch 2025',
      status: 'Verified',
      license: 'CERN Open Hardware License v2',
      techStack: ['Go', 'Solidity', 'C/C++', 'ESP-IDF', 'InfluxDB', 'MQTT'],
      githubRepo: 'projectverse-academic/voltagrid-microgrid-iot',
      totalCommits: 490,
      activeContributors: 4,
      mergedPRs: 70,
      codeHealthScore: 95,
      testCoverage: 88,
      stars: 215,
      forks: 34,
      facultyReviewer: {
        name: 'Prof. Harish R. Iyer',
        designation: 'Director of Energy & Smart Grid Center',
        department: 'Dept of Electrical Engineering',
        institution: 'BITS Pilani',
        score: 9.4,
        reviewText: 'A quintessential applied engineering capstone. Hardware PCB designs are verified and operating reliably on campus circuits.',
        verifiedAt: 'September 22, 2025',
        signatureHash: 'SIG-VERIFIED-FACULTY-BITS-PWR-1928394'
      },
      institutionalValidationCode: 'INST-AUTH-BITS-RENEW-2025-10492',
      rubricScores: {
        novelty: 9.2,
        technicalRigor: 9.6,
        documentation: 9.3,
        continuityPotential: 9.5
      }
    }
  },
  {
    id: 'proj-4',
    passportId: 'PV-2025-CMU-SYS077',
    title: 'KestrelDB: Deterministic Multi-Raft Time-Series Engine',
    tagline: 'High-throughput append-only distributed storage engine for telemetry.',
    description: 'A clean-room storage engine built for high ingest telemetry. Implements deterministic simulation testing inspired by FoundationDB, passing Jepsen fault tests.',
    domain: 'Distributed Systems & Cloud',
    techStack: ['Rust', 'Raft Consensus', 'Tokio', 'eBPF', 'Prometheus', 'Linux Kernel'],
    institution: 'Carnegie Mellon University • School of Computer Science',
    department: 'Parallel Data Laboratory (PDL)',
    academicYear: '2025 – 2026',
    status: 'Verified',
    coverGradient: 'from-indigo-950/60 via-slate-900 to-purple-950/40',
    featured: true,
    githubStars: 520,
    githubCommits: 1120,
    lineageBatchesCount: 4,
    openRoles: ['Core Storage Engine Developer', 'Chaos Testing Engineer'],
    contributors: [
      {
        name: 'Zane Chen',
        role: 'Multi-Raft Consensus Lead',
        institution: 'CMU SCS',
        batch: 'B.S. \'25',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        githubHandle: 'zanec-systems',
        commitsCount: 520
      },
      {
        name: 'Priya Nambiar',
        role: 'LSM-Tree Storage Compaction Engine',
        institution: 'IIT Madras',
        batch: 'Dual Degree \'26',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
        githubHandle: 'priyan-db',
        commitsCount: 380
      }
    ],
    lineage: [
      {
        year: '2023',
        batchName: 'Batch 2023 Foundations',
        institution: 'CMU SCS',
        leadContributors: ['Alex Mercer'],
        keyMilestones: ['Single-node WAL and memory-mapped append buffer'],
        commits: 220,
        pullRequests: 20,
        activeStatus: 'Completed',
        summary: 'Prototyped memory layouts and zero-copy ring buffers.'
      },
      {
        year: '2024',
        batchName: 'Batch 2024 Raft Protocol',
        institution: 'CMU SCS',
        leadContributors: ['Zane Chen', 'Alex Mercer'],
        keyMilestones: ['Distributed Raft leader election and cluster membership changes'],
        commits: 380,
        pullRequests: 45,
        activeStatus: 'Completed',
        summary: 'Introduced distributed consensus with deterministic seed simulations.'
      },
      {
        year: '2025',
        batchName: 'Batch 2025 Multi-Raft Partitioning (Current)',
        institution: 'CMU SCS & IIT Madras',
        leadContributors: ['Zane Chen', 'Priya Nambiar'],
        keyMilestones: ['Dynamic range partitioning across 64 nodes', 'Passed Jepsen partition tests'],
        commits: 520,
        pullRequests: 92,
        activeStatus: 'Current',
        summary: 'Achieved 1.8M write operations per second with linearizable reads.'
      }
    ],
    passport: {
      passportId: 'PV-2025-CMU-SYS077',
      qrHash: '0x99281a0bfe4810284710182947192847109283918274',
      projectName: 'KestrelDB: Deterministic Multi-Raft Time-Series Engine',
      tagline: 'High-throughput append-only distributed storage engine for telemetry.',
      institution: 'Carnegie Mellon University',
      department: 'Computer Science Department & Parallel Data Lab',
      academicYear: '2025 – 2026 Academic Session',
      originalBatch: 'Batch 2023',
      currentBatch: 'Batch 2025',
      status: 'Verified',
      license: 'Apache 2.0',
      techStack: ['Rust 1.82', 'Tokio', 'Multi-Raft', 'eBPF', 'io_uring'],
      githubRepo: 'projectverse-academic/kestreldb-storage-engine',
      totalCommits: 1120,
      activeContributors: 8,
      mergedPRs: 157,
      codeHealthScore: 99,
      testCoverage: 98,
      stars: 520,
      forks: 94,
      facultyReviewer: {
        name: 'Dr. Gregory Ganger',
        designation: 'Professor of Computer Science & ECE',
        department: 'Parallel Data Laboratory',
        institution: 'Carnegie Mellon University',
        score: 9.9,
        reviewText: 'An outstanding systems research project with rigorous deterministic failure modeling. Demonstrates production-grade distributed systems design created through multi-batch student collaboration.',
        verifiedAt: 'October 30, 2025',
        signatureHash: 'SIG-VERIFIED-FACULTY-CMU-SYS-99482109'
      },
      institutionalValidationCode: 'INST-AUTH-CMU-SCS-2025-884019',
      rubricScores: {
        novelty: 9.7,
        technicalRigor: 10.0,
        documentation: 9.8,
        continuityPotential: 9.9
      }
    }
  },
  {
    id: 'proj-5',
    passportId: 'PV-2025-IIITH-NLP031',
    title: 'IndicVoice: Zero-Shot Multi-Dialect Speech Synthesis',
    tagline: 'Preserving endangered Indian dialects through low-resource neural acoustic models.',
    description: 'A community-driven speech synthesis framework covering 18 regional Indian dialects with sub-5-minute voice adaptation. Validated with linguistic research teams.',
    domain: 'Artificial Intelligence & ML',
    techStack: ['Python', 'PyTorch', 'FastSpeech 2', 'Wav2Vec 2.0', 'Hugging Face', 'FastAPI'],
    institution: 'IIIT Hyderabad • Language Technologies Research Center',
    department: 'Speech and NLP Laboratory',
    academicYear: '2025 – 2026',
    status: 'Verified',
    coverGradient: 'from-violet-950/60 via-slate-900 to-indigo-950/40',
    featured: false,
    githubStars: 380,
    githubCommits: 540,
    lineageBatchesCount: 2,
    openRoles: ['Audio DSP Specialist', 'Dialect Annotation Lead'],
    contributors: [
      {
        name: 'Tanvi Joshi',
        role: 'Acoustic Model Architect',
        institution: 'IIIT Hyderabad',
        batch: 'B.Tech \'25',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        githubHandle: 'tanvij-nlp',
        commitsCount: 310
      },
      {
        name: 'Siddharth Roy',
        role: 'Data Pipelines & Audio Preprocessing',
        institution: 'Jadavpur University',
        batch: 'B.E. \'26',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        githubHandle: 'sidroy-dsp',
        commitsCount: 230
      }
    ],
    lineage: [
      {
        year: '2024',
        batchName: 'Batch 2024 Corpus Building',
        institution: 'IIIT Hyderabad',
        leadContributors: ['Tanvi Joshi'],
        keyMilestones: ['Collected 450 hours of standardized audio across 8 languages'],
        commits: 190,
        pullRequests: 24,
        activeStatus: 'Completed',
        summary: 'Established open phonetic datasets with phoneme alignment.'
      },
      {
        year: '2025',
        batchName: 'Batch 2025 Zero-Shot Model (Current)',
        institution: 'IIIT Hyderabad & Jadavpur University',
        leadContributors: ['Tanvi Joshi', 'Siddharth Roy'],
        keyMilestones: ['Zero-shot diffusion voice decoder', 'Real-time inference on mobile devices'],
        commits: 350,
        pullRequests: 58,
        activeStatus: 'Current',
        summary: 'Enabled 3-second audio prompt voice cloning for regional education podcasts.'
      }
    ],
    passport: {
      passportId: 'PV-2025-IIITH-NLP031',
      qrHash: '0x88491029bafe47101829471928471092839182740019',
      projectName: 'IndicVoice: Zero-Shot Multi-Dialect Speech Synthesis',
      tagline: 'Preserving endangered Indian dialects through low-resource neural acoustic models.',
      institution: 'International Institute of Information Technology, Hyderabad',
      department: 'Language Technologies Research Center (LTRC)',
      academicYear: '2025 – 2026 Academic Session',
      originalBatch: 'Batch 2024',
      currentBatch: 'Batch 2025',
      status: 'Verified',
      license: 'Creative Commons Open Data & Apache 2.0',
      techStack: ['Python', 'PyTorch', 'Transformers', 'FastSpeech 2', 'Wav2Vec'],
      githubRepo: 'projectverse-academic/indicvoice-neural-tts',
      totalCommits: 540,
      activeContributors: 5,
      mergedPRs: 82,
      codeHealthScore: 97,
      testCoverage: 91,
      stars: 380,
      forks: 66,
      facultyReviewer: {
        name: 'Dr. Anil Kumar Vuppala',
        designation: 'Associate Professor & LTRC Coordinator',
        department: 'Speech Processing Laboratory',
        institution: 'IIIT Hyderabad',
        score: 9.5,
        reviewText: 'High academic novelty and social impact for linguistic preservation. Verified against standard MOS (Mean Opinion Score) listening tests.',
        verifiedAt: 'November 12, 2025',
        signatureHash: 'SIG-VERIFIED-FACULTY-IIITH-LTRC-009184'
      },
      institutionalValidationCode: 'INST-AUTH-IIITH-LTRC-2025-551029',
      rubricScores: {
        novelty: 9.8,
        technicalRigor: 9.4,
        documentation: 9.5,
        continuityPotential: 9.7
      }
    }
  },
  {
    id: 'proj-6',
    passportId: 'PV-2025-IITD-SEC019',
    title: 'AegisShield: Post-Quantum TLS 1.3 Hardware Accelerator',
    tagline: 'FPGA coprocessor for Kyber and Dilithium lattice cryptography.',
    description: 'Hardware acceleration module for NIST-standardized post-quantum key exchange and digital signatures, targeting high-security academic and banking gateways.',
    domain: 'Cybersecurity & Cryptography',
    techStack: ['SystemVerilog', 'VHDL', 'C', 'Xilinx Vivado', 'Kyber-768', 'Dilithium-3', 'PCIe'],
    institution: 'IIT Delhi • Dept of Electrical Engineering',
    department: 'VLSI & Secure Hardware Architecture Laboratory',
    academicYear: '2025 – 2026',
    status: 'Seeking Next Batch',
    coverGradient: 'from-rose-950/40 via-slate-900 to-indigo-950/60',
    featured: false,
    githubStars: 290,
    githubCommits: 410,
    lineageBatchesCount: 2,
    openRoles: ['RTL Design Lead', 'FPGA Timing Closure Specialist', 'Firmware Driver Dev'],
    contributors: [
      {
        name: 'Ananya Mehra',
        role: 'Hardware Security Architect',
        institution: 'IIT Delhi',
        batch: 'M.Tech \'25',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        githubHandle: 'ananyam-pqc',
        commitsCount: 240
      },
      {
        name: 'Varun Swaminathan',
        role: 'PCIe Driver & Linux Kernel Module',
        institution: 'IIT Madras',
        batch: 'B.Tech \'25',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        githubHandle: 'varuns-vlsi',
        commitsCount: 170
      }
    ],
    lineage: [
      {
        year: '2024',
        batchName: 'Batch 2024 Initial RTL',
        institution: 'IIT Delhi',
        leadContributors: ['Ananya Mehra'],
        keyMilestones: ['Polynomial NTT multiplier in SystemVerilog', 'Simulation testbench'],
        commits: 160,
        pullRequests: 18,
        activeStatus: 'Completed',
        summary: 'Validated mathematical correctness of Kyber-768 polynomial multiplication on FPGA.'
      },
      {
        year: '2025',
        batchName: 'Batch 2025 PCIe Interface & Dilithium',
        institution: 'IIT Delhi & IIT Madras',
        leadContributors: ['Ananya Mehra', 'Varun Swaminathan'],
        keyMilestones: ['100Gbps PCIe Gen 4 DMA controller', 'Dilithium signature verification pipeline'],
        commits: 250,
        pullRequests: 36,
        activeStatus: 'Current',
        summary: 'Targeted hardware demonstration on Xilinx UltraScale+ FPGA board.'
      },
      {
        year: '2026',
        batchName: 'Batch 2026 ASIC Tapeout Roadmap (Looking for 2026 Batch)',
        institution: 'Open to Incoming 2026 Capstone Teams',
        leadContributors: ['Seeking Capstone Batch \'26'],
        keyMilestones: ['SkyWater 130nm open-source ASIC synthesis', 'Side-channel attack hardening'],
        commits: 0,
        pullRequests: 0,
        activeStatus: 'Upcoming Roadmap',
        summary: 'Seeking 2026 graduate/undergrad teams with VLSI synthesis experience to take this project to physical ASIC tapeout.'
      }
    ],
    passport: {
      passportId: 'PV-2025-IITD-SEC019',
      qrHash: '0x1209384bca71018294719284710928391827400192834',
      projectName: 'AegisShield: Post-Quantum TLS 1.3 Hardware Accelerator',
      tagline: 'FPGA coprocessor for Kyber and Dilithium lattice cryptography.',
      institution: 'Indian Institute of Technology Delhi',
      department: 'Department of Electrical Engineering (VLSI Lab)',
      academicYear: '2025 – 2026 Academic Session',
      originalBatch: 'Batch 2024',
      currentBatch: 'Batch 2025',
      status: 'Seeking Next Batch',
      license: 'CERN Open Hardware License',
      techStack: ['SystemVerilog', 'VHDL', 'Xilinx Vivado', 'Kyber-768', 'PCIe Gen4'],
      githubRepo: 'projectverse-academic/aegisshield-pqc-fpga',
      totalCommits: 410,
      activeContributors: 4,
      mergedPRs: 54,
      codeHealthScore: 96,
      testCoverage: 89,
      stars: 290,
      forks: 41,
      facultyReviewer: {
        name: 'Dr. Smruti R. Sarangi',
        designation: 'Professor of Computer Science & VLSI Architecture',
        department: 'Dept of Computer Science & Engineering',
        institution: 'IIT Delhi',
        score: 9.6,
        reviewText: 'Robust hardware pipeline with clock cycle optimizations. Ideal for future batches to extend with ASIC layout synthesis and side-channel resistance analysis.',
        verifiedAt: 'November 15, 2025',
        signatureHash: 'SIG-VERIFIED-FACULTY-IITD-VLSI-889102'
      },
      institutionalValidationCode: 'INST-AUTH-IITD-VLSI-2025-771029',
      rubricScores: {
        novelty: 9.7,
        technicalRigor: 9.8,
        documentation: 9.4,
        continuityPotential: 10.0
      }
    }
  }
];

export const DOMAINS_LIST: ProjectDomain[] = [
  'All',
  'Artificial Intelligence & ML',
  'Healthcare & Biotech',
  'Distributed Systems & Cloud',
  'Autonomous Systems & Robotics',
  'Clean Energy & IoT',
  'Cybersecurity & Cryptography'
];

export const AI_SKILLS_POOL = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'PyTorch',
  'Rust',
  'C++',
  'ROS 2',
  'FastAPI',
  'Solidity',
  'Go',
  'Docker',
  'ESP32',
  'SystemVerilog',
  'WebAssembly',
  'Kubernetes',
  'MongoDB',
  'PostgreSQL'
];

export const SAMPLE_PEERS = [
  {
    name: 'Aarav Sharma',
    institution: 'IIT Delhi',
    batch: 'B.Tech \'26',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    matchScore: 96,
    role: 'Full-Stack Frontend Lead',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Maya Chen',
    institution: 'BITS Pilani',
    batch: 'B.E. \'25',
    skills: ['PyTorch', 'Python', 'FastAPI', 'ROS 2'],
    matchScore: 92,
    role: 'Computer Vision / Robotics Researcher',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Ibrahim Al-Mansoor',
    institution: 'IIIT Hyderabad',
    batch: 'M.Tech \'26',
    skills: ['Rust', 'Distributed Systems', 'Raft', 'Go'],
    matchScore: 89,
    role: 'Systems & Consensus Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

export const SAMPLE_MENTORS = [
  {
    name: 'Dr. Siddharth Anand',
    title: 'Professor & Head of Aerial Robotics Lab',
    institution: 'IIT Bombay',
    domains: ['Autonomous Systems & Robotics', 'Edge AI'],
    verifiedProjectsCount: 14,
    matchScore: 98,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Dr. Kimberly Vance',
    title: 'Chair of Genomic Data Privacy',
    institution: 'MIT CSAIL',
    domains: ['Healthcare & Biotech', 'Zero-Knowledge Cryptography'],
    verifiedProjectsCount: 9,
    matchScore: 94,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Prof. Harish R. Iyer',
    title: 'Director of Energy & Smart Grid Center',
    institution: 'BITS Pilani',
    domains: ['Clean Energy & IoT', 'Distributed Systems'],
    verifiedProjectsCount: 18,
    matchScore: 91,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  }
];
